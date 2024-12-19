import Image from "next/image";
import defaultProfileImage from "@/public/default-profile.jpg";
import { differenceInDays, format, isBefore } from "date-fns";
import { calculateTimeRemaining } from "@/libs/utils";

interface IChallengeTitleProps {
  title: string;
  participants: number;
  profileImages: string[];
  startDate: string;
  endDate: string;
  isBeforeStartDate: boolean;
}

const ChallengeTitle = ({
  title,
  participants,
  startDate,
  endDate,
  isBeforeStartDate,
  profileImages,
}: IChallengeTitleProps) => {
  const daysLeftUntilStart = differenceInDays(new Date(startDate), new Date());

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-xl font-[420] text-habit-gray">
          {calculateTimeRemaining(startDate, endDate)}
        </div>
        <div className=" text-md font-light">
          {`${format(new Date(startDate), "yyyy.MM.dd")} - ${format(
            new Date(endDate),
            "yyyy.MM.dd"
          )}`}
        </div>
      </div>
      <div className="flex items-center px-3 space-x-2 border-2 h-11 rounded-2xl border-habit-gray">
        <div className="flex -space-x-2">
          {profileImages.map((profileImage, index) => {
            return (
              <Image
                key={index}
                src={profileImage || defaultProfileImage}
                className={`z-${
                  50 - 10 * (index + 1)
                }  rounded-full size-9 object-contain bg-white`}
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
