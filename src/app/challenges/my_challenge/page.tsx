"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Layout from "@/app/components/layout";
import FloatingButton from "@/app/components/floatingButton";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import Challenges, { IChallengeInfo } from "./components/challenge";
import ChallengesButton from "./components/challengesButton";

// 나중에 삭제
import profilePic from "@/public/profilePic.jpeg";
import Loading from "./loading";
import { useChallengeEnrolledList } from "@/hooks/useChallengeEnrolledList";

const inProgressChallenge: IChallengeInfo[] = [
  {
    title: "책업일치",
    participation: false,
    participants: 42,
    startAt: new Date(2024, 1, 1),
    endAt: new Date(2024, 4, 27),
    fee: 10000,
    achievement: 70,
  },
  {
    title: "1일 1백준",
    participation: true,
    participants: 42,
    startAt: new Date(2024, 0, 3),
    endAt: new Date(2024, 3, 2),
    fee: 9000,
    achievement: 22,
  },
];
const completedChallenge: IChallengeInfo[] = [
  {
    title: "탄수화물 억제 모임",
    participation: false,
    participants: 12,
    startAt: new Date(2023, 11, 11),
    endAt: new Date(2024, 2, 5),
    fee: 3000,
    achievement: 88,
  },
];
const scheduledChallenge: IChallengeInfo[] = [
  {
    title: "물마시기",
    participation: false,
    participants: 12,
    startAt: new Date(2024, 4, 1),
    endAt: new Date(2024, 7, 25),
    fee: 0,
    achievement: 0,
  },
];

export type ChallengesState = "In Progress" | "Completed" | "Scheduled";

function Page() {
  const [challenges, setChallenges] = useState<IChallengeInfo[] | null>(
    inProgressChallenge
  );
  // TODO: 다른 hook 들과 겹치지 않도록 컴포넌트 분리하기
  const { memberProfile, isLoading, error } = useMemberProfile();
  const { challengeEnrolledList } = useChallengeEnrolledList();
  const [challengesButton, setChallengesButton] =
    useState<ChallengesState>("In Progress");
  const [loadingPage, setLoadingPage] = useState(true);

  const handleChallengesButtonClick = async (type: ChallengesState) => {
    setChallengesButton(type);
    // api요청으로 가져오기.
    type == "In Progress"
      ? setChallenges(inProgressChallenge)
      : type == "Completed"
      ? setChallenges(completedChallenge)
      : setChallenges(scheduledChallenge);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingPage(false);
    }, 1000); // 1초 후 로딩 상태 해제

    return () => clearTimeout(timeoutId);
  }, []);

  if (loadingPage) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 렌더링
  }

  if (memberProfile === null) {
    return <>Error</>;
  }

  return (
    <Layout hasTabBar>
      <div className="flex flex-col max-w-xl px-5 mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-gray-400">안녕하세요</span>
            <h2 className="text-lg font-semibold">{memberProfile.nickname}</h2>
          </div>
          <Image
            className="rounded-full size-16"
            src={memberProfile.imageUrl || profilePic}
            alt="Picture of Avatar"
          />
        </div>
        <div className="flex flex-col mb-10">
          <span className="mb-2 text-sm font-light">
            2024년 1월 24일 목요일
          </span>
          <h3 className="mb-5 text-lg font-semibold">나의 챌린지</h3>
          <div className="flex items-center mb-2 space-x-2">
            <ChallengesButton
              title="진행 중"
              isActivated={challengesButton == "In Progress"}
              onClick={() => handleChallengesButtonClick("In Progress")}
            />
            <ChallengesButton
              title="완료"
              isActivated={challengesButton == "Completed"}
              onClick={() => handleChallengesButtonClick("Completed")}
            />
            <ChallengesButton
              title="진행 예정"
              isActivated={challengesButton == "Scheduled"}
              onClick={() => handleChallengesButtonClick("Scheduled")}
            />
          </div>
          {
            // challenges null일 시 스켈레톤 처리
            challenges ? (
              <Challenges
                challenges={challenges}
                challengeState={challengesButton}
              />
            ) : null
          }
        </div>
      </div>
      <FloatingButton href="/challenges/create_challenge">
        <div className="flex items-center justify-center text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>챌린지 생성</span>
        </div>
      </FloatingButton>
    </Layout>
  );
}

export default Page;
