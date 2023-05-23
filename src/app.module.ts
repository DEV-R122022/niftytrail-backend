import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configTypeOrm } from './__core/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtExpiry } from './__core/enums';
import "dotenv/config";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: JwtExpiry.ONE_MINUTE },
    }),
    TypeOrmModule.forRoot(configTypeOrm), 
    AuthModule, 
    UserModule,     
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
