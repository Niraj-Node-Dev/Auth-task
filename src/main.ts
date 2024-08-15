import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './swagger';
import * as dotenv from 'dotenv';
import { HOST, PORT, SWAGGER_DOC_ENDPOINT } from 'config';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req: Request, _body: Body, next: any) => {
    console.log('==========> req url:', req.url, '=======> req method:', req.method);
    next();
  });
  
  swagger(app, SWAGGER_DOC_ENDPOINT);

  const host = HOST === 'localhost' ? 'localhost' : HOST;
  app.listen(PORT, host, () => {
    console.log(`Server started port=${PORT}`);
    console.log(`find api-doc preview on= http://${host}:${PORT}/${SWAGGER_DOC_ENDPOINT}`);
  });
}
bootstrap();
