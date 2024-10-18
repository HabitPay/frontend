"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/confirmModal";
import Calendar from "react-calendar";

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
      <Calendar />
    </div>
  );
};

export default Page;
