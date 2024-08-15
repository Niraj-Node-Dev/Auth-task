import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginReqDto, RegisterReqDto, RegisterResDto } from './dto';
import { comparePassword, generateOtp, generateSaltAndHash, jwtSign } from 'utils';
import { Users, UserSessions } from 'entities';
import { plainToInstance } from 'class-transformer';
import { EmailHelper } from 'utils/email.helper';
import { RegistrationType } from 'entities/users.entity';

export class UserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPO') private readonly userRepo: typeof Users,
    @Inject('USER_SESSION_REPO') private readonly userSessionRepo: typeof UserSessions,
    private readonly mailer: EmailHelper,
  ) { }


  public async register(dto: RegisterReqDto) {
    try {
      const { first_name, last_name, email, password, role } = dto;

      const user = await this.userRepo.findOne({
        where: {
          email,
        },
      });

      if (user) {
        throw new ConflictException(`User with ${email} already exists`);
      }

      // create password
      const { passwordHash } = await generateSaltAndHash(password);
      const verification_token = generateOtp(8)

      const newUser = await this.userRepo.create({
        first_name,
        last_name,
        email,
        password: passwordHash,
        role,
        verification_token,
      }, {
        returning: true
      });

      await this.mailer.sendVerificationMail(newUser);

      return plainToInstance(RegisterResDto, newUser, { excludeExtraneousValues: true });
    } catch (e) {
      if (e instanceof ConflictException) {
        throw new ConflictException(e.message);
      }
      const err = e as Error;
      throw new UserError(`Error while register an user ${err.message}'`);
    }
  }

  public async adminLogin(dto: LoginReqDto) {
    const { email, password } = dto;
    try {

      const user = await this.userRepo.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new UnauthorizedException(`Invalid email or password`);
      }
      if (user.role === RegistrationType.CUSTOMER) {
        throw new UnauthorizedException(`You are not allowed to login from here`)
      }

      if (!user.is_verified) {
        throw new UnauthorizedException('Please verify your email');
      }

      const isValidPassword = await comparePassword(password, user.password)
      if (!isValidPassword) {
        throw new UnauthorizedException(`Invalid email or password`);
      }


      const tokenData = { id: String(user.id), email: user.email, role: user.role };
      const jwt_token = jwtSign(tokenData);

      await this.updateUserSession(user.id, jwt_token);

      return { jwt_token }
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw new UnauthorizedException(e.message);
      }
      const err = e as Error;
      throw new UserError(`Error while login ${err.message}'`);

    }
  }

  public async verifyEmail(token: string) {
    const user = await this.userRepo.findOne({ where: { verification_token: token } });

    if (!user) {
      throw new NotFoundException('Invalid token.');
    }

    if (user.is_verified) {
      throw new BadRequestException('Email is already verified.');
    }

    user.is_verified = true;
    user.verification_token = null;
    await user.save();
  }

  private async updateUserSession(id: string, token: string) {
    const [session, created] = await this.userSessionRepo.findOrCreate({
      where: { user_id: id },
      defaults: { jwt_token: token }
    });

    if (!created) {
      session.jwt_token = token;
      await session.save();
    }

    return;
  }
}