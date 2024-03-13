import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import resistancesData from './data/resistances';
import tolerancesData from './data/tolerances';

async function main() {
    await prisma.resistance.createMany({data: resistancesData});
    await prisma.tolerance.createMany({data: tolerancesData});

}
main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
