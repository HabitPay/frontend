import PostItem, { IPostDto } from "./postItem";
import { useEffect, useRef, useState } from "react";

//examples
export const PostsFeedExample: IPostDto[] = [
  {
    defaultProfileImage: "/defaultProfileImage.jpeg",
    nickname: "hogkim",
    createdAt: new Date(),
    isNotification: true,
    imageList: [
      "/default-profile.jpg",
      "/defaultProfileImage.jpeg",
      "/chungking_express__movie_poster__by_seblakes31_dep34tb-fullview.jpg",
      "/manaca.JPG",
    ],
    contents:
      "test contents test contents test contents test contents test contents test contents test contents test contents test contents",
  },
  {
    defaultProfileImage: "/default-profile.jpg",
    nickname: "jkwak",
    createdAt: new Date(),
    isNotification: false,
    imageList: ["/defaultProfileImage.jpeg", "/default-profile.jpg"],
    contents:
      "example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents ",
  },
];
const getMoreFeed = (page: number): IPostDto[] => {
  const feed = [
    {
      defaultProfileImage: "/default-profile.jpg",
      nickname: "jkwak",
      createdAt: new Date(),
      isNotification: false,
      imageList: ["/defaultProfileImage.jpeg", "/default-profile.jpg"],
      contents:
        "example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents ",
    },
  ];
  return feed;
};

interface PostsFeedProps {
  initialFeed: IPostDto[];
}

export default function PostsFeed({ initialFeed }: PostsFeedProps) {
  const [feed, setFeed] = useState(initialFeed);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      // getMoreFeed함수를 api요청으로 바꿔서 받아올 것이기 때문에
      // async함수로 바껴야함. 또한 getMoreFeed도 await로
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newFeed = getMoreFeed(page + 1);
          if (newFeed.length !== 0) {
            setPage((prev) => prev + 1);
            setFeed((prev) => [...prev, ...newFeed]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1.0 }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="flex flex-col w-full gap-4 pb-4">
      {feed.map((item, index) => (
        <PostItem {...item} key={index} />
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          style={{ marginTop: `${(page + 1) * 100}vh` }}
          className="px-3 py-2 mx-auto text-sm font-semibold rounded-md bg-habit-green mb-96 disabled:bg-slate-500 w-fit hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </div>
  );
}
