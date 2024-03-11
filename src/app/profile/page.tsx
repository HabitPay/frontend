"use client";

import Image from "next/image";
import profilePic from "../../../public/profilePic.jpeg";
import { useForm } from "react-hook-form";
import Layout from "@app/components/layout";
import Input from "@app/components/input";
import Button from "@app/components/button";
import { useState } from "react";

interface IForm {
  nickname: string;
  profileImage: FileList | string | null;
}

const Page = () => {
  const {
    register,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>({});
  console.log(watch());

  const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null);

  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && file.size > 1024 * 1024) {
        setError("profileImage", {
          message: "파일 크기는 1MB를 초과할 수 없습니다.",
        });
        setValue("profileImage", null);
        setProfileImageSrc(null);
      } else {
        setError("profileImage", { message: "" });
        //프로필 이미지 변경
        // setProfileImageSrc(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.onload = () => {
          setProfileImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Layout title="프로필" hasTabBar>
      <div className="flex flex-col items-center w-screen px-4 space-y-10">
        <form className="px-4 w-full flex flex-col items-center space-y-4 static">
          <Image
            className="rounded-full size-32"
            src={profileImageSrc || profilePic}
            alt="Picture of me"
            width={300}
            height={300}
          />
          <label className="absolute top-40 left-64 inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              {...register("profileImage", { onChange: onProfileImageChange })}
            />
          </label>
          <div className="flex flex-col w-full space-y-6">
            <div className="flex flex-col w-full space-y-2">
              <span className="text-sm">닉네임</span>
              <Input type="text" register={register("nickname")} />
            </div>
            <Button text="저장" />
          </div>
          {errors.nickname && <span>{errors.nickname.message}</span>}
          {errors.profileImage && <span>{errors.profileImage.message}</span>}
        </form>
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
