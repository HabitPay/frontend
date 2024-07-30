"use client";

import { toastPopupAtom } from "@/hooks/atoms";
import { getAccessToken } from "@/libs/jwt";
import { PopupErrorMessage } from "@/types/enums";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const withAuth = <P extends object>(
  WrappedComponent: NextPage<P>
): NextPage<P> => {
  const ComponentWithAuth: NextPage<P> = (props) => {
    const router = useRouter();
    // const [loading, setLoading] = useState(true);
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

    // if (loading) {
    //   return <p>Loading...</p>;
    // }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
