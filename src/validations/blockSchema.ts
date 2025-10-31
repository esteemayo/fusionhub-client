import { z } from 'zod';

export const blockSchema = z
  .object({
    reason: z
      .string()
      .trim()
      .max(50, 'Reason must be 50 characters or less')
      .optional(),
  })
  .required();

export type BlockInputData = z.infer<typeof blockSchema>;
