"use client";

import Frame from "@/app/components/frame";
import { MB, validImageExtensions } from "@/libs/constants";
import { addClassNames } from "@/libs/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PreviewList from "./components/previewList";
import apiManager from "@/api/apiManager";
import { ICreatePostDTO } from "@/types/post";
import { useSetRecoilState } from "recoil";
import { toastPopupAtom } from "@/hooks/atoms";
import { useRouter } from "next/navigation";
import { IChallengeDetailsDto } from "@/types/challenge";
import { convertToPhotoDTO, uploadImagesToS3 } from "@/libs/imageUploadUtils";

export interface imageInfo {
  file?: File;
  postPhotoId?: number;
  preview: string;
  isNew: boolean;
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
  const { register, handleSubmit, setError, setValue } = useForm<IForm>();
  const [imageList, setImageList] = useState<imageInfo[]>([]);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const router = useRouter();
  const currentPath = usePathname();
  useEffect(() => {
    document.title = "Challenge Post | HabitPay";
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
    if (!fileList.every((file) => validImageExtensions.includes(file.type))) {
      setToastPopup({
        message: "지원되는 파일 형식은 JPEG, JPG, PNG, GIF입니다.",
        top: false,
        success: false,
      });
      setError("photos", {
        message: "지원되는 파일 형식은 JPEG, JPG, PNG, GIF입니다.",
      });
      return;
    }
    if (!fileList.every((file) => file.size <= 5 * MB)) {
      setToastPopup({
        message: "사진 한 장의 크기는 최대 1MB 입니다.",
        top: false,
        success: false,
      });
      setError("photos", {
        message: "사진 한 장의 크기는 최대 1MB 입니다.",
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
      (file, index) => ({ file, preview: results[index], isNew: true })
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
        <textarea
          {...register("content", {
            required: { value: true, message: "내용을 입력해주세요." },
          })}
          className="w-full h-screen px-4 pt-4 border-gray-300"
          placeholder="오늘의 챌린지 내용에 대해서 작성해주세요."
        />
        {
          // nav와 imageList의 높이 112px, 95px
          imageList.length ? (
            <>
              <div className="h-[207px]"></div>
              <PreviewList imageList={imageList} setImageList={setImageList} />
            </>
          ) : (
            <div className="h-[95px]"></div>
          )
        }
        <nav className="fixed bottom-0 flex justify-between w-full max-w-xl px-6 py-4 space-x-12 text-xs text-gray-700 bg-white border-t">
          <div className="flex items-center space-x-8 ">
            <div
              className={addClassNames(
                "flex flex-col items-center space-y-2 p-3",
                currentPath === "/challenges/my-challenge"
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
                  accept={validImageExtensions.join(",")}
                  multiple
                  {...register("photos", { onChange: onImageFilesChange })}
                />
              </label>
            </div>
            {isManager ? (
              <div
                onClick={() => setIsAnnouncement((prev) => !prev)}
                className="flex items-center space-x-1 w-24"
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
          <button className="px-10 py-2 text-lg font-thin text-white border border-transparent shadow-sm bg-habit-green hover:bg-green-600 rounded-2xl focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none">
            저장
          </button>
        </nav>
      </form>
    </Frame>
  );
};

export default Page;
