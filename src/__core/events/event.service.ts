import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ILoginActivityPayload } from "../interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Activity } from "../../activity/entities/activity.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
    ) {}

    @OnEvent('account.*', { async: true })
    async handleOrderCreatedEvent(payload: ILoginActivityPayload) {
        await this.activityRepository.save({
            owner: payload.owner,
            editor: payload.editor,
            origin: payload.origin,
            ipAddress: payload.ipAddress,
            type: payload.type,
            details: payload.details,
        });
    }
}