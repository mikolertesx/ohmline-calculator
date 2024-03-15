// import * as trpc from '@trpc/server';
import { publicProcedure, router } from './trpc';

import { z } from 'zod';
import { PrismaClient } from 'prisma-database';
import OhmValueCalculator from './logic/OhmValueCalculator';

const prisma = new PrismaClient();

export const appRouter = router({
  'getResistances': publicProcedure.query(async () => {
    const resistanceColors = await prisma.resistance.findMany();

    return resistanceColors;

  }),
  'getTolerances': publicProcedure.query(async () => {
    const toleranceVariants = await prisma.tolerance.findMany();

    return toleranceVariants;
  }),
  'postCalculate': publicProcedure.input(z.object({
    bandAColor: z.string(),
    bandBColor: z.string(),
    bandCColor: z.string(),
    bandDColor: z.string(),
  })).output(z.tuple([z.string(), z.string(), z.string()])).mutation(async (req) => {
    const { input } = req;

    const { bandAColor, bandBColor, bandCColor, bandDColor } = input;

    const resistanceColors = await prisma.resistance.findMany();
    const toleranceVariants = await prisma.tolerance.findMany();

    // This will be recreated every run.
    // Might be a good idea to cache this in the future.
    const calculator = new OhmValueCalculator(resistanceColors, toleranceVariants);

    const result = calculator.CalculateOhmValue(
      bandAColor,
      bandBColor,
      bandCColor,
      bandDColor
    );

    return result;
  })
});

// export const appRouter = trpc
//   .router()
//   .query('getResistances', {
//     input: z.void(),
//     async resolve() {
//       const resistanceColors = await prisma.resistance.findMany();

//       return {
//         data: resistanceColors,
//       };
//     }
//   })
//   .query('getTolerances', {
//     input: z.void(),
//     async resolve() {
//       const toleranceVariants = await prisma.tolerance.findMany();

//       return {
//         data: toleranceVariants,
//       };
//     }
//   });

export type AppRouter = typeof appRouter;


// import { json, urlencoded } from "body-parser";
// import express from "express";
// import morgan from "morgan";
// import cors from "cors";

// export const createServer = () => {
//   const app = express();
//   app
//     .disable("x-powered-by")
//     .use(morgan("dev"))
//     .use(urlencoded({ extended: true }))
//     .use(json())
//     .use(cors())
//     .get("/message/:name", (req, res) => {
//       return res.json({ message: `hello ${req.params.name}` });
//     })
//     .get("/healthz", (req, res) => {
//       return res.json({ ok: true });
//     });

//   return app;
// };
