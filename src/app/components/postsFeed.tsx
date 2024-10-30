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

  const { data, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<ChallengeContentResponseDTO, AxiosError>(
      ["feedPosts", id],
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
            <PostItem {...post} key={post.id} />
          ))}
        </>
      )}
      <div className="mb-2 text-slate-500 font-medium">일반 게시물</div>
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
