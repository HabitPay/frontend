import { useEffect, useRef, useState } from "react";

import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";

import { ChallengeContentResponseDTO } from "@/types/challenge";
import apiManager from "@/api/apiManager";
import { OnIntersect, useObserver } from "@/hooks/useObserver";
import PostItem from "./postItem";

interface PostsFeedProps {
  id: string;
  isAnnouncements?: boolean;
}

export default function PostsFeed({ id, isAnnouncements }: PostsFeedProps) {
  const [announcements, setAnnouncements] =
    useState<ChallengeContentResponseDTO>();
  const bottom = useRef<HTMLDivElement | null>(null);
  const OFFSET = 10;

  const getPosts = async ({
    pageParam = 1,
  } = {}): Promise<ChallengeContentResponseDTO> => {
    const res = await apiManager.get(`/challenges/${id}/posts`, {
      params: {
        size: OFFSET,
        page: pageParam,
      },
    });
    return res.data.data;
  };
  getPosts();

  const { data, error, isLoading, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<ChallengeContentResponseDTO, AxiosError>(
      ["feedPosts", id],
      getPosts,
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.isLast === false) {
            return lastPage.pageNumber + 1;
          }
          return undefined;
        },
      }
    );

  const onIntersect: OnIntersect = ([entry]) =>
    entry.isIntersecting && fetchNextPage();

  useObserver({ target: bottom, onIntersect });

  useEffect(() => {
    const getAnnouncementsPosts =
      async (): Promise<ChallengeContentResponseDTO> => {
        const res = await apiManager.get(
          `/challenges/${id}/posts/announcements`
        );
        return res.data.data;
      };
    getAnnouncementsPosts();
  }, [id]);

  return (
    <div className="flex flex-col w-full pb-4">
      {announcements && (
        <>
          <div className="mb-2 font-medium text-slate-500">공지사항</div>
          {announcements.content.map((post) => (
            <PostItem
              contentDTO={post}
              challengeId={id}
              key={post.id}
              isLoading={isLoading}
            />
          ))}
        </>
      )}
      <div className="mb-2 font-medium text-slate-500">일반 게시물</div>
      {status === "loading" && (
        <div className="flex flex-col p-4 px-6 bg-white divide-y-2 animate-pulse rounded-xl">
          <div className="flex gap-4 pb-3">
            <div className="bg-gray-400 size-14 rounded-xl" />
            <div className="h-5 bg-gray-400 w-28 rounded-xl" />
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="bg-gray-400  size-60 rounded-xl" />
          </div>
        </div>
      )}
      {status === "error" && <p>{error?.message}</p>}
      {status === "success" &&
        data?.pages.map((posts, index) => (
          <div key={index} className="flex flex-col gap-3 pb-3">
            {posts?.content?.length > 0 &&
              posts.content.map((post) => (
                <PostItem
                  contentDTO={post}
                  challengeId={id}
                  key={post.id}
                  isLoading={isLoading}
                />
              ))}
          </div>
        ))}

      <div ref={bottom} />
      {isFetchingNextPage && (
        <div className="flex flex-col p-4 px-6 bg-white divide-y-2 animate-pulse rounded-xl">
          <div className="flex gap-4 pb-3">
            <div className="bg-gray-400 size-14 rounded-xl" />
            <div className="h-5 bg-gray-400 w-28 rounded-xl" />
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="bg-gray-400  size-60 rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
