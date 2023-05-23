import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";

export const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      }
    },
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    logNotifications: true,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
};