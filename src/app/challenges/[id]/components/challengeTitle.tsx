import Image from "next/image";
import defaultProfileImage from "@/public/default-profile.jpg";
import { differenceInDays, isBefore } from "date-fns";

interface IChallengeTitleProps {
  title: string;
  remainingDays: number;
  participants: number;
  profileImages: string[];
  startDate: string;
  isBeforeStartDate: boolean;
}

const ChallengeTitle = ({
  title,
  remainingDays,
  participants,
  startDate,
  isBeforeStartDate,
  profileImages,
}: IChallengeTitleProps) => {
  const daysLeftUntilStart = differenceInDays(new Date(startDate), new Date());

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-xl font-[250] text-habit-gray">
          {isBeforeStartDate
            ? `시작까지 ${daysLeftUntilStart}일 `
            : `종료까지 ${remainingDays}일 `}
          남았습니다.
        </div>
      </div>
      <div className="flex items-center px-3 space-x-2 border-2 h-11 rounded-2xl border-habit-gray">
        <div className="flex -space-x-2">
          {profileImages.map((profileImage, index) => {
            return (
              <Image
                key={index}
                src={profileImage || defaultProfileImage}
                className={`z-${30 - index * 10} rounded-full size-9`}
                alt="profile image"
                width={36}
                height={36}
              />
            );
          })}
        </div>
        <div>{participants}</div>
      </div>
    </div>
  );
};

export default ChallengeTitle;
