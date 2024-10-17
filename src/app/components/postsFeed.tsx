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
  const bottom = useRef<HTMLDivElement | null>(null);
  const OFFSET = 10;
  const getAnnouncementsPosts = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }): Promise<ChallengeContentResponseDTO> => {
    const res = await apiManager.get(`/challenges/${id}/posts/announcements`, {
      params: {
        limit: OFFSET,
        offset: pageParam,
      },
    });
    return res.data;
  };
  const getPosts = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }): Promise<ChallengeContentResponseDTO> => {
    const res = await apiManager.get(`/challenges/${id}/posts`, {
      params: {
        size: OFFSET,
        page: pageParam,
      },
    });
    return res.data.data;
  };
  getPosts({ pageParam: 0 });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ChallengeContentResponseDTO, AxiosError>(
    "feedPosts",
    getPosts,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last === false) {
          return lastPage.pageable.pageNumber + 1;
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
        data?.pages.map((posts, index) => (
          <div key={index} className="flex flex-col gap-3">
            {posts?.content?.length > 0 &&
              posts.content.map((post) => <PostItem {...post} key={post.id} />)}
          </div>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
}
