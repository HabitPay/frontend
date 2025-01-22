"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import axios, { HttpStatusCode } from "axios";
import { useSetRecoilState } from "recoil";

import apiManager from "@/api/apiManager";
import Button from "@/app/components/button";
import { toastPopupAtom } from "@/hooks/atoms";
import { IApiResponseDto } from "@/types/api/apiResponse.interface";
import { PopupErrorMessage } from "@/types/enums";
import { IProfileDTO } from "@/types/member";
import { removeJwtFromLocalStorage } from "@/libs/jwt";
import { SUPPORTED_IMAGE_EXTENSIONS } from "@/libs/constants";
import {
  isValidImageSize,
  isValidImageExtension,
} from "@/libs/imageUploadUtils";
import defaultProfileImage from "@/public/default-profile.jpg";
import withAuth from "../components/withAuth";
import ConfirmModal from "../components/confirmModal";
import Frame from "../components/frame";
import CameraIcon from "../components/icons/cameraIcon";

interface IForm {
  nickname: string;
  profileImage: FileList | null;
}

interface INicknameDto {
  nickname: string;
}

interface IImageDto {
  extension: string;
  contentLength: number;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForm>({});
  const router = useRouter();

  const [nickname, setNickname] = useState<string>("");
  const [imageExtension, setImageExtension] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setToastPopup = useSetRecoilState(toastPopupAtom);

  const fetchNicknameUpdate = async (nickname: string) => {
    const data: INicknameDto = {
      nickname,
    };
    try {
      const res: IApiResponseDto = await apiManager.patch(
        "/member/nickname",
        data
      );
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
      console.log(error);
    }
  };

  const fetchPreSignedUrl = async (image: File) => {
    const data: IImageDto = {
      extension: imageExtension,
      contentLength: image.size,
    };
    try {
      const res = await apiManager.patch("/member/image", data);
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
      const { preSignedUrl } = res.data?.data;
      return preSignedUrl;
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
      console.log(error);
      return null;
    }
  };

  const uploadImageToS3 = async (preSignedUrl: string, image: File) => {
    try {
      const res = await axios.put(preSignedUrl, image, {
        headers: {
          "Content-Type": "image/" + imageExtension,
        },
      });
      console.log(res);
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

  const onSubmitWithValid = async (validForm: IForm) => {
    if (validForm.nickname) {
      fetchNicknameUpdate(validForm.nickname);
    }
    if (
      validForm.profileImage instanceof FileList &&
      validForm.profileImage.length == 1
    ) {
      const image: File = validForm.profileImage[0];
      const preSignedUrl = await fetchPreSignedUrl(image);
      if (preSignedUrl) {
        uploadImageToS3(preSignedUrl, image);
      }
    }
  };

  const onProfileNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickname(event.target.value);
  };

  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length <= 0) return;

    const file = files[0];

    if (!isValidImageExtension(file)) {
      setToastPopup({
        // @ts-ignore
        message: PopupErrorMessage.UnsupportedFileType,
        top: false,
        success: false,
      });
      return;
    }

    if (!isValidImageSize(file)) {
      setToastPopup({
        // @ts-ignore
        message: PopupErrorMessage.FileSizeExceeded,
        top: false,
        success: false,
      });
    } else {
      const extension: string = file.type.slice(file.type.indexOf("/") + 1);
      setImageExtension(extension);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await apiManager.delete("/member");
      if (res.status === HttpStatusCode.Ok) {
        console.log("delete success");
        setToastPopup((prev) => ({
          message: res.data.message,
          top: false,
          success: true,
        }));
        router.push("/");

        removeJwtFromLocalStorage();
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

  const handleLogout = () => {
    removeJwtFromLocalStorage();
    router.push("/");
  };

  useEffect(() => {
    document.title = "Profile | HabitPay";
    const getProfile = async () => {
      try {
        const res = await apiManager.get("/member");
        const { nickname, imageUrl }: IProfileDTO = res.data?.data;

        if (imageUrl.length > 0) {
          setProfileImageUrl(imageUrl);
        }
        setNickname(nickname);
      } catch (error) {
        setToastPopup({
          // @ts-ignore
          message: error.data.message,
          top: false,
          success: false,
        });
      }
    };
    getProfile();
  }, [setToastPopup]);

  return (
    <Frame title="프로필" hasTabBar>
      <div className="flex flex-col items-center px-5 space-y-10">
        <form
          className="flex flex-col items-center w-full px-4 space-y-4"
          onSubmit={handleSubmit(onSubmitWithValid)}
        >
          <div className="relative">
            <Link href={`${profileImageUrl}`}>
              <Image
                className="object-cover bg-white rounded-full shadow-lg size-32 shadow-slate-800"
                src={previewImage || profileImageUrl || defaultProfileImage}
                alt="Picture of me"
                width={300}
                height={300}
              />
            </Link>

            <label className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 text-sm font-semibold text-gray-600 bg-gray-100 rounded-full">
              <CameraIcon className="size-5" />
              <input
                className="hidden"
                type="file"
                accept={SUPPORTED_IMAGE_EXTENSIONS.join(",")}
                {...register("profileImage", {
                  onChange: onProfileImageChange,
                })}
              />
            </label>
          </div>

          <div className="flex flex-col w-full space-y-6">
            <div className="flex flex-col w-full space-y-2">
              <span className="text-sm">닉네임</span>
              <input
                type="text"
                value={nickname}
                {...register("nickname", { onChange: onProfileNicknameChange })}
                className="w-full px-3 py-2 placeholder-gray-400 appearance-none rounded-2xl focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <Button isSubmitting={isSubmitting} text="저장" />
          </div>
          {errors.nickname && <span>{errors.nickname.message}</span>}
          {errors.profileImage && <span>{errors.profileImage.message}</span>}
        </form>
        <div className="w-full px-4 pt-4 bg-white rounded-xl">
          <div className="pb-2 text-lg font-bold">계정 관리</div>
          <div className="flex flex-col items-center py-4 space-y-3 border-t-2">
            <button
              className="w-full py-1 border-2 rounded-md border-slate-400"
              onClick={handleLogout}
            >
              로그아웃
            </button>
            <ConfirmModal
              onClick={handleDeleteUser}
              onClose={() => setIsModalOpen(false)}
              open={isModalOpen}
            >
              계정 삭제
            </ConfirmModal>
            <button
              className="w-full py-1 border-2 rounded-md border-slate-400"
              onClick={() => setIsModalOpen(true)}
            >
              계정삭제
            </button>
          </div>
        </div>
        <div className="w-full px-4 pt-4 bg-white rounded-xl">
          <div className="pb-2 text-lg font-bold">
            버그 제보 및 기능 개선 제안
          </div>
          <div className="flex flex-col items-center py-4 space-y-3 border-t-2">
            <button className="w-full py-1 border-2 rounded-md border-slate-400">
              <Link href="https://forms.gle/mHAKjiG51eEsZqMx5" target="_blank">
                작성하기
              </Link>
            </button>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default withAuth(Page);
