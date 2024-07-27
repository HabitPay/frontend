import Image from "next/image";

import { IChallengeEnrolledListItemDto } from "@/types/challenge";
import { ChallengeStatesEnum } from "@/types/enums";
import profilePic from "@/public/profilePic.jpeg";
import { differenceInCalendarDays, format } from "date-fns";

interface IChallengeCardProps {
  items: IChallengeEnrolledListItemDto[];
  challengeState: ChallengeStatesEnum;
}

function ChallengeCard({ items, challengeState }: IChallengeCardProps) {
  const now = new Date();
  console.log(items);
  return (
    <>
      {items.map((item, index) => {
        const progressPercent: number =
          (item.successCount / item.totalParticipatingDaysCount) * 100;

        return (
          <div
            key={index}
            className="flex flex-col px-4 py-6 mt-6 space-y-4 bg-white rounded-xl"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center -space-x-2">
                    <Image
                      className="z-10 rounded-full size-12"
                      src={item.hostProfileImage || profilePic}
                      width={48}
                      height={48}
                      alt="profilePicture of atendees"
                    />
                    <div className="flex items-center justify-center rounded-full size-12 bg-habit-lightgray">
                      <span className="text-lg text-gray-600">
                        {`+${item.numberOfParticipants - 1}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    {challengeState == ChallengeStatesEnum.InProgress &&
                      item.isParticipatedToday && (
                        <span className="text-sm text-habit-green">
                          참여 완료
                        </span>
                      )}

                    {challengeState == ChallengeStatesEnum.InProgress &&
                      item.isTodayParticipatingDay &&
                      !item.isParticipatedToday && (
                        <span className="text-sm text-habit-gray">
                          아직 참여하지 않으셨습니다.
                        </span>
                      )}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
              <div className="w-full h-2 bg-habit-green" />
            </div>
            <div className="w-full h-[2px]  bg-habit-lightgray" />
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>

                <span>
                  {format(new Date(item.startDate), "yyyy.MM.dd")} ~{" "}
                  {format(new Date(item.endDate), "yyyy.MM.dd")}
                </span>

                {challengeState === ChallengeStatesEnum.InProgress && (
                  <span>
                    (종료까지{" "}
                    {differenceInCalendarDays(new Date(item.endDate), now)}일
                    남음)
                  </span>
                )}

                {challengeState === ChallengeStatesEnum.Scheduled && (
                  <span>
                    (
                    {differenceInCalendarDays(new Date(item.startDate), now) +
                      1}
                    일 후 시작)
                  </span>
                )}

                {challengeState === ChallengeStatesEnum.Completed && (
                  <span>
                    (총{" "}
                    {differenceInCalendarDays(
                      new Date(item.endDate),
                      new Date(item.startDate)
                    ) + 1}
                    일 진행)
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>{`나의 누적 벌금: ${item.totalFee.toLocaleString()} 원`}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
                <span>{`나의 달성율: ${progressPercent} / 100%`}</span>
              </div>
            </div>

            {challengeState == ChallengeStatesEnum.InProgress &&
              item.isTodayParticipatingDay &&
              item.isParticipatedToday && (
                <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-green rounded-xl">
                  이미 참여했습니다.
                </button>
              )}

            {challengeState == ChallengeStatesEnum.InProgress &&
              item.isTodayParticipatingDay &&
              !item.isParticipatedToday && (
                <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-green rounded-xl">
                  참여하기
                </button>
              )}

            {challengeState == ChallengeStatesEnum.InProgress &&
              !item.isTodayParticipatingDay && (
                <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-gray rounded-xl">
                  오늘은 참여하는 날이 아닙니다.
                </button>
              )}

            {challengeState === ChallengeStatesEnum.Scheduled && (
              <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-gray rounded-xl">
                아직 시작하지 않은 챌린지입니다
              </button>
            )}

            {challengeState === ChallengeStatesEnum.Completed && (
              <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-gray rounded-xl">
                종료된 챌린지입니다
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}

export default ChallengeCard;
