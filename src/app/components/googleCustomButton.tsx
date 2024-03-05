import { useGoogleLogin } from "@react-oauth/google";
import CustomButton from "./customButton";

const GoogleCustomButton = () => {
  const backend = "https://localhost:3001";
  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res.code);
      fetch(backend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res.code),
      });
    },
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
