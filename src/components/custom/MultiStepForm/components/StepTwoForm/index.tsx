"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMultiForm } from "@/provider/multiform";

const StepTwo: React.FC = () => {
  const { form } = useMultiForm();

  return (
    <fieldset className="space-y-8">
      <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className="rounded-3xl border border-accent-200 bg-accent-700 p-6">
            <FormLabel>Upload Profile Photo Url</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.cloudinary.com/..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <hr className="rounded-full border-2 border-accent-200" />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Enter your Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="johndoe@gmail.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="about_project"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About Project</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Say a little about the event"
                className="min-h-32 resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
  );
};

export default StepTwo;
