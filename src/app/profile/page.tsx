"use client";

import Image from "next/image";
import Input from "../components/input";
import profilePic from "../../../public/profilePic.jpeg";
import Layout from "../components/layout";
import { useForm } from "react-hook-form";

const Page = () => {
  const { register } = useForm();
  return (
    <Layout title="프로필" hasTabBar>
      <div className="flex flex-col items-center w-screen px-10 space-y-10">
        <form className="flex flex-col items-center space-y-4">
          <Image
            className="rounded-full size-32"
            src={profilePic}
            alt="Picture of me"
            placeholder="blur"
          />
          <div className="flex flex-col w-full space-y-2">
            <span className="text-sm">닉네임</span>
            {/* <Input type="text" {...register("nickname")} /> */}
          </div>
        </form>
        <div>
          <span>계정관리</span>
          <div className="flex flex-col items-center">
            <button>로그아웃</button>
            <button>계정삭제</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
