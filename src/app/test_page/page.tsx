"use client";

import ErrorModal from "@app/components/errorModal";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Page: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  return (
    <div>
      <span>def</span>
      <span>ghi</span>
      <ErrorModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Modals
      </ErrorModal>
    </div>
  );
};

export default Page;
