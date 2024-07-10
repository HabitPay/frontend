interface ILabelProp {
  id: string;
  title: string;
  isRequired: boolean;
}

const Label = ({ id, title, isRequired }: ILabelProp) => {
  return (
    <label className="flex" htmlFor={id}>
      <h3>{title}</h3>
      {isRequired ? <span className="text-sm text-red-600">*</span> : null}
    </label>
  );
};

export default Label;
