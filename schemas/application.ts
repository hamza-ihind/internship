import { z } from "zod";

export const applicationSchema = z.object({
  internshipId: z.string(),
  coverLetter: z.string().optional(),
  cvUrl: z.string().url().optional(),
});