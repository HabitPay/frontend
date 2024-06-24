import Layout from "@app/components/layout";
import Image from "next/image";
import PostItem, { IPostDto } from "./postItem";

export const PostsFeedExample: IPostDto[] = [
  {
    profilePic: "/profilePic.jpeg",
    nickname: "hogkim",
    createdAt: new Date(),
    isNotification: true,
    imageList: [
      "/default-profile.jpeg",
      "/profilePic.jpeg",
      "/chungking_express__movie_poster__by_seblakes31_dep34tb-fullview.jpg",
      "/manaca.JPG",
    ],
    contents:
      "test contents test contents test contents test contents test contents test contents test contents test contents test contents",
  },
  {
    profilePic: "/default-profile.jpeg",
    nickname: "jkwak",
    createdAt: new Date(),
    isNotification: false,
    imageList: ["/profilePic.jpeg", "/default-profile.jpeg"],
    contents:
      "example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents example contents ",
  },
];

interface IWebFeedDto {
  feeds: IPostDto[];
}

const PostsFeed = ({ feeds }: IWebFeedDto) => {
  return (
    <div className="flex flex-col w-full gap-4">
      {feeds.map((item, index) => (
        <PostItem {...item} key={index} />
      ))}
    </div>
  );
};

export default PostsFeed;
