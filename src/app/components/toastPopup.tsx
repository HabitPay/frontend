"use client";

import { addClassNames } from "@/libs/utils";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ToastPopupProps {
  message: string;
  setToast: Dispatch<SetStateAction<boolean>>;
  position: "top" | "bottom";
}

export default function ToastPopup({
  message,
  setToast,
  position,
}: ToastPopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);
  return (
    <div
      className={addClassNames(
        "fixed z-20 flex h-[4rem] w-[90%] max-w-[73rem] items-center justify-center rounded-[1rem] bg-green-50 opacity-[97%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)]",
        position === "top" ? "animate-toast-top" : "animate-toast-bottom"
      )}
    >
      <p className="text-Body text-white">{message}</p>
    </div>
  );
}
