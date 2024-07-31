"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/confirmModal";

const Page: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  const onClick = () => {
    console.log("clicked!");
  };
  return (
    <div>
      <span>def</span>
      <span>ghi</span>
      <ConfirmModal
        onClick={onClick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        삭제
      </ConfirmModal>
    </div>
  );
};

export default Page;
