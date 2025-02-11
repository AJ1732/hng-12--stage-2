import { TicketButton } from "@/components";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ElementPage = () => {
  return (
    <div className="space-y-8">
      <h1>Hello, World!</h1>

      <Label>Name</Label>
      <Label required>Name</Label>

      <div className="flex items-center justify-start gap-4">
        <ButtonLink>Next</ButtonLink>
        <ButtonLink variant={"outline"}>Cancel</ButtonLink>
        <ButtonLink variant={"link"} link="/tickets">
          MY TICKETS
        </ButtonLink>
        <ButtonLink variant={"link"} size={"sm"} link="/tickets">
          MY TICKETS
        </ButtonLink>
      </div>

      <Input />

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <Textarea />

      <TicketButton label="regular access" left={20} price={"Free"} />
      <TicketButton label="VIP Access " left={20} price={50} selected />
    </div>
  );
};

export default ElementPage;
