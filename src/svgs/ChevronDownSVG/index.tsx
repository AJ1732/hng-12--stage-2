import { SvgProps } from "@/types/svgs";

const ChevronDownSVG: React.FC<SvgProps> = ({
  className,
  fillColor = "white",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon / chevron-down">
        <path
          id="icon"
          d="M16.293 8.29309L12 12.5861L7.70697 8.29309L6.29297 9.70709L12 15.4141L17.707 9.70709L16.293 8.29309Z"
          fill={fillColor}
        />
      </g>
    </svg>
  );
};

export default ChevronDownSVG;
