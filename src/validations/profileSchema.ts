import { z } from 'zod';

export const profileSchema = z
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
    bio: z
      .string()
      .min(1, {
        message:
          'Biography cannot be empty. Please provide some details about yourself.',
      })
      .trim(),
    country: z
      .object({
        value: z
          .string({
            required_error: 'Country value is required',
          })
          .min(1, { message: 'Country value cannot be empty' }),
        label: z
          .string({
            required_error: 'Country label is required',
          })
          .min(1, { message: 'Country label cannot be empty' }),
        flag: z
          .string({
            required_error: 'Country flag is required',
          })
          .url({ message: 'Country flag must be a valid URL' }),
        region: z
          .string({
            required_error: 'Country region is required',
          })
          .min(1, { message: 'Country region cannot be empty' }),
      })
      .refine(
        (country) =>
          country.value.length > 0 &&
          country.label.length > 0 &&
          country.flag.length > 0 &&
          country.region.length > 0,
        { message: 'All country fields must be filled' }
      ),
  })
  .required();
