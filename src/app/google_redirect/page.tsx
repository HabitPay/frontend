"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface ResponseData {
  isSignedUser: boolean;
  accessToken: string;
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const getGoogleOauthToken = async () => {
    try {
      const response = await fetch("backend/oauth-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        handleAuthentication(data);
      } else {
        console.error("Failed to get access token");
        handleAuthentication(null);
      }
    } catch (error) {
      console.error("ERROR: ", error);
      return null;
    }
  };

  const handleAuthentication = (data: ResponseData | null) => {
    if (!data) {
      router.push("/loginError");
      return;
    }

    const { isSignedUser, accessToken } = data;

    if (isSignedUser) {
      router.push("/home");
    } else {
      router.push("/onboarding");
    }
  };

  useEffect(() => {
    if (code) getGoogleOauthToken();
  }, []);

  return (
    <div className=" bg-inherit h-screen flex flex-col justify-center items-center  space-y-8">
      <div className="flex flex-col items-center">로그인 중입니다.</div>
    </div>
  );
};

export default Page;
