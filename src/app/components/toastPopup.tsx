"use client";

import { addClassNames } from "@/libs/utils";
import { Dispatch, SetStateAction, useEffect } from "react";

export interface IToast {
  message: string;
  top: boolean;
  success: boolean;
}

export interface ToastPopupProps {
  toast: IToast;
  setToast: Dispatch<SetStateAction<IToast>>;
}

export default function ToastPopup({ toast, setToast }: ToastPopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast((prev) => ({ message: "", top: true, success: true }));
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);
  return (
    <div
      className={`fixed z-50 flex px-4 py-3 w-11/12 max-w-md items-center  gap-5 rounded-xl opacity-85 shadow-[0px_2px_8px_rgba(0,0,0,0.25)] *:text-white ${
        toast.top ? " top-12" : " bottom-24"
      } ${toast.success ? "bg-green-400" : "bg-red-400"}`}
    >
      {toast.success ? (
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
      <div className="text-Body">{toast.message}</div>
    </div>
  );
}
