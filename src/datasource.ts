import "dotenv/config";
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      }
    },
    entities: ["dist/**/*.entity{.js}"],
    migrationsTableName: "__migration",
    migrations: [__dirname + "/__migrations/**/*{.ts,.js}"],
    synchronize: false,
    logging: true,
  });

  AppDataSource
    .initialize()
    .then((connection) => console.log("Datasource initialized"))
    .catch((error) => console.log("Datasource failed", error));
  
export default AppDataSource;
