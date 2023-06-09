import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClientController } from './controllers/client.controller';
import { Activity } from '../activity/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Activity
    ])
  ],
  controllers: [UserController, ClientController],
  providers: [UserService]
})
export class UserModule {}
