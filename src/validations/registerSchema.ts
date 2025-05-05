import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: 'Please provide your name',
        invalid_type_error: 'Name must be a string',
      })
      .min(6, {
        message: 'Your name cannot be less than 6 characters long',
      })
      .max(50, {
        message: 'Your name cannot be more than 50 characters long',
      })
      .trim(),
    username: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9_]{3,15}$/, {
        message: 'Username cannot contain special characters',
      })
      .refine((username) => !username.endsWith('admin'), {
        message: `Username cannot contain 'admin'`,
      }),
    email: z
      .string()
      .min(5, 'Email address must be at least 5 characters long')
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email address' }
      )
      .email({ message: 'Invalid email address' })
      .trim()
      .toLowerCase()
      .refine(
        (email) => email.endsWith('gmail.com') || email.endsWith('yahoo.com'),
        {
          message: `Email must be from 'gmail.com/yahoo.com' domain`,
        }
      ),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(32, { message: 'Password cannot exceed 32 characters' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and at least 8 characters long',
        }
      ),
    passwordConfirm: z.string(),
    bio: z.string().min(1, { message: 'Please write your biography' }).trim(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
      });
    }
  });
