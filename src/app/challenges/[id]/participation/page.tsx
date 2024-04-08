"use client";

import Layout from "@app/components/layout";
import Menu from "../components/menu";
import { usePathname } from "next/navigation";
import ChallengeTitle from "../components/challengeTitle";
import IsCompleteToday from "../components/isCompleteToday";
import Calendar from "react-calendar";
import FloatingButton from "@app/components/floatingButton";

const Page = () => {
  const currentPath = usePathname().split("/");

  return (
    <Layout hasTabBar canGoBack>
      <div className="flex flex-col divide-y-2">
        <div className="flex flex-col px-6 pb-5">
          <Menu currentPage="참여 기록" challengeId={currentPath[2]} />
          <ChallengeTitle />
          <IsCompleteToday complete={false} />
        </div>
        <div className="flex flex-col px-6 py-6">
          <Calendar className="px-8 py-6 space-y-4 bg-white shadow-lg" />
          {/* 참여 기록 컴포넌트화 하기 */}
          <div className="mt-4 space-y-4">
            <span className="px-4 text-sm">참여 기록</span>
            <div className="px-5 py-3 text-sm bg-white rounded-xl">
              <span>✅ 2023.12.11 </span>
              <span className=" text-habit-gray">08:01:13</span>
            </div>
          </div>
        </div>
      </div>
      <FloatingButton href={"챌린지 작성"}>
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default Page;
