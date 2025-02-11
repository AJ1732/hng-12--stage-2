import { useFormContext } from "@/provider/form-context";
import { Fieldset, InputField } from "@/components";

const Step2Form = () => {
  const { formData, updateForm } = useFormContext();

  return (
    <Fieldset>
      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => updateForm({ email: e.target.value })}
        errorMessage="This field is required"
        required
      />
    </Fieldset>
  );
};

export default Step2Form;
