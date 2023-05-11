import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers.authorization?.split(' ')[1];

  if (!bearerToken) {
    return res.status(401).json({ errors: [{ errorMessage: 'Unauthorized' }] });
  }

  const decodedToken = jwt.decode(bearerToken) as { email: string };

  if (!decodedToken.email) {
    return res.status(401).json({ errors: [{ errorMessage: 'Unauthorized' }] });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: decodedToken.email,
    },

    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      city: true,
      phone: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!user) {
    return res.status(401).json({ errors: [{ errorMessage: 'Unauthorized' }] });
  }

  return res.status(200).json({ user: user });
}
