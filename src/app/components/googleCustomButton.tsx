import CustomButton from "./customButton";

const GoogleCustomButton = () => {
  const handleGoogleLogin = () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
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
