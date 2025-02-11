"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { openDB } from "idb";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the validation schema for the multi‑step form.
export const MultiStepFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export type MultiStepFormData = z.infer<typeof MultiStepFormSchema>;

const DB_NAME = "MultiStepFormDB";
const STORE_NAME = "FormStore";

// Context value now holds the react‑hook‑form control plus current step.
interface MultiFormContextType {
  form: UseFormReturn<MultiStepFormData>;
  step: number;
  setStep: (newStep: number) => void;
}

const MultiFormContext = createContext<MultiFormContextType | undefined>(undefined);

export const MultiFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create the react‑hook‑form control with Zod validation.
  const form = useForm<MultiStepFormData>({
    resolver: zodResolver(MultiStepFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [step, setStepState] = useState<number>(1);
  // Subscribe to all form field changes.
  const watchedValues = form.watch();

  // On mount, load persisted form values and step from IndexedDB.
  useEffect(() => {
    const loadData = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        },
      });
      const savedFormData = await db.get(STORE_NAME, "formData");
      const savedStep = await db.get(STORE_NAME, "formStep");
      if (savedFormData) {
        form.reset(savedFormData);
      }
      if (savedStep) {
        setStepState(savedStep);
      }
    };
    loadData();
    // We depend on "form" only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist form values and step to IndexedDB whenever they change.
  useEffect(() => {
    const persistData = async () => {
      const db = await openDB(DB_NAME, 1);
      await db.put(STORE_NAME, watchedValues, "formData");
      await db.put(STORE_NAME, step, "formStep");
    };
    persistData();
  }, [watchedValues, step]);

  const setStep = (newStep: number) => {
    setStepState(newStep);
  };

  return (
    <MultiFormContext.Provider value={{ form, step, setStep }}>
      {children}
    </MultiFormContext.Provider>
  );
};

export const useMultiForm = (): MultiFormContextType => {
  const context = useContext(MultiFormContext);
  if (!context) {
    throw new Error("useMultiForm must be used within a MultiFormProvider");
  }
  return context;
};
