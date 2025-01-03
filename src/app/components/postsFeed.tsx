import { ChallengeContentResponseDTO } from "@/types/challenge";
import { useEffect, useRef, useState } from "react";
import apiManager from "@/api/apiManager";
import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";
import PostItem from "./postItem";
import { OnIntersect, useObserver } from "@/hooks/useObserver";

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

  const { data, error, fetchNextPage, isFetchingNextPage, status } =
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
          <div className="mb-2 text-slate-500 font-medium">공지사항</div>
          {announcements.content.map((post) => (
            <PostItem contentDTO={post} challengeId={id} key={post.id} />
          ))}
        </>
      )}
      <div className="mb-2 text-slate-500 font-medium">일반 게시물</div>
      {status === "loading" && (
        <div className="flex flex-col px-6 divide-y-2 animate-pulse bg-white p-4 rounded-xl">
          <div className="flex gap-4 pb-3">
            <div className="size-14 bg-gray-400 rounded-xl" />
            <div className="w-28 bg-gray-400 h-5 rounded-xl" />
          </div>
          <div className="flex items-center justify-center py-4">
            <div className=" size-60 bg-gray-400 rounded-xl" />
          </div>
        </div>
      )}
      {status === "error" && <p>{error?.message}</p>}
      {status === "success" &&
        data?.pages.map((posts, index) => (
          <div key={index} className="flex flex-col gap-3 pb-3">
            {posts?.content?.length > 0 &&
              posts.content.map((post) => (
                <PostItem contentDTO={post} challengeId={id} key={post.id} />
              ))}
          </div>
        ))}

      <div ref={bottom} />
      {isFetchingNextPage && (
        <div className="flex flex-col px-6 divide-y-2 animate-pulse bg-white p-4 rounded-xl">
          <div className="flex gap-4 pb-3">
            <div className="size-14 bg-gray-400 rounded-xl" />
            <div className="w-28 bg-gray-400 h-5 rounded-xl" />
          </div>
          <div className="flex items-center justify-center py-4">
            <div className=" size-60 bg-gray-400 rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
