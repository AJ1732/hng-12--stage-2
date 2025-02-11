import { z } from "zod";

export const Step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const Step2Schema = z.object({
  email: z.string().email("Invalid email address"),
});

export const FormSchema = Step1Schema.merge(Step2Schema);

export type FormData = z.infer<typeof FormSchema>;
