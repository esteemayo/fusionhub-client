import { z } from 'zod';

export const VALID_REASONS = [
  'Spam or misleading',
  'Harassment or bullying',
  'Hate speech or discrimination',
  'Inappropriate or sexual content',
  'Other',
] as const;

export const reportSchema = z
  .object({
    reason: z.enum(VALID_REASONS, {
      required_error: 'A report must have a reason',
      invalid_type_error: 'Invalid reason selected',
    }),
    customReason: z
      .string()
      .trim()
      .max(200, 'Custom reason must be less than or equal to 200 characters')
      .optional()
      .or(z.literal('')),
    details: z
      .string()
      .trim()
      .max(500, 'Report details must be less than or equal to 500 characters')
      .optional(),
    muteUser: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.reason === 'Other') {
      if (!data.customReason || data.customReason.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['customReason'],
          message: 'A custom reason is required when reason is "Other"',
        });
      }
    } else {
      if (data.customReason && data.customReason.trim().length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['customReason'],
          message: 'Custom reason must be empty unless reason is "Other"',
        });
      }
    }
  });

export type ReportInputData = z.infer<typeof reportSchema>;
