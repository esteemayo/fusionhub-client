import { z } from 'zod';

export const postSchema = z
  .object({
    title: z.string().min(1, { message: 'A post must have a title' }).trim(),
    tags: z
      .string()
      .min(1, { message: 'A product must have at least one tag' })
      .toLowerCase(),
    category: z.string().toLowerCase(),
  })
  .required();

export const descStepSchema = postSchema.pick({ title: true });
export const imageStepSchema = postSchema.pick({ tags: true, category: true });

export type DescStepFormData = z.infer<typeof descStepSchema>;
export type ImageStepFormData = z.infer<typeof imageStepSchema>;
