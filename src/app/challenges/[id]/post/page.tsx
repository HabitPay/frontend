"use client";

import Layout from "@app/components/layout";
import { MB, validImageExtensions } from "@libs/constants";
import { addClassNames } from "@libs/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface photoInfo {
  id: string;
  file: string;
  url: string;
}

interface IForm {
  text: string;
  photos?: photoInfo[];
}

const Page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const [photoList, setPhotoList] = useState<string[] | null>(null);
  const [isNotice, setIsNotice] = useState(false);
  const [isManager, setIsManager] = useState(false);

  // for identify pathname
  const router = useRouter();
  const currentPath = usePathname();

  const onSubmit = async (data: IForm) => {
    console.log(data);
  };

  const onImageFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length <= 0) return;

    // 파일들의 extension 검사
    const isValidExtensions = Array.from(files).every((file) =>
      validImageExtensions.includes(file.type)
    );
    if (!isValidExtensions) {
      setError("photos", {
        message: "지원되는 파일 형식은 JPEG, JPG, PNG, GIF입니다.",
      });
      return;
    }
    // 파일들의 size 검사
    const isAllValidSize = Array.from(files).every(
      (file) => file.size <= 5 * MB
    );
    if (!isAllValidSize) {
      setError("photos", {
        message: "사진 한 장의 크기는 최대 1MB 입니다.",
      });
      return;
    }

    let fileUrlList: string[] = [];
    for (let i = 0; i < files.length; ++i) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      fileUrlList.push(currentImageUrl);
    }
    setPhotoList(fileUrlList);
    // console.log(fileUrlList);
  };

  return (
    <Layout canGoBack title="게시물 작성" isWhiteTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("text", {
            required: { value: true, message: "내용을 입력해주세요." },
          })}
          className="w-full h-fit px-4 pt-4 border-t border-gray-300"
          placeholder="오늘의 챌린지 내용에 대해서 작성해주세요."
        />
        {photoList ? (
          <div className="flex w-full h-28 bg-white fixed bottom-[94px] gap-5 items-center px-5">
            {photoList.map((imageUrl, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={imageUrl}
                  alt="image"
                  width={15}
                  // height={15}
                  className="size-16"
                />
              </div>
            ))}
          </div>
        ) : null}
        <nav className="fixed bottom-0 flex justify-between w-full max-w-xl px-6 py-4 space-x-12 text-xs text-gray-700 bg-white border-t">
          <div className="flex items-center space-x-8 ">
            <div
              className={addClassNames(
                "flex flex-col items-center space-y-2 p-3",
                currentPath === "/challenges/my_challenge"
                  ? "bg-[#EFF8F0] rounded-2xl text-habit-green"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <label className="text-gray-600 hover:text-habit-green flex items-center justify-center  border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <input
                  className="hidden"
                  type="file"
                  accept={validImageExtensions.join(",")}
                  multiple
                  {...register("photos", { onChange: onImageFilesChange })}
                />
              </label>
            </div>
            {isManager ? (
              <div
                onClick={() => setIsNotice((prev) => !prev)}
                className="flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={addClassNames(
                    "size-7",
                    isNotice
                      ? "text-habit-green"
                      : "hover:text-gray-500 transition-colors"
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="text-lg ">공지로 등록</span>
              </div>
            ) : null}
          </div>
          <button className="px-12 py-4 text-lg font-thin text-white border border-transparent shadow-sm bg-habit-green hover:bg-green-600 rounded-2xl focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none">
            저장
          </button>
        </nav>
      </form>
    </Layout>
  );
};

export default Page;
