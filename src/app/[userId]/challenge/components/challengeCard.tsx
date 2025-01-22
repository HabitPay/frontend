import Image from "next/image";
import Link from "next/link";

import { differenceInCalendarDays, format } from "date-fns";

import { IChallengeEnrolledListItemDto } from "@/types/challenge";
import { ChallengeStatesEnum } from "@/types/enums";
import defaultProfileImage from "@/public/default-profile.jpg";
import { calculateTimeRemaining } from "@/libs/utils";
import ChevronRightIcon from "@/app/components/icons/chevronRightIcon";
import CalandarIcon from "@/app/components/icons/calandarIcon";
import DollarCircleIcon from "@/app/components/icons/dollarCircleIcon";
import ChartBarIcon from "@/app/components/icons/chartBarIcon";

interface IChallengeCardProps {
  items: IChallengeEnrolledListItemDto[];
  challengeState: ChallengeStatesEnum;
  isCurrentUser: boolean;
}

function ChallengeCard({
  items,
  challengeState,
  isCurrentUser,
}: IChallengeCardProps) {
  const now = new Date();
  return (
    <>
      {items.map((item, index) => {
        let progressPercent: number = Math.round(
          (item.successCount / item.totalParticipatingDaysCount) * 100
        );
        if (isNaN(progressPercent) || !isFinite(progressPercent)) {
          progressPercent = 100;
        }
        return (
          <div
            key={index}
            className="flex flex-col px-4 py-6 mt-6 space-y-4 bg-white rounded-xl"
          >
            <div className="flex flex-col space-y-3">
              <Link href={`/challenges/${item.challengeId}/main`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center -space-x-2">
                      <Image
                        className="z-10 object-cover rounded-full shadow-md size-12 shadow-slate-400 bg-habit-gray"
                        src={item.hostProfileImage || defaultProfileImage}
                        width={48}
                        height={48}
                        alt="Profile image of challenge host"
                      />
                      <div className="flex items-center justify-center rounded-full size-12 bg-habit-lightgray">
                        <span className="text-lg text-gray-600">
                          {`+${
                            item.numberOfParticipants === 0
                              ? 0
                              : item.numberOfParticipants - 1
                          }`}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      {challengeState == ChallengeStatesEnum.InProgress &&
                        item.isParticipatedToday &&
                        isCurrentUser && (
                          <span className="text-sm text-habit-green">
                            참여 완료
                          </span>
                        )}

                      {challengeState == ChallengeStatesEnum.InProgress &&
                        item.isTodayParticipatingDay &&
                        !item.isParticipatedToday &&
                        isCurrentUser && (
                          <span className="text-sm text-habit-gray">
                            아직 참여하지 않으셨습니다.
                          </span>
                        )}
                    </div>
                  </div>

                  <ChevronRightIcon className="size-6" />
                </div>
              </Link>
              <div className="w-full h-2 bg-habit-green" />
            </div>
            <div className="w-full h-[2px]  bg-habit-lightgray" />
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <CalandarIcon className="size-6" />

                <span>
                  {format(new Date(item.startDate), "yyyy.MM.dd")} -{" "}
                  {format(new Date(item.endDate), "yyyy.MM.dd")}
                </span>

                {challengeState === ChallengeStatesEnum.InProgress && (
                  <span>
                    {`(${calculateTimeRemaining(
                      item.startDate,
                      item.endDate
                    )})`}
                  </span>
                )}

                {challengeState === ChallengeStatesEnum.Scheduled && (
                  <span>
                    {`(${calculateTimeRemaining(
                      item.startDate,
                      item.endDate
                    )})`}
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
                <DollarCircleIcon className="size-6" />
                <span>{`나의 누적 벌금: ${item.totalFee.toLocaleString()} 원`}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ChartBarIcon className="size-6" />
                <span>{`나의 달성율: ${progressPercent} / 100%`}</span>
              </div>
            </div>

            {challengeState == ChallengeStatesEnum.InProgress &&
              item.isTodayParticipatingDay &&
              item.isParticipatedToday &&
              isCurrentUser && (
                <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-gray  rounded-xl">
                  이미 참여했습니다.
                </button>
              )}

            {challengeState == ChallengeStatesEnum.InProgress &&
              item.isTodayParticipatingDay &&
              !item.isParticipatedToday &&
              isCurrentUser && (
                <Link
                  href={`/challenges/${item.challengeId}/post`}
                  className="w-full py-[6px] text-sm font-thin text-center text-white bg-habit-green rounded-xl"
                >
                  참여하기
                </Link>
              )}

            {challengeState == ChallengeStatesEnum.InProgress &&
              !item.isTodayParticipatingDay &&
              isCurrentUser && (
                <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-gray rounded-xl">
                  오늘은 참여하는 날이 아닙니다.
                </button>
              )}

            {challengeState === ChallengeStatesEnum.Scheduled &&
              isCurrentUser && (
                <button className="w-full py-[6px] text-sm font-thin text-white bg-habit-gray rounded-xl">
                  아직 시작하지 않은 챌린지입니다
                </button>
              )}

            {challengeState === ChallengeStatesEnum.Completed &&
              isCurrentUser && (
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
