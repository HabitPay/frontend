interface ILabelProp {
  title: string;
  isRequired: boolean;
}

const Label = ({ title, isRequired }: ILabelProp) => {
  return (
    <div className="flex">
      <h3>{title}</h3>
      {isRequired ? <span className="text-sm text-red-600">*</span> : null}
    </div>
  );
};

export default Label;
