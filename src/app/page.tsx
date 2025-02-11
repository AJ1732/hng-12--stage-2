import { MultiStepForm } from "@/components";
import { MultiFormProvider } from "@/provider/multiform";

export default function Home() {
  return (
    <MultiFormProvider>
      <MultiStepForm />
    </MultiFormProvider>
  );
}
