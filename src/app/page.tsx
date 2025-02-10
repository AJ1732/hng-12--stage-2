import { Button, InputField } from "@/components";

export default function Home() {
  return (
    <div className="px-6">
      <h1>Hello, World!</h1>

      <Button>Button</Button>

      <InputField
        label="Enter your name"
        placeholder="John Doe"
        autoComplete="name"
        required
      />
    </div>
  );
}
