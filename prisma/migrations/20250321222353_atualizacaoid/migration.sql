-- AlterTable
CREATE SEQUENCE extintor_id_seq;
ALTER TABLE "Extintor" ALTER COLUMN "id" SET DEFAULT nextval('extintor_id_seq');
ALTER SEQUENCE extintor_id_seq OWNED BY "Extintor"."id";
