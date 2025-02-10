import {
  ButtonLink,
  InputField,
  SelectField,
  TextareaField,
  TicketButton,
} from "@/components";

const ElementPage = () => {
  return (
    <div className="space-y-8">
      <h1>Hello, World!</h1>

      <div className="flex gap-4">
        <ButtonLink>Next</ButtonLink>
        <ButtonLink variant={"outline"}>Cancel</ButtonLink>
        <ButtonLink link="/" className="uppercase">
          my tickets
        </ButtonLink>
        <ButtonLink link="/" className="uppercase" size={"sm"}>
          my tickets
        </ButtonLink>
      </div>

      <InputField
        label="Enter your name"
        placeholder="John Doe"
        autoComplete="name"
        required
      />

      <SelectField
        label="Select a Role"
        required
        name="role"
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
      />

      <TextareaField label="About the project" placeholder="Textarea" />

      <TicketButton label="regular access" left={20} price={"Free"} />
      <TicketButton label="VIP Access " left={20} price={50} selected />
    </div>
  );
};

export default ElementPage;
