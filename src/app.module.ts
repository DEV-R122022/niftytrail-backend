import "dotenv/config";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configTypeOrm } from './__core/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtExpiry } from './__core/enums';
import { EventModule } from './__core/events/event.module';
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: JwtExpiry.ONE_MINUTE },
    }),
    TypeOrmModule.forRoot(configTypeOrm), 
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      //delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      //newListener: false,
      // set this to `true` if you want to emit the removeListener event
      //removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      //maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      //verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      //ignoreErrors: false,
    }),
    EventModule,
    AuthModule, 
    UserModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
