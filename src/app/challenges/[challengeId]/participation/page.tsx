"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Calendar from "react-calendar";
import { useSetRecoilState } from "recoil";
import { format, isBefore } from "date-fns";

import FloatingButton from "@/app/components/floatingButton";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import {
  ChallengeContentResponseDTO,
  ChallengeParticipationDto,
  ChallengeParticipationRecords,
  IChallengeDetailsDto,
} from "@/types/challenge";
import { toastPopupAtom } from "@/hooks/atoms";
import Frame from "@/app/components/frame";
import apiManager from "@/api/apiManager";
import { getParentPath } from "@/libs/utils";
import "@/styles/CustomCalendar.css";
import { getId } from "@/libs/jwt";
import Menu from "../components/menu";
import ChallengeTitle from "../components/challengeTitle";
import Loading from "../main/loading";
import ChallengeParticipationStatus from "../components/ChallengeParticipationStatus";
import PencilIcon from "@/app/components/icons/pencilIcon";

const Page = ({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) => {
  const [myId, setMyId] = useState<string | null | undefined>();
  const [participationRecords, setParticipationRecords] =
    useState<ChallengeParticipationRecords>({
      failureDaysSet: new Set(),
      successDaysSet: new Set(),
      upcomingDaysSet: new Set(),
    });
  const pathname = usePathname();
  const currentPath = usePathname().split("/");
  const { challengeDetails, isLoading, error } =
    useChallengeDetails(challengeId);
  const router = useRouter();
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  useEffect(() => {
    setMyId(getId());
    const getMyPosts = async () => {
      try {
        const res = await apiManager.get(`/challenges/${challengeId}/posts/me`);
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
        const res = await apiManager.get(`/challenges/${challengeId}/records`);
        const data: ChallengeParticipationDto = res.data?.data;
        setParticipationRecords({
          successDaysSet: new Set(data.successDayList),
          failureDaysSet: new Set(data.failureDayList),
          upcomingDaysSet: new Set(data.upcomingDayList),
        });
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
  }, [challengeId, setToastPopup]);
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
    startDate,
    endDate,
    numberOfParticipants,
    enrolledMembersProfileImageList,
  }: IChallengeDetailsDto = challengeDetails;

  const isBeforeStartDate = isBefore(new Date(), new Date(startDate));

  return (
    <Frame hasTabBar canGoBack>
      <div className="flex flex-col divide-y-2">
        <div className="flex flex-col px-6 pb-5">
          <Menu
            currentPage="참여 기록"
            challengeId={currentPath[2]}
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
          {new Date() < new Date(endDate) && (
            <ChallengeParticipationStatus
              isParticipatedToday={challengeDetails.isParticipatedToday}
              isTodayParticipatingDay={challengeDetails.isTodayParticipatingDay}
            />
          )}
        </div>
        <div className="flex flex-col px-6 py-6 ">
          <Calendar
            className="px-8 py-6 mx-auto space-y-4 bg-white shadow-lg"
            formatDay={(locale, date) => date.getDate().toString()}
            tileContent={({ date }) => {
              const day = format(date, "yyyy-MM-dd");
              return (
                <div className="relative flex items-center justify-center">
                  {participationRecords.successDaysSet.has(day) && (
                    <div className="dot-success"></div>
                  )}
                  {participationRecords.failureDaysSet.has(day) && (
                    <div className="dot-failure"></div>
                  )}
                  {participationRecords.upcomingDaysSet.has(day) && (
                    <div className="dot-yet"></div>
                  )}

                  <div className="dot-none"></div>
                </div>
              );
            }}
          />
          <div className="mt-4 space-y-4">
            <span className="px-4 text-sm">참여 기록</span>
            {participationRecords.successDaysSet
              ? Array.from(participationRecords.successDaysSet).map(
                  (item, index) => (
                    <div
                      key={index}
                      className="px-5 py-3 text-sm bg-white rounded-xl"
                    >
                      <div className="space-x-2">✅{` ${item}`}</div>
                    </div>
                  )
                )
              : null}
            {participationRecords.failureDaysSet
              ? Array.from(participationRecords.failureDaysSet).map(
                  (item, index) => (
                    <div
                      key={index}
                      className="px-5 py-3 text-sm bg-white rounded-xl"
                    >
                      <div className="space-x-2">❌{` ${item}`}</div>
                    </div>
                  )
                )
              : null}
          </div>
        </div>
      </div>
      <FloatingButton href={`${getParentPath(pathname)}/post`}>
        <PencilIcon className="size-7" />
      </FloatingButton>
    </Frame>
  );
};

export default Page;
