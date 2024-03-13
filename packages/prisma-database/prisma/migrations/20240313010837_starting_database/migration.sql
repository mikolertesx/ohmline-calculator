-- CreateTable
CREATE TABLE "Resistance" (
    "id" SERIAL NOT NULL,
    "modifier" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,

    CONSTRAINT "Resistance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tolerance" (
    "id" SERIAL NOT NULL,
    "modifier" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tolerance" INTEGER NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,

    CONSTRAINT "Tolerance_pkey" PRIMARY KEY ("id")
);
