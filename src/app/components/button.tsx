import { addClassNames } from "@libs/utils";

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={addClassNames(
        "w-full bg-habit-green hover:bg-green-600 text-white  px-4 border border-transparent rounded-2xl shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm "
      )}
    >
      {text}
    </button>
  );
}
