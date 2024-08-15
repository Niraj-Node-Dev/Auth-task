import { Module, Global } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { Users, UserSessions } from 'entities';

@Global()
@Module({
  imports: [],
  providers: [...databaseProviders,
  {
    provide: 'USER_REPO',
    useValue: Users,
  },
  {
    provide: 'USER_SESSION_REPO',
    useValue: UserSessions,
  },
  ],
  exports: [...databaseProviders,
  {
    provide: 'USER_REPO',
    useValue: Users,
  },
  {
    provide: 'USER_SESSION_REPO',
    useValue: UserSessions,
  },
  ],
})
export class DatabaseModule { }
