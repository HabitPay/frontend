"use client";

import { toastPopupAtom } from "@/hooks/atoms";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function ToastPopup() {
  const [toastPopup, setToastPopup] = useRecoilState(toastPopupAtom);
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastPopup({ message: "", top: true, success: true });
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [toastPopup, setToastPopup]);
  return (
    <div className="w-full flex justify-center">
      {toastPopup.message !== "" ? (
        <div
          className={`fixed z-50 flex px-4 py-3 w-11/12 max-w-md items-center  gap-5 rounded-xl opacity-85 shadow-[0px_2px_8px_rgba(0,0,0,0.25)] *:text-white ${
            toastPopup.top ? " top-12" : " bottom-24"
          } ${toastPopup.success ? "bg-green-400" : "bg-red-400"}`}
        >
          {toastPopup.success ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          )}
          <div className="text-Body">{toastPopup.message}</div>
        </div>
      ) : null}
    </div>
  );
}
