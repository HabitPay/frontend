import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { format } from "date-fns";
import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";

import apiManager from "@/api/apiManager";
import { OnIntersect, useObserver } from "@/hooks/useObserver";
import { ChallengeListResponseDTO } from "@/types/challenge";
import defaultProfileImage from "@/public/default-profile.jpg";

export default function ChallengeList() {
  const bottom = useRef<HTMLDivElement | null>(null);
  const getChallengeList = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }): Promise<ChallengeListResponseDTO> => {
    const res = await apiManager.get(`/challenges`, {
      params: {
        page: pageParam,
      },
    });
    console.log("res:", res.data.data);
    return res.data.data;
  };
  getChallengeList({ pageParam: 0 });

  const { data, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<ChallengeListResponseDTO, AxiosError>(
      "challengeList",
      getChallengeList,
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.hasNextPage === true) {
            console.log("it is not last page");
            return lastPage.page + 1;
          }
          return undefined;
        },
      }
    );

  const onIntersect: OnIntersect = ([entry]) =>
    entry.isIntersecting && fetchNextPage();

  useObserver({ target: bottom, onIntersect });

  return (
    <div className="flex flex-col w-full pb-4">
      {status === "loading" && (
        <div className="flex flex-col px-6 animate-pulse bg-white p-3 rounded-xl">
          <div className="flex gap-4 justify-between pb-4">
            <div className="w-32 h-8 bg-gray-400 rounded-xl" />
            <div className="w-28 bg-gray-400 h-5 rounded-xl" />
          </div>
          <div className="flex items-center">
            <div className="w-56 h-16 bg-gray-400 rounded-xl" />
          </div>
        </div>
      )}
      {status === "error" && <p>{error?.message}</p>}
      {status === "success" &&
        data?.pages.map((challenges, index) => (
          <div key={index} className="flex flex-col gap-3">
            {challenges.size > 0 &&
              challenges.content.map((challenge, index) => (
                <Link
                  href={`/challenges/${challenge.id}/main`}
                  key={index}
                  className="flex flex-col px-3 py-3 bg-white rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xl font-semibold ">
                      {challenge.title}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-light">
                      <div>{challenge.hostNickname}</div>
                      <Image
                        src={challenge.hostProfileImage || defaultProfileImage}
                        alt="ProfileImage of host"
                        className="rounded-full size-7 object-contain  bg-habit-gray"
                        width={7}
                        height={7}
                      />
                    </div>
                  </div>
                  <div className="flex *:text-sm">
                    <span className="font-bold">챌린지 기간: </span>
                    <span>{`${format(
                      new Date(challenge.startDate),
                      "yy.MM.dd"
                    )} - ${format(
                      new Date(challenge.endDate),
                      "yy.MM.dd"
                    )}`}</span>
                  </div>
                  <div className="flex  *:text-sm">
                    <span className="font-bold">현재 참여인원: </span>
                    <span>{challenge.numberOfParticipants}</span>
                  </div>
                  <div className="flex  *:text-sm">
                    <span className="font-bold">총 기간(일): </span>
                    <span>{challenge.participatingDays}</span>
                  </div>
                </Link>
              ))}
          </div>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <div className="flex flex-col px-6 animate-pulse bg-white p-3 rounded-xl">
          <div className="flex gap-4 justify-between pb-4">
            <div className="w-32 h-8 bg-gray-400 rounded-xl" />
            <div className="w-28 bg-gray-400 h-5 rounded-xl" />
          </div>
          <div className="flex items-center">
            <div className="w-56 h-16 bg-gray-400 rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
