import { z } from "zod";

export const internshipSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  location: z.string().min(2),
  mode: z.enum(["remote", "hybrid", "on-site"]),
  description: z.string().min(10),
  requirements: z.string().optional(),
  stipend: z.number().int().optional(),
  tags: z.array(z.string()).default([]),
  openings: z.number().int().min(1).default(1),
  startsAt: z.date().optional(),
  endsAt: z.date().optional(),
});