"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { openDB } from "idb";
import { FormSchema, Step1Schema, Step2Schema, FormData } from "@/schema/form";
import { z } from "zod";

const DB_NAME = "MultiStepFormDB";
const STORE_NAME = "FormStore";

interface FormContextType {
  step: number;
  updateStep: (newStep: number) => void;
  formData: FormData;
  updateForm: (data: Partial<FormData>) => void;
  validateStep: () => boolean;
  validateField: (name: keyof FormData, value: string) => void;
  errors: Partial<Record<keyof FormData, string>>;
}

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  useEffect(() => {
    const loadData = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore(STORE_NAME);
        },
      });

      const savedData = await db.get(STORE_NAME, "formData");
      if (savedData) {
        setFormData(savedData);
      }

      const savedStep = await db.get(STORE_NAME, "step");
      if (savedStep) {
        setStep(savedStep);
      }
    };

    loadData();
  }, []);

  const updateForm = async (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));

    const db = await openDB(DB_NAME, 1);
    await db.put(STORE_NAME, { ...formData, ...data }, "formData");
  };

  const updateStep = async (newStep: number) => {
    setStep(newStep);

    const db = await openDB(DB_NAME, 1);
    await db.put(STORE_NAME, newStep, "step");
  };

  const validateField = (name: keyof FormData, value: string) => {
    let schema: z.ZodObject<any>;

    if (step === 1) {
      schema = Step1Schema;
    } else if (step === 2) {
      schema = Step2Schema;
    } else {
      return;
    }

    const result = schema.safeParse({ ...formData, [name]: value });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name]?.[0] || "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = () => {
    let schema: z.ZodObject<any>;

    if (step === 1) {
      schema = Step1Schema;
    } else if (step === 2) {
      schema = Step2Schema;
    } else {
      return true;
    }

    const result = schema.safeParse(formData);

    if (!result.success) {
      const newErrors = result.error.flatten().fieldErrors;
      setErrors(newErrors as Partial<Record<keyof FormData, string>>);
      return false;
    }

    setErrors({});
    return true;
  };

  return (
    <FormContext.Provider
      value={{
        step,
        updateStep,
        formData,
        updateForm,
        validateStep,
        validateField,
        errors,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within FormProvider");
  return context;
};
