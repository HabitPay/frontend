"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { toastPopupAtom } from "@/hooks/atoms";
import { TOAST_DISMISS_TIMEOUT } from "@/libs/constants";

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
        }, 500); // fadeOut 애니메이션 시간과 일치시킴
      }, TOAST_DISMISS_TIMEOUT);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastPopup, setToastPopup]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setToastPopup({ message: "", top: true, success: true });
  //   }, TOAST_DISMISS_TIMEOUT);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [toastPopup, setToastPopup]);
  return (
    <div className="flex justify-center w-full">
      <div
        className={`fixed z-50 flex px-4 py-3 w-11/12 max-w-md items-center gap-5 rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.25)] transition-opacity duration-500 ${
          toastPopup.top ? "top-12" : "bottom-24"
        } ${toastPopup.success ? "bg-green-400" : "bg-red-400"} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {toastPopup.success ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-white size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-white size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        )}
        <div className="text-sm text-white text-Body">{toastPopup.message}</div>
      </div>
    </div>
  );
}
