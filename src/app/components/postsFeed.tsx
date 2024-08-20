import { ChallengeContentResponseDTO } from "@/types/challenge";
import { useEffect, useRef, useState } from "react";
import apiManager from "@/api/apiManager";
import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";
import PostItem from "./postItem";

interface PostsFeedProps {
  id: string;
}

export default function PostsFeed({ id }: PostsFeedProps) {
  const bottom = useRef<HTMLDivElement | null>(null);
  const OFFSET = 5;
  const getAnnouncementsPosts = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }): Promise<ChallengeContentResponseDTO> => {
    const res = await apiManager.get(`/challenges/${id}/announcements`, {
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
        limit: OFFSET,
        offset: pageParam,
      },
    });
    console.log(res);
    return res.data;
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
        if (!lastPage.last) {
          console.log(lastPage);
          return lastPage.pageable.pageNumber + 1;
        }
        return undefined;
      },
    }
  );

  return (
    <div className="flex flex-col w-full pb-4">
      {status === "loading" && <p>불러오는 중</p>}
      {status === "error" && <p>{error?.message}</p>}
      {status === "success" &&
        data?.pages.map((posts, index) => (
          <div key={index}>
            {posts.content.map((post) => (
              <PostItem {...post} key={post.id} />
            ))}
          </div>
        ))}
      <div ref={bottom} />
    </div>
  );
}
