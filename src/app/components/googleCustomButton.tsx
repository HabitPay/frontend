import CustomButton from "./customButton";

const GoogleCustomButton = () => {
  const handleGoogleLogin = () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/oauth2/authorization/google`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomButton onClick={handleGoogleLogin} />
    </>
  );
};

export default GoogleCustomButton;
