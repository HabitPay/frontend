import { ChallengeListResponseDTO } from "@/types/challenge";
import { useEffect, useRef, useState } from "react";
import apiManager from "@/api/apiManager";
import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";
import PostItem from "./postItem";
import { OnIntersect, useObserver } from "@/hooks/useObserver";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

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

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ChallengeListResponseDTO, AxiosError>(
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
      {status === "loading" && <p>불러오는 중</p>}
      {status === "error" && <p>{error?.message}</p>}
      {status === "success" &&
        data?.pages.map((challenges, index) => (
          <div key={index} className="flex flex-col gap-3">
            {challenges.size > 0 &&
              challenges.content.map((challenge, index) => (
                <Link
                  href={`/challenges/${challenge.id}/main`}
                  key={index}
                  className="flex flex-col bg-white rounded-xl py-3 px-3"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className=" text-xl font-semibold">
                      {challenge.title}
                    </div>
                    <div className="flex items-center gap-1 font-light text-sm">
                      <div>{challenge.hostNickname}</div>
                      <Image
                        src={challenge.hostProfileImage}
                        alt="ProfileImage of host"
                        className="rounded-full size-7"
                        width={7}
                        height={7}
                      />
                    </div>
                  </div>
                  <div className="text-sm">
                    {`챌린지 기간:${format(
                      new Date(challenge.startDate),
                      "yy.MM.dd"
                    )} ~ ${format(new Date(challenge.endDate), "yy.MM.dd")}`}
                  </div>

                  <div className="text-sm">{`현재 참여인원: ${challenge.numberOfParticipants}`}</div>
                  <div className="text-sm">{`총 기간(일): ${challenge.participatingDays}`}</div>
                </Link>
              ))}
          </div>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
}
