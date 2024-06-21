import Image from "next/image";

interface IFeedDto {
  profilePic: string;
  nickname: string;
  createdAt: string;
  isNotification: boolean;
  imageList: string[];
  contents: string;
}

interface IWebFeedDto {
  feeds: IFeedDto[];
}

const PostsFeed = ({ feeds }: IWebFeedDto) => {
  return (
    <div>
      <span className="px-5 py-3 text-sm font-light bg-white rounded-xl">
        어제
      </span>
      <div className="w-full h-64 px-5 py-6 bg-white rounded-2xl">
        <div className="flex items-center pb-4 space-x-3 border-b-2">
          <Image
            src={""}
            className="z-30 rounded-full size-12 "
            alt="profilePicture of writer"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">hokgim</span>
            <span className="text-sm text-habit-gray">6시간 전</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsFeed;
