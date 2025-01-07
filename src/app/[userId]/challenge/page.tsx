"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { format } from "date-fns";

import FloatingButton from "@/app/components/floatingButton";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { useChallengeEnrolledList } from "@/hooks/useChallengeEnrolledList";
import { ChallengeStatesEnum } from "@/types/enums";

import defaultProfileImage from "@/public/default-profile.jpg";
import withAuth from "@/app/components/withAuth";
import Frame from "@/app/components/frame";
import Loading from "@/app/challenges/my-challenge/loading";
import ChallengeStateSelector from "@/app/challenges/my-challenge/components/challengeStateSelector";
import Challenges from "@/app/challenges/my-challenge/components/challenges";

const Page = ({ params: { userId } }: { params: { userId: string } }) => {
  // 내 닉네임과 프로필url을 불러오는 단순한 api
  // userId를 통한 정보를 불러오는 api필요.
  const { memberProfile, isLoading, error } = useMemberProfile();
  // 내 챌린지 목록을 불러오는 핵심 api
  const { challengeEnrolledList } = useChallengeEnrolledList(userId);
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
            className="object-cover bg-white rounded-full shadow-md size-16 shadow-slate-400"
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
    </Frame>
  );
};

export default withAuth(Page);
