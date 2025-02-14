"use client";

import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadInput } from "@/components";
import { useMultiForm } from "@/provider/multiform";
import { uploadFileToCloudinary } from "@/utils/cloudinary";

const StepTwo: React.FC = () => {
  const { form } = useMultiForm();

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const [isUploading, setIsUploading] = useState(false);

  return (
    <fieldset className="space-y-8">
      <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => {
          const handleUpload = async (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const file = e.target.files?.[0];
            if (file) {
              if (file.size > MAX_FILE_SIZE) {
                console.error("File size exceeds 2MB");
                return;
              }

              try {
                setIsUploading(true);
                const imageUrl = await uploadFileToCloudinary(file);
                field.onChange(imageUrl);
              } catch (error) {
                console.error("Upload failed", error);
              } finally {
                setIsUploading(false);
              }
            }
          };

          return (
            <FormItem className="space-y-8 rounded-3xl border border-accent-200 bg-accent-700 p-6">
              <FormLabel>Upload Profile Photo</FormLabel>
              <FormControl>
                <FileUploadInput
                  onChange={handleUpload}
                  loading={isUploading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
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
