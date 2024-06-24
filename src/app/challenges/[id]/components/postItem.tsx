import { formatToTimeAgo } from "@libs/utils";
import Image from "next/image";

export interface IPostDto {
  profilePic: string;
  nickname: string;
  createdAt: Date;
  isNotification: boolean;
  imageList: string[];
  contents: string;
}

const PostItem = ({
  profilePic,
  nickname,
  createdAt,
  isNotification,
  imageList,
  contents,
}: IPostDto) => {
  return (
    <div className="flex flex-col w-full px-5 py-5 bg-white rounded-2xl">
      <div className="flex items-center w-full gap-2 pb-4 border-b-2">
        <Image
          src={profilePic}
          className="z-30 rounded-full size-12"
          alt="profilePicture of writer"
          width={12}
          height={12}
        />
        <div className="flex flex-col justify-center gap-1">
          <span className="text-sm font-semibold">{nickname}</span>
          <span className="text-sm text-habit-gray">
            {formatToTimeAgo(createdAt.toString())}
          </span>
        </div>
        {isNotification ? (
          <div className="px-2 py-1 ml-auto text-sm font-light text-white bg-red-600 rounded-2xl">
            공지
          </div>
        ) : null}
      </div>
      <div className="flex flex-col pt-4">
        <div>{/* imageList */}</div>
        <div>{contents}</div>
      </div>
    </div>
  );
};

export default PostItem;
