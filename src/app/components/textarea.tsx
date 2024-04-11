interface TextAreaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  placeholder,
  value,
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
        className="w-full px-4 py-4 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-habit-green"
        rows={4}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
