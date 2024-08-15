import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { RegistrationType } from 'entities/users.entity';

export class RegisterReqDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEnum(RegistrationType)
    @IsOptional()
    role: string;
}

export class RegisterResDto {
    @ApiProperty()
    @Expose()
    first_name: string;

    @ApiProperty()
    @Expose()
    last_name: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    role: string;

    @ApiProperty()
    @Expose()
    jwt_token: string;

    @ApiProperty()
    @Expose()
    is_verified: boolean;
}

export class LoginReqDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}