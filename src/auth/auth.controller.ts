import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { LoginReqDto, RegisterReqDto, RegisterResDto } from './dto';
import { TransformInterceptor } from 'dispatchers';
import { RegistrationType } from 'entities/users.entity';

@Controller('api/v1/auth')
@ApiTags('Auth module')
@UseInterceptors(TransformInterceptor)
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @ApiOperation({ summary: 'Customer registration' })
    @ApiResponse({
        status: 200,
        description: 'Success',
    })
    @Post('register/customer')
    async registerCustomer(@Body() dto: RegisterReqDto) {
        dto.role = RegistrationType.CUSTOMER;
        const data = await this.service.register(dto);
        return { data, message: 'Success' };
    }

    @ApiOperation({ summary: 'Admin registration' })
    @ApiResponse({
        status: 200,
        description: 'Success',
    })
    @Post('register/admin')
    async registerAdmin(@Body() dto: RegisterReqDto) {
        dto.role = RegistrationType.ADMIN;
        const data = await this.service.register(dto);
        return { data, message: 'Success' };
    }

    @ApiOperation({ summary: 'Admin login' })
    @ApiResponse({
        status: 200,
        description: 'Success',
    })
    @Post('login/admin')
    async loginAdmin(@Body() dto: LoginReqDto) {
        const data = await this.service.adminLogin(dto);
        return { data, message: 'Success' };
    }

    @ApiOperation({ summary: 'Verify email' })
    @ApiResponse({
        status: 200,
        description: 'Success',
    })
    @Get('verify-email')
    async verifyEmail(@Query('token') token: string) {
        await this.service.verifyEmail(token);
        return { message: 'Success' };
    }

}
