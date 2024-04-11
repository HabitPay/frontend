import Image from "next/image";
import profilePic from "../../../../../public/profilePic.jpeg";

const ChallengeTitle = () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">책업일치</div>
        <div className="text-xl font-[250] text-habit-gray">
          종료까지 18일 남았습니다.
        </div>
      </div>
      <div className="flex items-center px-3 space-x-2 border-2 h-11 rounded-2xl border-habit-gray">
        <div className="flex -space-x-2">
          <Image
            src={profilePic}
            className="z-30 rounded-full size-9 "
            alt="profilePicture of atendees"
          />
          <Image
            src={profilePic}
            className="z-20 rounded-full size-9"
            alt="profilePicture of atendees"
          />
          <Image
            src={profilePic}
            className="z-10 rounded-full size-9 "
            alt="profilePicture of atendees"
          />
        </div>
        <div>42</div>
      </div>
    </div>
  );
};

export default ChallengeTitle;
