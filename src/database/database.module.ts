import { Module, Global } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Global()
@Module({
  imports: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
