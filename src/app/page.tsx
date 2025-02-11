import { FormProvider } from "@/provider/form-context";
import { MultiStepForm } from "@/components";

export default function Home() {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
}
