import { formatToTimeAgo } from "@libs/utils";
import Image from "next/image";

interface IPostDto {
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
    <div>
      <div className="w-full h-64 px-5 py-6 bg-white rounded-2xl">
        <div className="flex items-center pb-4 space-x-3 border-b-2">
          <Image
            src={profilePic}
            className="z-30 rounded-full size-12 "
            alt="profilePicture of writer"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{nickname}</span>
            <span className="text-sm text-habit-gray">
              {formatToTimeAgo(createdAt.toString())}
            </span>
          </div>
          {isNotification ? (
            <div className="ml-auto text-white rounded-lg ">공지</div>
          ) : null}
        </div>
        <div>
          <div>{/* imageList */}</div>
          <div>{contents}</div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
