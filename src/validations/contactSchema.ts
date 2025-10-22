import { z } from 'zod';

export const contactSchema = z
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
    subject: z
      .string({
        required_error: 'Please provide subject of the email',
        invalid_type_error: 'Subject must be a string',
      })
      .min(6, {
        message: 'Your subject cannot be less than 6 characters long',
      })
      .max(50, {
        message: 'Your subject cannot be more than 50 characters long',
      }),
  })
  .required();

export type ContactInputData = z.infer<typeof contactSchema>;
