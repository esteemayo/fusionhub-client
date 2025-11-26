import { z } from 'zod';

export const profileSchema = z
  .object({
    name: z
      .string()
      .min(6, 'Name must be at laest 6 characters')
      .max(50, 'Name must not exceed 50 characters')
      .trim(),
    username: z
      .string()
      .trim()
      .regex(
        /^[a-zA-Z0-9_]{3,15}$/,
        'Username can only contain letters, numbers, and underscores'
      )
      .refine((username) => !username.endsWith('admin'), {
        message: `Username cannot contain 'admin'`,
      }),
    email: z
      .string()
      .min(5, 'Email address must be at least 5 characters long')
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email address'
      )
      .email('Please enter a valid email address')
      .trim()
      .toLowerCase()
      .refine(
        (email) => email.endsWith('gmail.com') || email.endsWith('yahoo.com'),
        {
          message: `Email must be from 'gmail.com/yahoo.com' domain`,
        }
      ),
    bio: z.string().max(300, 'Biography must not exceed 300 characters').trim(),
    country: z
      .object(
        {
          label: z.string(),
          value: z.string(),
          flag: z.string().optional(),
          code: z.string().optional(),
          latlng: z.array(z.number()).optional(),
        },
        { required_error: 'Please select your country' }
      )
      .refine((country) => country.label.trim().length > 0, {
        message: 'Country name must be valid',
      }),
  })
  .required();

export type ProfileDataFormData = z.infer<typeof profileSchema>;
