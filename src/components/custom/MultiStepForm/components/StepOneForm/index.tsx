"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup } from "@/components/ui/radio-group";
import { TicketRadioButton } from "@/components";
import { useMultiForm } from "@/provider/multiform";

const StepOne: React.FC = () => {
  const { form } = useMultiForm();

  const ticketOptions = [
    { value: "regular", label: "Regular", price: 75, left: 20 },
    { value: "vip", label: "VIP", price: 150, left: 5 },
    { value: "vvip", label: "VVIP", price: 250, left: 2 },
  ];

  return (
    <fieldset className="space-y-8">
      <header className="relative flex min-h-52 flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl border border-accent-200 p-6 text-center after:absolute after:inset-0 after:bg-custom-radial after:blur-[7px] after:content-['']">
        <h1 className="font-road-rage text-5xl leading-[100%] md:text-[3.875rem]">
          Techember Fest ”25
        </h1>

        <p className="max-md:px-8 max-md:text-sm">
          Join us for an unforgettable experience at{" "}
          <br className="max-md:hidden" /> [Event Name]! Secure your spot now.
        </p>

        <div className="flex items-center justify-center gap-2 max-md:mt-4 max-md:flex-col md:gap-4">
          <p>📍 [Event Location]</p>
          <span className="max-md:hidden">| |</span>
          <p>March 15, 2025 | 7:00 PM</p>
        </div>
      </header>

      <hr className="rounded-full border-2 border-accent-200" />

      <FormField
        control={form.control}
        name="ticket_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Ticket Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid gap-6 rounded-3xl border border-accent-200 bg-accent-700 p-4 sm:grid-cols-2"
              >
                {ticketOptions.map((ticket) => (
                  <TicketRadioButton key={ticket.value} {...ticket} />
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="number_of_tickets"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Tickets</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of tickets" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
  );
};

export default StepOne;
