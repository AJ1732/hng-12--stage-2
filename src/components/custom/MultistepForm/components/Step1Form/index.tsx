import { useFormContext } from "@/provider/form-context";
import { Fieldset, InputField } from "@/components";

const Step1Form = () => {
  const { formData, updateForm } = useFormContext();

  return (
    <Fieldset>
      <InputField
        id="name"
        name="name"
        type="text"
        label="Name"
        value={formData.name}
        onChange={(e) => updateForm({ name: e.target.value })}
        errorMessage="This field is required"
        required
      />
    </Fieldset>
  );
};

export default Step1Form;
