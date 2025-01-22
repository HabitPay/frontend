"use client";

import { useEffect } from "react";
import Image from "next/image";

import { format } from "date-fns";

import FloatingButton from "@/app/components/floatingButton";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import defaultProfileImage from "@/public/default-profile.jpg";
import withAuth from "@/app/components/withAuth";
import Frame from "@/app/components/frame";
import ChallengeList from "@/app/components/challengeList";
import Loading from "./loading";
import PlusIcon from "@/app/components/icons/plusIcon";

function Page() {
  // TODO: 다른 hook 들과 겹치지 않도록 컴포넌트 분리하기
  const { memberProfile, isLoading, error } = useMemberProfile();

  useEffect(() => {
    document.title = "Challenge List | HabitPay";
  }, []);
  if (memberProfile === null) {
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
        <div className="flex flex-col">
          <span className="mb-2 text-sm font-light">
            {format(new Date(), "yyyy년 MM월 dd일")}
          </span>
          <h3 className="mb-5 text-lg font-semibold">챌린지 목록</h3>
        </div>
        <ChallengeList />
      </div>
      <FloatingButton href="/challenges/create-challenge">
        <div className="flex items-center justify-center text-sm">
          <PlusIcon className="size-4" />
          <span>챌린지 생성</span>
        </div>
      </FloatingButton>
    </Frame>
  );
}

export default withAuth(Page);
