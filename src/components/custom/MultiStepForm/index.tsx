"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { ButtonLink } from "@/components/ui/button-link";
import { useMultiForm } from "@/provider/multiform";
import {
  StepOneForm,
  StepThreeForm,
  StepTwoForm,
  StepsTracker,
} from "./components";
import { FormData } from "@/schema/form";
import { initDB, STORE_NAME } from "@/lib/indexedDB";

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const MultiStepForm: React.FC = () => {
  const { form, step, setStep, setIsFormSubmitted } = useMultiForm();
  const totalSteps = 3;

  type FormFields = keyof FormData;
  type StepFields = {
    [key: number]: FormFields[];
  };

  const validateStep = async () => {
    if (step === 3) return true;

    const stepFields: StepFields = {
      1: ["ticket_type", "number_of_tickets"],
      2: ["profile_photo", "name", "email", "about_project"],
    };

    const fieldsToValidate = stepFields[step];
    if (!fieldsToValidate) return false;

    const isStepValid = await form.trigger(fieldsToValidate);
    return isStepValid;
  };

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return <StepOneForm />;
      case 2:
        return <StepTwoForm />;
      case 3:
        return <StepThreeForm />;
      default:
        return null;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = async () => {
    if (step === 3) {
      try {
        form.reset({
          name: "",
          email: "",
        });

        const db = await initDB();
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        await store.clear();

        setStep(1);
        setIsFormSubmitted(false);
      } catch (error) {
        console.error("Error resetting form:", error);
      }
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    const isValid = await validateStep();
    if (isValid) {
      if (step === 2) {
        setStep(3);
      }
      if (step === 3) {
        console.log(data);
      }
    }
  };

  return (
    <section className="mx-auto max-w-[43.75rem] space-y-8 rounded-[2.5rem] border border-accent-100 bg-accent-300 p-12">
      <StepsTracker />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-[2rem] border border-accent-100 bg-accent-600 p-6"
        >
          <AnimatePresence>
            <motion.div
              key={`step-${step}`}
              variants={CONTAINER_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderStepForm()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between gap-4 [&>button]:w-full">
            <ButtonLink
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              {step === 3 ? "Book Another Ticket" : "Back"}
            </ButtonLink>

            {step < 3 ? (
              <ButtonLink type="button" onClick={handleNext}>
                {step === 2 ? "Get My Ticket" : "Next"}
              </ButtonLink>
            ) : (
              <ButtonLink type="button">Download Ticket</ButtonLink>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default MultiStepForm;
