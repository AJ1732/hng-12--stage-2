"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { ButtonLink } from "@/components/ui/button-link";
import { useMultiForm } from "@/provider/multiform";
import { StepOneForm, StepThreeForm, StepTwoForm } from "./components";

const MultiStepForm: React.FC = () => {
  const { form, step, setStep } = useMultiForm();
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Submitted Form Data:", data);
  };

  return (
    <section className="mx-auto max-w-[43.75rem] space-y-8 rounded-[2.5rem] border border-accent-100 bg-accent-300 p-12">
      <h1>Multi-Step Steps</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-[2rem] border border-accent-100 bg-accent-600 p-6"
        >
          {step === 1 && <StepOneForm />}
          {step === 2 && <StepTwoForm />}
          {step === 3 && <StepThreeForm />}

          <div className="mt-4 flex justify-between">
            <ButtonLink
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </ButtonLink>
            {step < totalSteps ? (
              <ButtonLink type="button" onClick={handleNext}>
                Next
              </ButtonLink>
            ) : (
              <ButtonLink type="submit">Submit</ButtonLink>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default MultiStepForm;
