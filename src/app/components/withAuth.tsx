"use client";

import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

import { useSetRecoilState } from "recoil";

import { toastPopupAtom } from "@/hooks/atoms";
import { getAccessToken } from "@/libs/jwt";
import { PopupErrorMessage } from "@/types/enums";

const withAuth = <P extends object>(
  WrappedComponent: NextPage<P>
): NextPage<P> => {
  const ComponentWithAuth: NextPage<P> = (props) => {
    const router = useRouter();
    const setToastPopup = useSetRecoilState(toastPopupAtom);

    useEffect(() => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        setToastPopup({
          message: PopupErrorMessage.ReLoginRequired,
          top: false,
          success: false,
        });
        router.push("/");
      }
    }, [router, setToastPopup]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
