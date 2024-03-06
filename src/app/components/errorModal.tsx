"use client";

import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface IModal {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ErrorModal = ({ open, onClose, children }: IModal) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white z-50">
        <button onClick={onClose}>모달 닫기</button>
        {children}
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ErrorModal;
