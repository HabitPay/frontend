"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { toastPopupAtom } from "@/hooks/atoms";
import { TOAST_DISMISS_TIMEOUT } from "@/libs/constants";
import CheckIcon from "./icons/checkIcon";
import ExclamationIcon from "./icons/exclamationIcon";

export default function ToastPopup() {
  const [toastPopup, setToastPopup] = useRecoilState(toastPopupAtom);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (toastPopup.message !== "") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setToastPopup({ message: "", top: true, success: true });
        }, 500);
      }, TOAST_DISMISS_TIMEOUT);
      console.log(toastPopup);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastPopup, setToastPopup]);

  return (
    <div className="flex justify-center w-full">
      <div
        className={`fixed z-50 flex px-4 py-3 w-11/12 max-w-md items-center gap-5 rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.25)] transition-opacity duration-500 pointer-events-none ${
          toastPopup.top ? "top-12" : "bottom-24"
        } ${toastPopup.success ? "bg-green-400" : "bg-red-400"} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {toastPopup.success ? (
          <CheckIcon className="text-white size-8" />
        ) : (
          <ExclamationIcon className="text-white size-8" />
        )}
        <div className="text-sm text-white text-Body">{toastPopup.message}</div>
      </div>
    </div>
  );
}
