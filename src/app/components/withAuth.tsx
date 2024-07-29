"use client";

import { toastPopupAtom } from "@/hooks/atoms";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const withAuth = <P extends object>(
  WrappedComponent: NextPage<P>
): NextPage<P> => {
  const ComponentWithAuth: NextPage<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const setToastPopup = useSetRecoilState(toastPopupAtom);

    useEffect(() => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        setToastPopup({
          message: "다시 로그인 해 주세요",
          top: false,
          success: false,
        });
        const timer = setTimeout(() => {
          router.push("/");
        }, 2700);
        return () => clearTimeout(timer);
      } else {
        setLoading(false);
      }
    }, [router, setToastPopup]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
