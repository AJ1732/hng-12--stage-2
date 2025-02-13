import { z } from "zod";

export const StepOneSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
});

export const StepTwoSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

export const FormSchema = StepOneSchema.merge(StepTwoSchema);

export type FormData = z.infer<typeof FormSchema>;