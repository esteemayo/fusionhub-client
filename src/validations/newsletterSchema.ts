import { z } from 'zod';

export const newsletterSchema = z
  .object({
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
  })
  .required();

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
