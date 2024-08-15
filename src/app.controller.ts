import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello() {
      return {
          data: {
              hash: '1.0.0',
              status: 'up',
          },
          message: 'works',
      };
  }}
