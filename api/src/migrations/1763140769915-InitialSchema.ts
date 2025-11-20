import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1763140769915 implements MigrationInterface {
    name = 'InitialSchema1763140769915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "board" jsonb DEFAULT '[]', "turn" integer NOT NULL, "completed" boolean NOT NULL, "players" jsonb DEFAULT '[]', CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`DROP TABLE "game"`);
    }

}
