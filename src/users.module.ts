import { Module } from '@nestjs/common';

import { UserService } from './service/user.service';
import { UsersController } from './controller/users.controller';

@Module({
  controllers:[UsersController],
  providers:[UserService]
})
export class UsersModule {}
