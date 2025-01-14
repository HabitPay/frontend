"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import apiManager from "@/api/apiManager";
import Frame from "@/app/components/frame";
import { SUPPORTED_IMAGE_EXTENSIONS } from "@/libs/constants";
import PreviewList from "./components/previewList";
import { toastPopupAtom } from "@/hooks/atoms";
import { ICreatePostDTO } from "@/types/post";
import { IChallengeDetailsDto } from "@/types/challenge";
import { addClassNames } from "@/libs/utils";
import {
  convertToPhotoDTO,
  uploadImagesToS3,
  isValidImageSize,
  isValidImageExtension,
} from "@/libs/imageUploadUtils";
import { PopupErrorMessage } from "@/types/enums";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@/styles/CustomMdEditor.css";
import { getId } from "@/libs/jwt";

export interface imageInfo {
  file?: File;
  postPhotoId?: number;
  preview: string;
}

interface IForm {
  content: string;
  photos?: FileList;
}

const Page = ({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) => {
  const [myId, setMyId] = useState<string | null | undefined>();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting },
  } = useForm<IForm>();
  const [imageList, setImageList] = useState<imageInfo[]>([]);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const router = useRouter();
  const currentPath = usePathname();
  const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );
  useEffect(() => {
    document.title = "Challenge Post | HabitPay";
    setMyId(getId());
    const getChallengeInfo = async () => {
      const res = await apiManager.get(`/challenges/${challengeId}`);
      const data: IChallengeDetailsDto = res.data.data;
      setIsManager(data.isHost);
    };

    getChallengeInfo();
  }, [challengeId]);

  const onSubmitWithValidation = async (form: IForm) => {
    console.log("onSubmit", form.photos);
    try {
      const data: ICreatePostDTO = {
        content: form.content,
        isAnnouncement: isAnnouncement,
        photos: convertToPhotoDTO(imageList),
      };
      const res = await apiManager.post(
        `/challenges/${challengeId}/posts`,
        data
      );
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
      const preSignedUrls: string[] = res.data?.data;
      uploadImagesToS3(preSignedUrls, imageList);
      router.push(`/challenges/${challengeId}/main`);
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

  const onImageFilesChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length <= 0) return;

    const fileList: File[] = Array.from(files);
    if (imageList.length + fileList.length > 5) {
      setToastPopup({
        message: "사진은 최대 5장까지 업로드 가능합니다.",
        top: false,
        success: false,
      });
      setError("photos", {
        message: "사진은 최대 5장까지 업로드 가능합니다.",
      });
      return;
    }

    if (!fileList.every(isValidImageExtension)) {
      setToastPopup({
        message: PopupErrorMessage.UnsupportedFileType,
        top: false,
        success: false,
      });
      setError("photos", {
        message: PopupErrorMessage.UnsupportedFileType,
      });
      return;
    }

    if (!fileList.every(isValidImageSize)) {
      setToastPopup({
        message: PopupErrorMessage.FileSizeExceeded,
        top: false,
        success: false,
      });
      setError("photos", {
        message: PopupErrorMessage.FileSizeExceeded,
      });
      return;
    }

    const readFilePromises = fileList.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target!.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    const results = await Promise.all(readFilePromises);
    const newImageList: imageInfo[] = Array.from(fileList).map(
      (file, index) => ({ file, preview: results[index] })
    );

    const updatedImageList = [...imageList, ...newImageList];
    setImageList(updatedImageList);
  };

  return (
    <Frame canGoBack title="게시물 작성" isWhiteTitle isBorder>
      <form
        onSubmit={handleSubmit(onSubmitWithValidation)}
        className="flex flex-col h-full"
      >
        <Controller
          name="content"
          control={control}
          rules={{
            required: { value: true, message: "내용을 입력해주세요." },
          }}
          render={({ field, fieldState }) => (
            <div className="relative ">
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                preview="edit"
                enableScroll={false}
                height={window.innerHeight - 100}
                textareaProps={{
                  placeholder: "내용을 입력해주세요",
                }}
                highlightEnable={false}
                autoFocus
                style={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              />
              {fieldState.error && (
                <p className="absolute mt-1 text-sm text-red-500 top-20 left-4">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
        {imageList.length ? (
          <>
            <div className="h-[207px]"></div>
            <PreviewList imageList={imageList} setImageList={setImageList} />
          </>
        ) : (
          <div className="h-[95px]"></div>
        )}
        <nav className="fixed bottom-0 flex justify-between w-full max-w-xl px-6 py-4 space-x-12 text-xs text-gray-700 bg-white border-t">
          <div className="flex items-center space-x-8 ">
            <div
              className={addClassNames(
                "flex flex-col items-center space-y-2 p-3",
                currentPath === `/${myId}/challenge`
                  ? "bg-[#EFF8F0] rounded-2xl text-habit-green"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <label className="flex items-center justify-center text-gray-600 border-gray-300 hover:text-habit-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7"
                  aria-label="이미지 추가"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <input
                  className="hidden"
                  type="file"
                  accept={SUPPORTED_IMAGE_EXTENSIONS.join(",")}
                  multiple
                  {...register("photos", { onChange: onImageFilesChange })}
                />
              </label>
            </div>
            {isManager ? (
              <div
                onClick={() => setIsAnnouncement((prev) => !prev)}
                className="flex items-center w-24 space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={addClassNames(
                    "size-7",
                    isAnnouncement
                      ? "text-habit-green"
                      : "hover:text-gray-500 transition-colors"
                  )}
                  aria-label="공지사항으로 게시"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="text-sm">공지로 등록</span>
              </div>
            ) : null}
          </div>
          <button
            disabled={isSubmitting}
            className="px-10 py-2 text-lg font-thin text-white border border-transparent shadow-sm bg-habit-green hover:bg-green-600 rounded-2xl focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </nav>
      </form>
    </Frame>
  );
};

export default Page;
