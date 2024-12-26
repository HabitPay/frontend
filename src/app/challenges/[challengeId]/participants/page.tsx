"use client";

import Frame from "@/app/components/frame";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import Image from "next/image";
import defaultProfileImage from "@/public/default-profile.jpg";
import Link from "next/link";

const Page = ({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) => {
  const { challengeDetails, selectedDays, isLoading, error } =
    useChallengeDetails(challengeId);

  return (
    <Frame canGoBack title="참여자 목록" isBorder>
      <div className="flex flex-col max-w-xl px-5 py-3 mx-auto space-y-4">
        {challengeDetails?.enrolledMembersProfileImageList.map(
          (item, index) => (
            <Link
              href={`${item}`}
              key={index}
              className="bg-white rounded-lg px-3 py-2"
            >
              <Image
                className="rounded-full size-16 object-cover shadow-md shadow-slate-400 bg-habit-gray"
                src={item || defaultProfileImage}
                width={64}
                height={64}
                alt="Picture of Avatar"
              />
            </Link>
          )
        )}
      </div>
    </Frame>
  );
};

export default Page;
