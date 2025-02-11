"use client";
import { useFormContext } from "@/provider/form-context";
import { Step1Form, Step2Form } from "./components";
import { ButtonLink } from "@/components";

const MultiStepForm = () => {
  const { step, updateStep, validateStep, formData } = useFormContext();

  const steps = [<Step1Form />, <Step2Form />];

  const nextStep = () => {
    if (validateStep() && step < steps.length) {
      updateStep(step + 1);
    }
  };

  const prevStep = () => updateStep(step - 1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep() && step === steps.length) {
      console.log("Submitted Form Data:", formData);
      // Handle actual submission (e.g., send data to API)
    }
  };

  return (
    <section className="mx-auto max-w-[43.75rem] space-y-8 rounded-[2.5rem] border border-accent-100 bg-accent-300 p-12">
      <div>Steps</div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-accent-100 bg-accent-600 p-6"
      >
        {steps[step - 1]}

        <div className="mt-4 flex justify-between">
          <ButtonLink
            variant={"outline"}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </ButtonLink>

          {step < steps.length ? (
            <ButtonLink type="button" onClick={nextStep}>
              Next
            </ButtonLink>
          ) : (
            <ButtonLink type="submit">Get My Free Ticket</ButtonLink>
          )}
        </div>
      </form>
    </section>
  );
};

export default MultiStepForm;
