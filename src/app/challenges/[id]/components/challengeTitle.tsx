import Image from "next/image";
import profilePic from "../../../../../public/profilePic.jpeg";

interface IChallengeTitleProps {
  title: string;
  remainingDays: number;
  participants: number;
  profileImages: string | null;
}

const ChallengeTitle = ({
  title,
  remainingDays,
  participants,
  profileImages,
}: IChallengeTitleProps) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-xl font-[250] text-habit-gray">
          종료까지 {remainingDays}일 남았습니다.
        </div>
      </div>
      <div className="flex items-center px-3 space-x-2 border-2 h-11 rounded-2xl border-habit-gray">
        <div className="flex -space-x-2">
          <Image
            src={profilePic}
            className="z-30 rounded-full size-9 "
            alt="profilePicture of attendees"
          />
          <Image
            src={profilePic}
            className="z-20 rounded-full size-9"
            alt="profilePicture of attendees"
          />
          <Image
            src={profilePic}
            className="z-10 rounded-full size-9 "
            alt="profilePicture of attendees"
          />
        </div>
        <div>{participants}</div>
      </div>
    </div>
  );
};

export default ChallengeTitle;
