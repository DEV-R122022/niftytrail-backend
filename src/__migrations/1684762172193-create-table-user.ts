import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUser1684762172193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.createTable(
            new Table({
              name: "user",
              columns: [
                {
                  name: "id",
                  type: "varchar",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
                },
                {
                  name: "username",
                  type: "varchar",
                },
                {
                  name: "password",
                  type: "varchar",
                },
                {
                  name: "salt",
                  type: "varchar",
                },
                {
                  name: "verified",
                  type: "boolean",
                  default: false,
                },
                {
                    name: "role",
                    type: "varchar",
                },
                {
                  name: "createdAt",
                  type: "timestamptz",
                  default: "now()",
                },
                {
                  name: "updatedAt",
                  type: "timestamptz",
                  default: "now()",
                },
              ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("user", true, true, true)
    }
}
