"use client";

import Layout from "@app/components/layout";
import profilePic from "../../../../../public/profilePic.jpeg";
import Image from "next/image";
import Menu from "../components/menu";
import { usePathname } from "next/navigation";
import ChallengeTitle from "../components/challengeTitle";
import IsCompleteToday from "../components/isCompleteToday";

const Page = () => {
  const currentPath = usePathname().split("/");

  return (
    <Layout canGoBack hasTabBar>
      <div className="flex flex-col divide-y-2">
        <div className="flex flex-col px-6">
          <Menu currentPage="챌린지 메인" challengeId={currentPath[2]} />
          <ChallengeTitle />
          <div className="flex flex-col mt-3 space-y-2 text-sm">
            <div>챌린지 설명</div>
            <div className="px-3 py-2 bg-white rounded-2xl">
              복잡한 현대사회에서 살아남기 위한 독서 모임입니다.
              <br />
              각자 읽고 싶은 책을 읽고 간단하게 정리해서 올리면 됩니다.
            </div>
          </div>
          <div className="flex flex-col mt-5 space-y-3">
            <div className="flex items-center justify-between px-4 py-2 text-sm bg-red-100 font-extralight">
              <div className="flex items-center space-x-4">
                <div className="px-2 py-1 text-white bg-red-600 rounded-full">
                  공지
                </div>
                <div>챌린지 규칙입니다. 반드시 확인해주세요!</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between px-4 py-2 text-sm bg-red-100 font-extralight">
              <div className="flex items-center space-x-4">
                <div className="px-2 py-1 text-white bg-red-600 rounded-full">
                  공지
                </div>
                <div>챌린지 규칙입니다. 반드시 확인해주세요!</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col pb-4 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span>
                현재까지
                <span className="font-semibold text-habit-green">
                  100,000원{" "}
                </span>
                모였습니다!
              </span>
              <div className="px-3 py-2 text-white rounded-xl font-extralight bg-habit-green">
                벌금 현황 보기
              </div>
            </div>
            <IsCompleteToday complete={false} />
          </div>
        </div>
        <div className="flex flex-col px-6 pt-4">
          <div className="flex flex-col items-center space-y-3">
            <span className="px-5 py-3 text-sm font-light bg-white rounded-xl">
              어제
            </span>
            <div className="w-full h-64 px-5 py-6 bg-white rounded-2xl">
              <div className="flex items-center pb-4 space-x-3 border-b-2">
                <Image
                  src={profilePic}
                  className="z-30 rounded-full size-12 "
                  alt="profilePicture of writer"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">hokgim</span>
                  <span className="text-sm text-habit-gray">6시간 전</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
