"use client";

import Layout from "@app/components/layout";
import Image from "next/image";
import profilePic from "../../../public/profilePic.jpeg";

const Page = () => {
  return (
    <Layout hasTabBar>
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <span className="text-gray-400">안녕하세요</span>
          <h2 className="text-lg font-semibold">joonhan!</h2>
        </div>
        <Image
          className="rounded-full size-16"
          src={profilePic}
          alt="Picture of Avatar"
        />
      </div>
      <div className="flex flex-col mb-10">
        <span className="mb-3 font-thin">2024년 1월 24일 목요일</span>
        <h3 className="mb-5 text-lg font-semibold">나의 챌린지</h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-white border-2 rounded-xl text-habit-green border-habit-green b">
            진행 중
          </button>
          <button className="px-3 py-1 border-2 border-habit-lightgray bg-habit-lightgray rounded-xl">
            완료
          </button>
          <button className="px-3 py-1 border-2 border-habit-lightgray bg-habit-lightgray rounded-xl">
            진행 예정
          </button>
        </div>
      </div>
      <div className="flex flex-col px-4 py-6 space-y-4 bg-white rounded-xl">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center -space-x-2">
              <Image
                className="z-10 rounded-full size-10"
                src={profilePic}
                alt="profilePicture of atendees"
              />
              <div className="flex items-center justify-center rounded-full size-10 bg-habit-lightgray">
                <span className="text-lg text-gray-600">+41</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">책업일치</h3>
              <span className="text-sm text-habit-gray">
                아직 참여하지 않으셨습니다.
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div className="w-full h-2 bg-habit-green" />
        </div>
        <div className="w-full h-[2px]  bg-habit-lightgray" />
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <span> 2024.01.02 ~ 2024.02.03 (종료까지 18일)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>나의 누적 벌금: 10,000원</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            <span>나의 달성율: 70%/80%</span>
          </div>
        </div>
        <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-green rounded-xl">
          참여하기
        </button>
      </div>
    </Layout>
  );
};

export default Page;
