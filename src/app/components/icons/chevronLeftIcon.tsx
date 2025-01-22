import { IconType } from "./iconType";

const ChevronLeftIcon = ({ className, fill = "none" }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-label="Chevron-left Icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      ></path>
    </svg>
  );
};

export default ChevronLeftIcon;
