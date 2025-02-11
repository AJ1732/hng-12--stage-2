"use client";
import { useFormContext } from "@/provider/form-context";
import { Step1Form, Step2Form } from "./components";
import { ButtonLink } from "@/components";

const MultiStepForm = () => {
  const { step, updateStep, formData } = useFormContext();

  const steps = [<Step1Form />, <Step2Form />];

  const nextStep = () => updateStep(Math.min(step + 1, steps.length));
  const prevStep = () => updateStep(Math.max(step - 1, 1));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
  };

  return (
    <section className="bg-accent-300 border-accent-100 mx-auto max-w-[43.75rem] space-y-8 rounded-[2.5rem] border p-12">
      <div>Steps</div>

      <form
        onSubmit={handleSubmit}
        className="border-accent-100 bg-accent-600 rounded-[2rem] border p-6"
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
