import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";

export const config: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST as any,
    username: process.env.DB_USER as any,
    password: process.env.DB_PASS as any,
    database: process.env.DB_DATABASE as any,
    autoLoadEntities: true,
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
    logging: true,
    logNotifications: true,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
};