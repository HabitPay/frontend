"use client";

import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface IModal {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
  children: ReactNode;
}

const ConfirmModal = ({ open, onClick, onClose, children }: IModal) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black bg-opacity-50" />
      <div className="fixed z-50 flex flex-col gap-5 p-5 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md top-1/2 left-1/2 w-60">
        <div className="font-bold ">{children}</div>
        <div className="flex flex-col">
          <div>복구할 수 없습니다.</div>
          <div>정말 삭제하시겠습니까?</div>
        </div>
        <div className="flex gap-6 *:rounded-lg mx-auto">
          <button className="px-3 py-1 bg-red-400 " onClick={onClick}>
            삭제
          </button>
          <button className="px-3 py-1 bg-slate-400" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ConfirmModal;
