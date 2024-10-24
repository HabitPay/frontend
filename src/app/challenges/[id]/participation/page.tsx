"use client";

import Menu from "../components/menu";
import { usePathname, useRouter } from "next/navigation";
import ChallengeTitle from "../components/challengeTitle";
import Calendar from "react-calendar";
import FloatingButton from "@/app/components/floatingButton";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import {
  ChallengeContentResponseDTO,
  ChallengeParticipation,
  ContentDTO,
  IChallengeDetailsDto,
} from "@/types/challenge";
import { useSetRecoilState } from "recoil";
import { toastPopupAtom } from "@/hooks/atoms";
import Loading from "../main/loading";
import { differenceInDays, isBefore, isSameDay } from "date-fns";
import Frame from "@/app/components/frame";
import { useEffect, useState } from "react";
import apiManager from "@/api/apiManager";
import { getParentPath } from "@/libs/utils";

import "@/styles/CustomCalendar.css";
import ChallengeParticipationStatus from "../components/ChallengeParticipationStatus";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [participationRecords, setParticipationRecords] =
    useState<ChallengeParticipation>({
      failureDayList: [],
      successDayList: [],
      upcomingDayList: [],
    });
  const days = [
    new Date(2024, 9, 14), // 성공 (예: 2024-10-14, 월요일)
    new Date(2024, 9, 16), // 성공 (예: 2024-10-16, 수요일)
  ];

  const failedDays = [
    new Date(2024, 9, 18), // 실패 (예: 2024-10-18, 금요일)
  ];

  const pathname = usePathname();
  const currentPath = usePathname().split("/");
  const { challengeDetails, isLoading, error } = useChallengeDetails(id);
  const router = useRouter();
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const res = await apiManager.get(`/challenges/${id}/posts/me`);
        const data: ChallengeContentResponseDTO = res.data?.data;
        console.log(data);
      } catch (error) {
        setToastPopup({
          // @ts-ignore
          message: error.data.message,
          top: false,
          success: false,
        });
      }
    };
    const getParticipationRecords = async () => {
      try {
        const res = await apiManager.get(`/challenges/${id}/records`);
        const data: ChallengeParticipation = res.data?.data;
        setParticipationRecords(data);
      } catch (error) {
        setToastPopup({
          // @ts-ignore
          message: error.data.message,
          top: false,
          success: false,
        });
      }
    };
    getParticipationRecords();
    getMyPosts();
    document.title = "My Participation | HabitPay";
  }, [id, setToastPopup]);
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
    <Frame hasTabBar canGoBack>
      <div className="flex flex-col divide-y-2">
        <div className="flex flex-col px-6 pb-5">
          <Menu currentPage="참여 기록" challengeId={currentPath[2]} />
          <ChallengeTitle
            title={title}
            startDate={startDate}
            isBeforeStartDate={isBeforeStartDate}
            remainingDays={differenceInDays(new Date(endDate), Date.now()) + 1}
            participants={numberOfParticipants}
            profileImages={enrolledMembersProfileImageList}
          />
          <ChallengeParticipationStatus
            isParticipatedToday={challengeDetails.isParticipatedToday}
            isTodayParticipatingDay={challengeDetails.isTodayParticipatingDay}
          />
        </div>
        <div className="flex flex-col px-6 py-6 ">
          <Calendar
            className="px-8 py-6 space-y-4 bg-white shadow-lg mx-auto"
            formatDay={(locale, date) => date.getDate().toString()}
            tileContent={({ date }) => {
              return (
                <div className="flex justify-center items-center relative">
                  {participationRecords.successDayList.some((day) =>
                    isSameDay(new Date(day), date)
                  ) && <div className="dot-success"></div>}
                  {participationRecords.failureDayList.some((day) =>
                    isSameDay(new Date(day), date)
                  ) && <div className="dot-failure"></div>}
                  {participationRecords.upcomingDayList.some((day) =>
                    isSameDay(new Date(day), date)
                  ) && <div className="dot-yet"></div>}

                  <div className="dot-none"></div>
                </div>
              );
            }}
          />
          <div className="mt-4 space-y-4">
            <span className="px-4 text-sm">참여 기록</span>
            {participationRecords.successDayList
              ? participationRecords.successDayList.map((item, index) => (
                  <div
                    key={index}
                    className="px-5 py-3 text-sm bg-white rounded-xl"
                  >
                    <div className="space-x-2">✅{` ${item}`}</div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
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
    </Frame>
  );
};

export default Page;
