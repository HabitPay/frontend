interface TextAreaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  placeholder,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-habit-green "
        rows={4}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
