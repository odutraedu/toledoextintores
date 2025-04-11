-- CreateTable
CREATE TABLE "Extintor" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "preco" BIGINT NOT NULL,
    "validade" TIMESTAMP(3) NOT NULL,
    "peso" BIGINT NOT NULL,

    CONSTRAINT "Extintor_pkey" PRIMARY KEY ("id")
);
