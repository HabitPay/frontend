import { addClassNames } from "@/libs/utils";

interface ButtonProps {
  color?: "red" | "green";
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  color,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={`w-full bg-habit-green hover:bg-green-600 text-white  px-4 border border-transparent rounded-2xl shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none
        ${large ? "py-3 text-base" : "py-2 text-sm "}
        ${
          color
            ? "bg-red-400 hover:bg-red-600 focus:ring-red-500"
            : "bg-habit-green hover:bg-green-600 focus:ring-green-500"
        }
        `}
    >
      {text}
    </button>
  );
}
