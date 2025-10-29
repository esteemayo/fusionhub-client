import { z } from 'zod';

export const muteSchema = z
  .object({
    targetId: z.string().min(1, 'Target ID is required'),
    targetType: z.enum(['User', 'Comment', 'Reply']),
    reason: z
      .string()
      .trim()
      .max(50, 'Reason must be 50 characters or less')
      .optional(),
  })
  .required();

export type MuteFormData = z.infer<typeof muteSchema>;
