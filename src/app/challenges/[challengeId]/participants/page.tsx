"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Frame from "@/app/components/frame";
import defaultProfileImage from "@/public/default-profile.jpg";
import apiManager from "@/api/apiManager";
import { ChallengeMembersResponseDTO, MemberDTO } from "@/types/challenge";

const Page = ({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) => {
  const [members, setMembers] = useState<MemberDTO[]>([]);
  useEffect(() => {
    document.title = "Members | HabitPay";
    const getMembers = async () => {
      const res = await apiManager.get(`/challenges/${challengeId}/members`);
      const data: ChallengeMembersResponseDTO = res.data.data;
      setMembers(data);
    };
    getMembers();
  }, [challengeId]);

  return (
    <Frame canGoBack title="참여자 목록" isBorder>
      <div className="flex flex-col max-w-xl px-5 py-3 mx-auto space-y-4">
        {members &&
          members.map((member, index) => (
            <Link
              href={`/${member.memberId}/challenge`}
              key={index}
              className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg"
            >
              <Image
                className="object-cover rounded-full shadow-md size-16 shadow-slate-400 bg-habit-gray"
                src={member.profileImageUrl || defaultProfileImage}
                width={64}
                height={64}
                alt="Picture of Avatar"
              />
              <div>{member.nickname}</div>
            </Link>
          ))}
      </div>
    </Frame>
  );
};

export default Page;
