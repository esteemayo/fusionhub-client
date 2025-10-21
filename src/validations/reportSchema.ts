import { z } from 'zod';

export const reportSchema = z
  .object({
    reason: z
      .string()
      .min(1, { message: 'Please select or provide a reason' })
      .trim(),
      customReason: z.string().optional(),
    details: z
      .string()
      .min(1, { message: 'Please select or provide a reason' })
      .max(500, {
        message:
          'A report details must be less than or equal to 500 characters',
      })
      .optional(),
    muteUser: z.boolean().optional(),
  })
  .required();
