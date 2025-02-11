import { useFormContext } from "@/provider/form-context";
import { InputField } from "@/components";

const Step2Form = () => {
  const { formData, updateForm } = useFormContext();

  return (
    <fieldset>
      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => updateForm({ email: e.target.value })}
        required
      />
    </fieldset>
  );
};

export default Step2Form;
