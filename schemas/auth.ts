import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { 
      message: "Please enter a valid email format" 
    }),
  password: z.string()
    .min(1, { message: "Password is required" })
    .max(100, { message: "Password must be less than 100 characters" }),
});

export const registerSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { 
      message: "Please enter a valid email format" 
    }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, { 
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" 
    }),
  confirmPassword: z.string()
    .min(8, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const frenchRegisterSchema = z.object({
  name: z.string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom doit contenir moins de 50 caractères" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Le nom ne peut contenir que des lettres et des espaces" }),
  email: z.string()
    .email({ message: "Veuillez entrer une adresse email valide" })
    .max(100, { message: "L'email doit contenir moins de 100 caractères" }),
  password: z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .max(100, { message: "Le mot de passe doit contenir moins de 100 caractères" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre" 
    }),
  confirmPassword: z.string()
    .min(8, { message: "Veuillez confirmer votre mot de passe" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});