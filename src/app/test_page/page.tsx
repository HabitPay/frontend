"use client";

import ErrorModal from "@/app/components/errorModal";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import ToastPopup from "../components/toastPopup";
import Loading from "../challenges/[id]/main/loading";

const Page: NextPage = () => {
  return <Loading />;
};

export default Page;
