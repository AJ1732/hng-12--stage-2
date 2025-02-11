"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { openDB } from "idb";

const DB_NAME = "MultiStepFormDB";
const STORE_NAME = "FormStore";
const STEP_KEY = "formStep";

const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [step, setStep] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore(STORE_NAME);
        },
      });

      const data = await db.get(STORE_NAME, "formData");
      if (data) setFormData(data);

      const savedStep = await db.get(STORE_NAME, STEP_KEY);
      if (savedStep) setStep(savedStep);
    };

    loadData();
  }, []);

  const updateForm = async (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));

    const db = await openDB(DB_NAME, 1);
    await db.put(STORE_NAME, { ...formData, ...data }, "formData");
  };

  const updateStep = async (newStep: number) => {
    setStep(newStep);

    const db = await openDB(DB_NAME, 1);
    await db.put(STORE_NAME, newStep, STEP_KEY);
  };

  return (
    <FormContext.Provider value={{ formData, updateForm, step, updateStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
