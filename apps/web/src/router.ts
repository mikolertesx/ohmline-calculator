import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from 'api/src/server';

export const trpc = createTRPCReact<AppRouter>();