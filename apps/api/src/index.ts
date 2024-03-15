/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';

import * as path from 'path';

import express, { Response, Request, json } from 'express';
import {PrismaClient} from 'prisma-database';

const prisma = new PrismaClient();

import {
  GetResistanceColorsResponse,
  GetToleranceColorsResponse,
  PostCalculateRequest,
  PostCalculateResponse,
} from 'api-interface';

// import resistances from './data/resistances';
// import tolerances from './data/tolerances';
import OhmValueCalculator from './logic/OhmValueCalculator';
import { appRouter } from './server';

const app = express();

app.use(json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

// TODO Send api calls to a different folder.
app.get(
  '/api/resistance-colors',
  async (_req, res: Response<GetResistanceColorsResponse>) => {

    const resistanceColors = await prisma.resistance.findMany();

    return res.send({
      data: resistanceColors,
    });
  }
);

// TODO Send api calls to a different folder.
app.get(
  '/api/tolerance-colors',
  async (req, res: Response<GetToleranceColorsResponse>) => {
    const toleranceVariants = await prisma.tolerance.findMany();

    return res.send({
      data: toleranceVariants,
    });
  }
);

// TODO Send api calls to a different folder.
app.post(
  '/api/calculate',
  async (
    req: Request<object, object, PostCalculateRequest>,
    res: Response<PostCalculateResponse>
  ) => {
    const { bandAColor, bandBColor, bandCColor, bandDColor } = req.body;
    
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

    return res.send({
      result,
    });
  }
);

const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions) => ({})
type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
