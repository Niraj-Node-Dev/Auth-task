import {
    Controller,
} from '@nestjs/common';
// import { AuthService } from './auth.service';
import {
    ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth module')
export class AuthController {
    constructor(/* private readonly _service: AuthService */) { }

}
