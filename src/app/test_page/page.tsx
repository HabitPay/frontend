"use client";

import ErrorModal from "@/app/components/errorModal";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import ToastPopup from "../components/toastPopup";

const Page: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const [toast, setToast] = useState<string>("");
  useEffect(() => {
    setToast(
      "hogkim is herehogkim is herehogkim is herehogkim is herehogkim is "
    );
  }, []);
  return (
    <div>
      <span>def</span>
      <span>ghi</span>
      {/* <ErrorModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Modals
      </ErrorModal> */}
      {toast ? (
        <ToastPopup
          message={toast}
          setToast={setToast}
          position="bottom"
          type="error"
        />
      ) : null}
    </div>
  );
};

export default Page;
