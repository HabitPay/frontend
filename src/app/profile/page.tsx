"use client";

import Image from "next/image";
import profilePic from "../../../public/profilePic.jpeg";
import { useForm } from "react-hook-form";
import Layout from "@app/components/layout";
import Input from "@app/components/input";
import Button from "@app/components/button";

interface IForm {
  nickname: string;
}

const Page = () => {
  const { register } = useForm<IForm>();
  return (
    <Layout title="프로필" hasTabBar>
      <div className="flex flex-col items-center w-screen px-4 space-y-10">
        <div className="px-4 w-full flex flex-col items-center space-y-4">
          <Image
            className="rounded-full size-32"
            src={profilePic}
            alt="Picture of me"
            placeholder="blur"
          />
          <form className="flex flex-col w-full space-y-6">
            <div className="flex flex-col w-full space-y-2">
              <span className="text-sm">닉네임</span>
              <Input type="text" register={register("nickname")} />
            </div>
            <Button text="저장" />
          </form>
        </div>
        <div className="bg-white rounded-xl w-full pt-4 px-4">
          <div className="text-lg font-bold pb-2">계정 관리</div>
          <div className="flex flex-col items-center border-t-2 py-4 space-y-3">
            <button className="w-full py-1 rounded-md border-slate-400 border-2">
              로그아웃
            </button>
            <button className="w-full py-1 rounded-md border-slate-400 border-2">
              계정삭제
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
