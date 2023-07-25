import type { NextApiRequest, NextApiResponse } from 'next';
import * as AUTH from '@/backend/auth/index.ts';
import type { GET, POST, DELETE } from '@/backend/auth/index.ts';
import filter from '@/backend/common/filter.ts';

type RouteMehtod = {
  [key: string]: typeof GET | typeof POST | typeof DELETE;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as string;
  const HttpFunctions: RouteMehtod = AUTH;
  HttpFunctions[method](req, res);
}

export default filter(handler);
