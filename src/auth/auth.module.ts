import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailHelper } from 'utils/email.helper';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService, EmailHelper
    ],
})
export class AuthModule { }
