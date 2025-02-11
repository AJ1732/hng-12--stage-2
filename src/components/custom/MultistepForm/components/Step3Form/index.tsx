import { useFormContext } from "@/provider/form-context";
import { InputField } from "@/components";

const Step3Form = () => {
  const { formData, updateForm } = useFormContext();

  return (
    <fieldset>
      <InputField
        id="age"
        name="age"
        label="Age"
        value={formData.age}
        onChange={(e) => updateForm({ age: e.target.value })}
        required
      />
    </fieldset>
  );
};

export default Step3Form;
