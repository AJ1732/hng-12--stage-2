"use client";
import { useMultiForm } from "@/provider/multiform";

const StepThree: React.FC = () => {
  const { form } = useMultiForm();
  const formData = form.getValues();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Submission Successful!</h2>
      <div>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
      </div>
    </div>
  );
};

export default StepThree;