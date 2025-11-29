import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe est trop court!' })
    .max(20, { message: 'Le mot de passe est trop long!' }),
});

export const ResetSchema = z.object({
  email: z.email(),
});

export const PasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm password must be at least 6 characters long',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Le mot de passe est trop court!' })
    .max(20, { message: 'Le mot de passe est trop long!' }),
});
