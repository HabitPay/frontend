import { useGoogleLogin } from "@react-oauth/google";
import CustomButton from "./customButton";

const GoogleCustomButton = () => {
  const login = useGoogleLogin({
    onSuccess: (res) => console.log(res),
    onError: () => console.log("Login Error"),
    flow: "auth-code",
  });

  return (
    <>
      <CustomButton onClick={() => login()} />
    </>
  );
};

export default GoogleCustomButton;
