"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useSetRecoilState } from "recoil";
import { isBefore } from "date-fns";

import FloatingButton from "@/app/components/floatingButton";
import Frame from "@/app/components/frame";
import PostItem from "@/app/components/postItem";
import PostsFeed from "@/app/components/postsFeed";
import apiManager from "@/api/apiManager";
import {
  ChallengeContentResponseDTO,
  IChallengeDetailsDto,
} from "@/types/challenge";
import { Days } from "@/types/enums";
import { addClassNames, getParentPath } from "@/libs/utils";
import { toastPopupAtom } from "@/hooks/atoms";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import { getId } from "@/libs/jwt";
import Menu from "../components/menu";
import ChallengeTitle from "../components/challengeTitle";
import Enrollment from "../components/enrollment";
import Label from "../../components/label";
import ChallengeParticipationStatus from "../components/ChallengeParticipationStatus";
import Loading from "./loading";
import CogWheelIcon from "@/app/components/icons/cogWheelIcon";
import ChevronUpIcon from "@/app/components/icons/chevronUpIcon";
import ChevronDownIcon from "@/app/components/icons/chevronDownIcon";
import PencilIcon from "@/app/components/icons/pencilIcon";
import ChevronRightIcon from "@/app/components/icons/chevronRightIcon";

const Page = ({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) => {
  const [myId, setMyId] = useState<string | null | undefined>();
  const [challengeDetail, setChallengeDetail] = useState(false);
  const [totalAbsenceFee, setTotalAbsenceFee] = useState<number | undefined>(0);
  const [isAnnouncements, setIsAnnouncements] = useState(false);
  const [announcements, setAnnouncements] =
    useState<ChallengeContentResponseDTO | null>(null);
  const { challengeDetails, selectedDays, isLoading, error } =
    useChallengeDetails(challengeId);
  const pathname = usePathname();
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const router = useRouter();

  useEffect(() => {
    console.log(challengeDetail);
    document.title = "Challenge Main | HabitPay";
    setMyId(getId());
    const getAnnouncementsPosts = async () => {
      const res = await apiManager.get(
        `/challenges/${challengeId}/posts/announcements`
      );
      if (res.data.content) {
        setAnnouncements(res.data);
      }
    };
    getAnnouncementsPosts();
    setTotalAbsenceFee(challengeDetails?.totalAbsenceFee);
  }, [challengeId, challengeDetails?.totalAbsenceFee, challengeDetail]);

  if (isLoading) return <Loading />;
  if (error || challengeDetails === null) {
    setToastPopup({
      // @ts-ignore
      message: error.data.message,
      top: false,
      success: false,
    });
    router.push(`/${myId}/challenge`);
    return <></>;
  }

  const {
    title,
    description,
    startDate,
    endDate,
    numberOfParticipants,
    enrolledMembersProfileImageList,
    isHost,
    isMemberEnrolledInChallenge,
  }: IChallengeDetailsDto = challengeDetails;

  const isBeforeStartDate = isBefore(new Date(), new Date(startDate));

  return (
    <Frame canGoBack hasTabBar>
      <div className="flex flex-col divide-y-2">
        <div className="flex flex-col px-6">
          <Menu
            currentPage="챌린지 메인"
            challengeId={challengeId}
            isMemberEnrolledInChallenge={
              challengeDetails.isMemberEnrolledInChallenge
            }
          />
          <ChallengeTitle
            title={title}
            startDate={startDate}
            endDate={endDate}
            participants={numberOfParticipants}
            profileImages={enrolledMembersProfileImageList}
          />

          <div className="flex flex-col mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between h-8">
              <div>챌린지 설명</div>
              <div className="flex space-x-2">
                {isHost && (
                  <Link
                    href={`/challenges/${challengeId}/edit`}
                    className="flex items-center space-x-1 bg-[#FFF9C4] pl-2 pr-3 py-1 rounded-2xl"
                  >
                    <CogWheelIcon className="size-5 text-gray-400" />
                    <span>챌린지 정보 수정</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setChallengeDetail(!challengeDetail);
                  }}
                >
                  {challengeDetail ? (
                    <ChevronUpIcon className="size-6" />
                  ) : (
                    <ChevronDownIcon className="size-6" />
                  )}
                </button>
              </div>
            </div>
            <div className="px-3 py-2 bg-white rounded-2xl">{description}</div>
            {challengeDetail && (
              <div className="flex flex-col">
                <div className="flex flex-col mb-2">
                  <Label id="" title="챌린지 참여 요일" isRequired={false} />
                  <div className="flex flex-row justify-between px-3 mt-2 text-sm">
                    {selectedDays.map((item, index) => (
                      <div
                        key={index}
                        className={addClassNames(
                          "flex items-center justify-center p-1 rounded-full size-6 ",
                          item === 1
                            ? "text-habit-green bg-[#E0E9E1]"
                            : "bg-[#CCCCCC]"
                        )}
                      >
                        {Days[index]}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <Label id="" title="1회 실패 당 벌금" isRequired={false} />
                  <div className="px-4 py-2 mt-2 text-sm font-light text-red-500 bg-white rounded-2xl">
                    {challengeDetails &&
                      `${new Intl.NumberFormat("ko-KR").format(
                        challengeDetails?.feePerAbsence
                      )}원`}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col mt-5 space-y-3">
            {announcements ? (
              <div className="flex items-center justify-between px-4 py-2 text-sm bg-red-100 font-extralight">
                <div className="flex items-center space-x-4">
                  <div className="px-2 py-1 text-white bg-red-600 rounded-full">
                    공지
                  </div>
                  <div onClick={(prev) => setIsAnnouncements(!prev)}>
                    챌린지 규칙입니다. 반드시 확인해주세요!
                  </div>
                  {isAnnouncements ? (
                    <div className="flex flex-col gap-3">
                      {announcements?.content?.length > 0 &&
                        announcements.content.map((announcement) => (
                          <PostItem
                            contentDTO={announcement}
                            key={announcement.id}
                            challengeId={challengeId}
                            isLoading={isLoading}
                          />
                        ))}
                    </div>
                  ) : null}
                </div>
                <ChevronRightIcon className="size-4" />
              </div>
            ) : null}
          </div>
          <div className="flex flex-col pb-4 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span>
                현재까지
                <span className="font-semibold text-habit-green">
                  {` ${totalAbsenceFee} 원 `}
                </span>
                모였습니다!
              </span>
              {challengeDetails.isMemberEnrolledInChallenge && (
                <Link
                  href={`/challenges/${challengeId}/fee-table`}
                  className="px-3 py-2 text-white rounded-xl font-extralight bg-habit-green"
                >
                  벌금 현황 보기
                </Link>
              )}
            </div>
            {new Date() < new Date(endDate) &&
              challengeDetails.isMemberEnrolledInChallenge && (
                <ChallengeParticipationStatus
                  isParticipatedToday={challengeDetails.isParticipatedToday}
                  isTodayParticipatingDay={
                    challengeDetails.isTodayParticipatingDay
                  }
                />
              )}
          </div>
        </div>
        <div className="flex flex-col px-6 pt-4">
          <div className="flex flex-col items-center space-y-3">
            {isBeforeStartDate ? (
              <Enrollment
                id={challengeId as string}
                isMemberEnrolledInChallenge={isMemberEnrolledInChallenge}
                isHost={isHost}
              />
            ) : (
              <>
                <PostsFeed id={challengeId} />
                {challengeDetails.isMemberEnrolledInChallenge && (
                  <FloatingButton href={`${getParentPath(pathname)}/post`}>
                    <PencilIcon className="size-7" />
                  </FloatingButton>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default Page;
