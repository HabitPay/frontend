"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/confirmModal";
import Calendar from "react-calendar";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@/styles/CustomMdEditor.css";

const Page: NextPage = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  return <div className="container w-96"></div>;
};

export default Page;
