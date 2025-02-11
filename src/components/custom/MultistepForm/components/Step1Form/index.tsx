import { useFormContext } from "@/provider/form-context";
import { InputField } from "@/components";

const Step1Form = () => {
  const { formData, updateForm } = useFormContext();

  return (
    <fieldset>
      <InputField
        id="name"
        name="name"
        type="text"
        label="Name"
        value={formData.name}
        onChange={(e) => updateForm({ name: e.target.value })}
        required
      />
    </fieldset>
  );
};

export default Step1Form;
