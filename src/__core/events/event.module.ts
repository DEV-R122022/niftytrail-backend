import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "../../activity/entities/activity.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Activity
    ])
  ],
    controllers: [],
    providers: [EventService],
    exports: [],
  })
export class EventModule {}