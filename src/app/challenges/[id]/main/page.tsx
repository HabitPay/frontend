"use client";

import Link from "next/link";
import Image from "next/image";

import { differenceInDays, isBefore } from "date-fns";

import Layout from "@/app/components/layout";
import profilePic from "@/public/profilePic.jpeg";
import FloatingButton from "@/app/components/floatingButton";
import Menu from "../components/menu";
import ChallengeTitle from "../components/challengeTitle";
import IsCompleteToday from "../components/isCompleteToday";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import Enrollment from "../components/enrollment";
import { usePathname } from "next/navigation";
import { getParentPath } from "@/libs/utils";
import PostsFeed, { PostsFeedExample } from "@/app/components/postsFeed";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { challengeDetails, isLoading, error } = useChallengeDetails(id);
  const pathname = usePathname();

  // TODO: CSS 적용하기 or 스켈레톤으로 처리하기
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (challengeDetails === null) return <div>Challenge not found</div>;

  const {
    startDate,
    isMemberEnrolledInChallenge,
  }: { startDate: string; isMemberEnrolledInChallenge: boolean } =
    challengeDetails;
  const isBeforeStartDate = isBefore(new Date(), new Date(startDate));

  // PostsFeed의 prop으로 주기위한 예시. 백엔드완성되면 삭제
  const initialFeed = [
    {
      profilePic: "/profilePic.jpeg",
      nickname: "hogkim",
      createdAt: new Date(),
      isNotification: true,
      imageList: [
        "/default-profile.jpeg",
        "/profilePic.jpeg",
        "/chungking_express__movie_poster__by_seblakes31_dep34tb-fullview.jpg",
        "/manaca.JPG",
      ],
      contents:
        "test contents test contents test contents test contents test contents test contents test contents test contents test contents",
    },
    {
      profilePic: "/default-profile.jpeg",
      nickname: "jkwak",
      createdAt: new Date(),
      isNotification: false,
      imageList: ["/profilePic.jpeg", "/default-profile.jpeg"],
      contents:
        "example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents ",
    },
  ];

  return (
    <Layout canGoBack hasTabBar>
      <div className="flex flex-col divide-y-2">
        <div className="flex flex-col px-6">
          <Menu currentPage="챌린지 메인" challengeId={id} />
          {challengeDetails && (
            <ChallengeTitle
              title={challengeDetails.title}
              startDate={startDate}
              isBeforeStartDate={isBeforeStartDate}
              remainingDays={
                differenceInDays(
                  new Date(challengeDetails.endDate),
                  Date.now()
                ) + 1
              }
              participants={42}
              profileImages={challengeDetails.hostProfileImage}
            />
          )}

          <div className="flex flex-col mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between h-8">
              <div>챌린지 설명</div>
              {challengeDetails && challengeDetails.isHost && (
                <Link
                  href={`/challenges/${id}/edit`}
                  className="flex items-center space-x-1 bg-[#FFF9C4] pl-2 pr-3 py-1 rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <span>챌린지 정보 수정</span>
                </Link>
              )}
            </div>
            <div className="px-3 py-2 bg-white rounded-2xl">
              {challengeDetails && challengeDetails.description}
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
              <Link
                href={`/challenges/${id}/fee_table`}
                className="px-3 py-2 text-white rounded-xl font-extralight bg-habit-green"
              >
                벌금 현황 보기
              </Link>
            </div>
            <IsCompleteToday complete={false} />
          </div>
        </div>
        <div className="flex flex-col px-6 pt-4">
          <div className="flex flex-col items-center space-y-3">
            {isBeforeStartDate ? (
              <Enrollment
                id={id as string}
                isMemberEnrolledInChallenge={isMemberEnrolledInChallenge}
              />
            ) : (
              <>
                <span className="px-5 py-3 text-sm font-light bg-white rounded-xl">
                  어제
                </span>
                <PostsFeed initialFeed={initialFeed} />
                <FloatingButton href={`${getParentPath(pathname)}/post`}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
