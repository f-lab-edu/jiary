import { NextApiRequest, NextApiResponse } from 'next';

export type Hanlder = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;
