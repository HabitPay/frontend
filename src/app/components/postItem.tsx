import Image from "next/image";
import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { formatToTimeAgo } from "@/libs/utils";
import { ContentDTO } from "@/types/challenge";
import defaultProfileImage from "@/public/default-profile.jpg";

const PostItem = ({
  writer,
  profileUrl,
  createdAt,
  isAnnouncement,
  photoViewList,
  content,
}: ContentDTO) => {
  const slickSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };
  return (
    <div className="flex flex-col px-5 py-5 bg-white rounded-2xl">
      <div className="flex items-center gap-2 pb-4 border-b-2">
        <Image
          src={profileUrl || defaultProfileImage}
          className="z-30 rounded-full size-12"
          alt="profileImage of writer"
          width={12}
          height={12}
        />

        <div className="flex flex-col justify-center gap-1">
          <span className="text-sm font-semibold">{writer}</span>
          <span className="text-sm text-habit-gray">
            {formatToTimeAgo(createdAt.toString())}
          </span>
        </div>
        {/* {isAnnouncement ? (
          <div className="px-2 py-1 ml-auto text-sm font-light text-white bg-red-600 rounded-2xl">
            공지
          </div>
        ) : null} */}
      </div>
      <div className="flex flex-col gap-5 pt-4">
        <Slider {...slickSettings}>
          {photoViewList.map((item, index) => (
            <div key={index} className="relative flex items-center h-80">
              <Image
                src={item.imageUrl}
                className="object-contain"
                layout="fill"
                alt={`image ${index}`}
              />
            </div>
          ))}
        </Slider>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default PostItem;
