import { z } from 'zod';

const identifierSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/;
      const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

      const isEmail = emailRegex.test(value);
      const isUsername = usernameRegex.test(value);

      if (
        isEmail &&
        !value.endsWith('gmail.com') &&
        !value.endsWith('yahoo.com')
      ) {
        return false;
      }

      return isEmail || isUsername;
    },
    {
      message:
        'Invalid identifier, Please enter a valid username or email (@gmail.com or @yahoo.com)',
    }
  );

export const loginSchema = z
  .object({
    identifier: identifierSchema,
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(32, { message: 'Password cannot exceed 32 characters' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and at least 8 characters long',
        }
      ),
  })
  .required();
