import "dotenv/config";
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [__dirname + '/../**/*.entity.js'],
    migrationsTableName: "__migration",
    migrations: [__dirname + "/__migrations/**/*{.ts,.js}"],
    synchronize: false,
    logging: true,
  });

  AppDataSource
    .initialize()
    .then(() => console.log("Datasource initialized"))
    .catch((error) => console.log("Datasource failed", error));
  

export default AppDataSource;
