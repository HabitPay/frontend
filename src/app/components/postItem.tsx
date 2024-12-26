"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { formatToTimeAgo } from "@/libs/utils";
import { ContentDTO } from "@/types/challenge";
import defaultProfileImage from "@/public/default-profile.jpg";
import Link from "next/link";
import ConfirmModal from "./confirmModal";
import apiManager from "@/api/apiManager";
import { HttpStatusCode } from "axios";
import { useSetRecoilState } from "recoil";
import { toastPopupAtom } from "@/hooks/atoms";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownRenderer from "./markdwonRenderer";

interface PostsFeedProps {
  challengeId: string;
  contentDTO: ContentDTO;
}

const PostItem = ({ challengeId, contentDTO }: PostsFeedProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostAuthor, setIsPostAuthor] = useState(false);
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const router = useRouter();

  useEffect(() => {
    const getPostInfo = async () => {
      const res = await apiManager.get(`/posts/${contentDTO.id}`);
      const data: ContentDTO = res.data.data;
      console.log(data);
      setIsPostAuthor(data.isPostAuthor);
    };
    getPostInfo();
  }, [contentDTO]);

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
            className="z-30 rounded-full size-12 object-cover shadow-md shadow-slate-400 bg-habit-gray"
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
        <div className="flex ml-auto gap-4">
          {isPostAuthor && (
            <Link
              href={`/challenges/${challengeId}/posts/${contentDTO.id}/edit`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
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
        <div className=" overflow-auto">
          <MarkdownRenderer content={contentDTO.content} />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
