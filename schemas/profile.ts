import { z } from "zod";

export const profileSchema = z.object({
  phone: z.string().optional(),
  university: z.string().optional(),
  faculty: z.string().optional(),
  degree: z.string().optional(),
  level: z.string().optional(),
  skills: z.array(z.string()).optional(),
  cvUrl: z.string().url().optional(),
});