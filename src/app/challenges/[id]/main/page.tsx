"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useSetRecoilState } from "recoil";
import { differenceInDays, isBefore } from "date-fns";

import FloatingButton from "@/app/components/floatingButton";
import Menu from "../components/menu";
import ChallengeTitle from "../components/challengeTitle";
import IsCompleteToday from "../components/isCompleteToday";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import Enrollment from "../components/enrollment";
import { addClassNames, getParentPath } from "@/libs/utils";
import PostsFeed from "@/app/components/postsFeed";
import {
  ChallengeContentResponseDTO,
  IChallengeDetailsDto,
} from "@/types/challenge";
import { toastPopupAtom } from "@/hooks/atoms";
import Loading from "./loading";
import Frame from "@/app/components/frame";
import apiManager from "@/api/apiManager";
import { useEffect, useState } from "react";
import PostItem from "@/app/components/postItem";
import { Days } from "@/types/enums";
import Label from "../../components/label";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [challengeDetail, setChallengeDetail] = useState(false);
  const [totalAbsenceFee, setTotalAbsenceFee] = useState<number | undefined>(0);
  const [isAnnouncements, setIsAnnouncements] = useState(false);
  const [announcements, setAnnouncements] =
    useState<ChallengeContentResponseDTO | null>(null);
  const { challengeDetails, selectedDays, isLoading, error } =
    useChallengeDetails(id);
  const pathname = usePathname();
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const router = useRouter();

  useEffect(() => {
    document.title = "Challenge Main | HabitPay";
    const getAnnouncementsPosts = async () => {
      const res = await apiManager.get(`/challenges/${id}/posts/announcements`);
      if (res.data.content) {
        setAnnouncements(res.data);
      }
    };
    getAnnouncementsPosts();
    setTotalAbsenceFee(challengeDetails?.totalAbsenceFee);
  }, [id, challengeDetails?.totalAbsenceFee]);

  if (isLoading) return <Loading />;
  if (error || challengeDetails === null) {
    setToastPopup({
      // @ts-ignore
      message: error.data.message,
      top: false,
      success: false,
    });
    router.push("/challenges/my-challenge");
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
    <Frame canGoBack hasTabBar autoHeight>
      <div className="flex flex-col divide-y-2">
        <div className="flex flex-col px-6">
          <Menu currentPage="챌린지 메인" challengeId={id} />
          <ChallengeTitle
            title={title}
            startDate={startDate}
            isBeforeStartDate={isBeforeStartDate}
            remainingDays={differenceInDays(new Date(endDate), Date.now()) + 1}
            participants={numberOfParticipants}
            profileImages={enrolledMembersProfileImageList}
          />

          <div className="flex flex-col mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between h-8">
              <div>챌린지 설명</div>
              <div className="flex space-x-2">
                {isHost && (
                  <Link
                    href={`/challenges/${id}/edit`}
                    className="flex items-center space-x-1 bg-[#FFF9C4] pl-2 pr-3 py-1 rounded-2xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span>챌린지 정보 수정</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setChallengeDetail(!challengeDetail);
                  }}
                >
                  {challengeDetail ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
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
                  <div className="px-4 py-2 mt-2 text-sm text-red-500 font-light rounded-2xl bg-white">
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
                          <PostItem {...announcement} key={announcement.id} />
                        ))}
                    </div>
                  ) : null}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
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
              <Link
                href={`/challenges/${id}/fee_table`}
                className="px-3 py-2 text-white rounded-xl font-extralight bg-habit-green"
              >
                벌금 현황 보기
              </Link>
            </div>
            <IsCompleteToday
              isParticipatedToday={challengeDetails.isParticipatedToday}
              isTodayParticipatingDay={challengeDetails.isTodayParticipatingDay}
            />
          </div>
        </div>
        <div className="flex flex-col px-6 pt-4">
          <div className="flex flex-col items-center space-y-3">
            {isBeforeStartDate ? (
              <Enrollment
                id={id as string}
                isMemberEnrolledInChallenge={isMemberEnrolledInChallenge}
              />
            ) : (
              <>
                <PostsFeed id={id} />
                <FloatingButton href={`${getParentPath(pathname)}/post`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </FloatingButton>
              </>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default Page;
