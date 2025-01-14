interface ButtonProps {
  color?: "red" | "green";
  large?: boolean;
  isSubmitting?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  color,
  isSubmitting,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isSubmitting}
      {...rest}
      className={`w-full bg-habit-green hover:bg-green-600 text-white  px-4 border border-transparent rounded-2xl shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed
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
