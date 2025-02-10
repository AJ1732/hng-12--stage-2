import { cn } from "@/lib/utils";

interface TicketCardProps {
  label: string;
  price: string | number;
  left: number;
  selected?: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({
  label,
  price,
  left,
  selected,
}) => {
  return (
    <button
      type="button"
      className={cn(
        "border-accent-200 flex w-fit min-w-64 justify-between gap-2 rounded-xl border p-2 pl-2.5 text-gray-100",
        selected && "bg-primary-400",
      )}
    >
      <div className="flex flex-col items-start">
        <h4 className="font-medium uppercase">{label}</h4>
        <p className="text-sm leading-[150%]">{left} left!</p>
      </div>

      <div className="border-primary-200 bg-accent-100 flex h-fit w-fit min-w-20 items-center justify-center rounded-lg border p-2 text-xl font-semibold leading-[110%] text-gray-100">
        {typeof price === "number" && `$`}
        <span>{price}</span>
      </div>
    </button>
  );
};

export default TicketCard;
