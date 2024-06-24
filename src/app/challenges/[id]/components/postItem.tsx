import { formatToTimeAgo } from "@libs/utils";
import Image from "next/image";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const slickSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex flex-col px-5 py-5 bg-white rounded-2xl">
      <div className="flex items-center gap-2 pb-4 border-b-2">
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
      <div className="flex flex-col gap-5 pt-4">
        <Slider {...slickSettings}>
          {imageList.map((item, index) => (
            <div key={index} className="relative flex items-center h-80">
              <Image
                src={item}
                className="object-contain"
                fill
                alt={`image ${index}`}
              />
            </div>
          ))}
        </Slider>
        <div>{contents}</div>
      </div>
    </div>
  );
};

export default PostItem;
