import { z } from "zod";

export const StepOneSchema = z.object({
  ticket_type: z.enum(["regular", "vip", "vvip"], {
    required_error: "Ticket type is required",
    invalid_type_error: "Invalid ticket type",
  }),
  number_of_tickets: z
    .number({
      required_error: "Number of tickets is required",
      invalid_type_error: "Number of tickets must be a number",
    })
    .min(1, { message: "At least 1 ticket is required" }),
});

export const StepTwoSchema = z.object({
  profile_photo: z
    .string({ required_error: "Profile photo is required" })
    .url("Profile photo must be a valid URL"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name is required"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  about_project: z.string().optional(),
});

export const FormSchema = StepOneSchema.merge(StepTwoSchema);

export type FormData = z.infer<typeof FormSchema>;
