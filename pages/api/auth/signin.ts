import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const validationScheme = [
      {
        valid: validator.isLength(email, { min: 1 }),
        errorMessage: 'Please enter a valid email address',
      },

      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: 'Please enter a valid password',
      },
    ];

    const errors = validationScheme.filter((field) => !field.valid);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ errorMessage: 'Wrong email or password!' }] });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ errors: [{ errorMessage: 'Wrong email or password!' }] });
    }

    const alg = 'HS256';
    const secred = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secred);

    setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      message: 'User signin successfully',
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        city: user.city,
        phone: user.phone,
      },
    });
  }
  return res.status(400).json({ message: 'Invalid endpoint' });
}
