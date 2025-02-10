import { ButtonLink, InputField, TextareaField } from "@/components";

export default function Home() {
  return (
    <div className="space-y-8 px-6 py-28">
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

      <TextareaField label="About the project" placeholder="Textarea" />
    </div>
  );
}
