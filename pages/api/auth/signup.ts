import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, city, password } = req.body;
    const validationScheme = [
      {
        valid: validator.isLength(firstName, { min: 3, max: 40 }),
        errorMessage: 'First name must be between 3 and 40 characters',
      },
      {
        valid: validator.isLength(lastName, { min: 3, max: 40 }),
        errorMessage: 'Last name must be between 3 and 40 characters',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Please enter a valid email address',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Please enter a valid phone number',
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: 'Please enter a valid city name',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'Password is not strong enough',
      },
    ];

    const errors = validationScheme.filter((field) => !field.valid);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userWithEmail) {
      return res
        .status(400)
        .json({ errors: [{ errorMessage: 'Email already exists' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        city: city,
        password: hashedPassword,
      },
    });

    const alg = 'HS256';
    const secred = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('2h')
      .sign(secred);

    return res.status(200).json({
      message: 'User created successfully',
      user: { firstName, lastName, email, phone, city },
      token,
    });
  }
}
