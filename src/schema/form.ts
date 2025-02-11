import { z } from "zod";

export const Step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export const Step2Schema = z.object({
  role: z.string().min(1, "Please select a role"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const FormSchema = Step1Schema.merge(Step2Schema);

export type FormData = z.infer<typeof FormSchema>;
