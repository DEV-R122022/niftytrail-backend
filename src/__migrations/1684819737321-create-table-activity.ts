import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableActivity1684819737321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await this.createAcitivityTableFK(queryRunner);
      await this.createActivityTableFK(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("activity", true, true, true)
    }

    private async createAcitivityTableFK(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
              name: "activity",
              columns: [
                {
                  name: "id",
                  type: "varchar",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
                },
                {
                  name: "owner",
                  type: "varchar",
                  isNullable: true,
                },
                {
                  name: "editor",
                  type: "varchar",
                  isNullable: true,
                },
                {
                  name: "origin",
                  type: "varchar",
                },
                {
                    name: "ipAddress",
                    type: "varchar",
                },
                {
                    name: "type",
                    type: "varchar",
                },
                {
                  name: "details",
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
            true,
        );
    }
    private async createActivityTableFK(queryRunner: QueryRunner) {
        await queryRunner.createForeignKey(
          "activity",
          new TableForeignKey({
            columnNames: ["owner"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
          }),
        );
    
        await queryRunner.createForeignKey(
          "activity",
          new TableForeignKey({
            columnNames: ["editor"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
          }),
        );
    }
}
