"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormData } from "@/schema/form";
import { saveFormData, getFormData } from "@/lib/indexedDB";

interface MultiFormContextType {
  form: UseFormReturn<FormData>;
  step: number;
  setStep: (step: number) => void;
  isFormSubmitted: boolean;
  setIsFormSubmitted: (value: boolean) => void;
}

const MultiFormContext = createContext<MultiFormContextType | undefined>(
  undefined,
);

export const MultiFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      ticket_type: "regular",
      number_of_tickets: 1,
      profile_photo: "",
      name: "",
      email: "",
      about_project: "",
    },
  });

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await getFormData();
        if (savedData) {
          form.reset(savedData.formData); 
          setStep(savedData.currentStep);
          setIsFormSubmitted(savedData.isFormSubmitted);
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };
    loadSavedData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await saveFormData({
          formData: form.getValues(),
          currentStep: step,
          isFormSubmitted,
        });
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    const subscription = form.watch(() => {
      saveData();
    });

    saveData();

    return () => subscription.unsubscribe();
  }, [form, step, isFormSubmitted]);

  return (
    <MultiFormContext.Provider
      value={{ form, step, setStep, isFormSubmitted, setIsFormSubmitted }}
    >
      {children}
    </MultiFormContext.Provider>
  );
};

export const useMultiForm = () => {
  const context = useContext(MultiFormContext);
  if (!context) {
    throw new Error("useMultiForm must be used within a MultiFormProvider");
  }
  return context;
};
