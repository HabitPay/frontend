import { Roboto } from "next/font/google";
import GoogleIcon from "./icons/googleIcon";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500"],
});

interface ICustomButton {
  onClick: () => void;
}

const CustomButton = ({ onClick }: ICustomButton) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full justify-center items-center rounded-md bg-white px-4 py-2 text-sm font-semibold leading-6 text-neutral-500 border border-neutral-300 shadow-sm hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${roboto.className}`}
    >
      <GoogleIcon className="mr-2 h-5 w-5" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default CustomButton;
