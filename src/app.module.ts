import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configTypeOrm } from './__core/config';

@Module({
  imports: [
    AuthModule, 
    UserModule,     
    TypeOrmModule.forRoot(configTypeOrm) 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
