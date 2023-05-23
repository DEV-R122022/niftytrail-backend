import { ActivityType } from "../enums/activity-type.enum";
import { User } from '../../user/entities/user.entity';

export interface ILoginActivityPayload {
    owner: User;
    editor: User;
    origin: string;
    ipAddress: string;
    type: ActivityType;
    details: string;
}