"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { HttpStatusCode } from "axios";
import { useSetRecoilState } from "recoil";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { formatToTimeAgo } from "@/libs/utils";
import { ContentDTO } from "@/types/challenge";
import defaultProfileImage from "@/public/default-profile.jpg";
import apiManager from "@/api/apiManager";
import { toastPopupAtom } from "@/hooks/atoms";
import ConfirmModal from "./confirmModal";
import MarkdownRenderer from "./markdwonRenderer";
import TrashIcon from "./icons/trashIcon";
import PencilSquareIcon from "./icons/pencilSquareIcon";

interface PostsFeedProps {
  challengeId: string;
  contentDTO: ContentDTO;
}

const PostItem = ({ challengeId, contentDTO }: PostsFeedProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostAuthor, setIsPostAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const router = useRouter();

  useEffect(() => {
    const getPostInfo = async () => {
      try {
        const res = await apiManager.get(`/posts/${contentDTO.id}`);
        const data: ContentDTO = res.data.data;
        setIsPostAuthor(data.isPostAuthor);
      } catch (error) {
        console.error("Failed to fetch post info:", error);
        setToastPopup((prev) => ({
          // @ts-ignore
          message: error.data.message,
          top: false,
          success: true,
        }));
      } finally {
        setIsLoading(false);
      }
    };
    getPostInfo();
  }, [contentDTO.id, setToastPopup]);

  const handleDeletePost = async () => {
    try {
      const res = await apiManager.delete(
        `/challenges/${challengeId}/posts/${contentDTO.id}`
      );
      if (res.status === HttpStatusCode.Ok) {
        console.log("delete success");
        setToastPopup((prev) => ({
          message: res.data.message,
          top: false,
          success: true,
        }));
        router.push("/");
      }
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

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
        <Link href={`${contentDTO.profileUrl}`}>
          <Image
            src={contentDTO.profileUrl || defaultProfileImage}
            className="z-30 object-cover rounded-full shadow-md size-12 shadow-slate-400 bg-habit-gray"
            alt="profileImage of writer"
            width={12}
            height={12}
          />
        </Link>

        <div className="flex flex-col justify-center gap-1">
          <span className="text-sm font-semibold">{contentDTO.writer}</span>
          <span className="text-sm text-habit-gray">
            {formatToTimeAgo(contentDTO.createdAt.toString())}
          </span>
        </div>
        <div className="flex gap-4 ml-auto">
          {isLoading ? (
            <div className="bg-gray-400 rounded-lg size-6 animate-pulse" />
          ) : (
            isPostAuthor && (
              <Link
                href={`/challenges/${challengeId}/posts/${contentDTO.id}/edit`}
              >
                <PencilSquareIcon className="size-6" />
              </Link>
            )
          )}
          {contentDTO.isAnnouncement === true && (
            <>
              <ConfirmModal
                onClick={handleDeletePost}
                onClose={() => setIsModalOpen(false)}
                open={isModalOpen}
              >
                포스트 삭제
              </ConfirmModal>
              <button onClick={() => setIsModalOpen(true)}>
                <TrashIcon className="size-6" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-4">
        <Slider {...slickSettings}>
          {contentDTO.photoViewList.map((item, index) => (
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
        <div className="overflow-auto ">
          <MarkdownRenderer content={contentDTO.content} />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
