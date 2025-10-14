import { z } from 'zod';

export const reportSchema = z
  .object({
    reason: z
      .string()
      .min(1, { message: 'Please select or provide a reason' })
      .trim(),
    customReason: z.string().optional(),
    muteUser: z.boolean().optional(),
  })
  .required();
