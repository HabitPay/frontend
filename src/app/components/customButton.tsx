interface ICustomButton {
  onClick: () => void;
}

const CustomButton = ({ onClick }: ICustomButton) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign in with Google
    </button>
  );
};

export default CustomButton;
