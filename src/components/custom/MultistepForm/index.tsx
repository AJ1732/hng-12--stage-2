"use client";
import { useFormContext } from "@/provider/form-context";
import { Step1Form, Step2Form, Step3Form } from "./components";
import { ButtonLink } from "@/components";

const MultiStepForm = () => {
  const { step, updateStep, formData } = useFormContext();

  const steps = [<Step1Form />, <Step2Form />, <Step3Form />];

  const nextStep = () => updateStep(Math.min(step + 1, steps.length));
  const prevStep = () => updateStep(Math.max(step - 1, 1));

  const handleSubmit = () => {
    console.log("Submitted Form Data:", formData);
  };

  return (
    <form>
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
          <ButtonLink type="button" onClick={handleSubmit}>
            Submit
          </ButtonLink>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
