"use client";

import Image from "next/image";
import { FormEvent, useEffect } from "react";
import apiManager from "@/api/apiManager";

export default function Home() {
  useEffect(() => {
    apiManager.get("/boards").then((res) => {
      console.log(res);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = event.currentTarget.title.value;
    const content = event.currentTarget.content.value;
    const password = event.currentTarget.password.value;

    apiManager
      .post("/boards", {
        title,
        content,
        password,
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input type="text" id="content" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" />
        </div>
        <input type="submit" />
      </form>
    </>
  );
}
