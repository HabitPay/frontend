"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { format } from "date-fns";

import FloatingButton from "@/app/components/floatingButton";
import Challenges from "./components/challenges";
import ChallengeStateSelector from "./components/challengeStateSelector";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { useChallengeEnrolledList } from "@/hooks/useChallengeEnrolledList";
import { ChallengeStatesEnum } from "@/types/enums";

// 나중에 삭제
import defaultProfileImage from "@/public/default-profile.jpg";
import Loading from "./loading";
import withAuth from "@/app/components/withAuth";
import Frame from "@/app/components/frame";
// import Head from "next/head";

function Page() {
  // TODO: 다른 hook 들과 겹치지 않도록 컴포넌트 분리하기
  const { memberProfile, isLoading, error } = useMemberProfile();
  const { challengeEnrolledList } = useChallengeEnrolledList();
  const [challengeStateSelection, setChallengeStateSelection] =
    useState<ChallengeStatesEnum>(ChallengeStatesEnum.InProgress);
  useEffect(() => {
    document.title = "My Challenge | HabitPay";
  }, []);
  if (memberProfile === null || challengeEnrolledList === null) {
    return <Loading />;
  }

  return (
    <Frame hasTabBar>
      <div className="flex flex-col max-w-xl px-5 mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-gray-400">안녕하세요</span>
            <h2 className="text-lg font-semibold">{memberProfile.nickname}</h2>
          </div>
          <Image
            className="rounded-full size-16 object-cover shadow-md shadow-slate-400 bg-white"
            src={memberProfile.imageUrl || defaultProfileImage}
            width={64}
            height={64}
            alt="Picture of Avatar"
          />
        </div>
        <div className="flex flex-col mb-10">
          <span className="mb-2 text-sm font-light">
            {format(new Date(), "yyyy년 MM월 dd일")}
          </span>

          <h3 className="mb-5 text-lg font-semibold">나의 챌린지</h3>

          <div className="flex items-center mb-2 space-x-2">
            <ChallengeStateSelector
              challengeStateSelection={challengeStateSelection}
              setter={setChallengeStateSelection}
            />
          </div>

          <Challenges
            challenges={challengeEnrolledList}
            challengeState={challengeStateSelection}
          />
        </div>
      </div>
      <FloatingButton href="/challenges/create-challenge">
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
    </Frame>
  );
}

export default withAuth(Page);
