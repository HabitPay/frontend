import axios from "axios";

import { imageInfo } from "@/app/challenges/[challengeId]/post/page";
import { PhotoDTO } from "@/types/post";
import { MAX_FILE_SIZE, SUPPORTED_IMAGE_EXTENSIONS } from "./constants";

const uploadImageToS3 = async (
  preSignedUrl: string,
  image: File,
  imageExtension: string
) => {
  try {
    await axios.put(preSignedUrl, image, {
      headers: {
        "Content-Type": "image/" + imageExtension,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("이미지 업로드 실패");
  }
};

export const uploadImagesToS3 = async (
  preSignedUrls: string[],
  imageInfoList: imageInfo[]
) => {
  console.log("preSignedUrls", preSignedUrls.length);
  if (preSignedUrls.length === 0) {
    return;
  }
  const filesToUpload = imageInfoList.filter((item) => item.file !== undefined);

  if (filesToUpload.length === 0) {
    console.error("업로드할 이미지가 없습니다.");
    throw new Error("이미지 업로드 실패");
  }

  if (filesToUpload.length !== preSignedUrls.length) {
    console.error(
      "Error: Mismatch between imageInfoList and preSignedUrls length"
    );
    throw new Error("이미지 업로드 실패");
  }

  const uploadPromises = filesToUpload.map((item, index) => {
    if (!item.file) return;

    const file = item.file;
    const imageExtension = file.type.split("/")[1];

    return uploadImageToS3(preSignedUrls[index], file, imageExtension);
  });

  try {
    await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Some uploads failed:", error);
    throw new Error("이미지 업로드 실패");
  }
};

export function convertToPhotoDTO(imageInfoList: imageInfo[]): PhotoDTO[] {
  return imageInfoList.map((item, index) => {
    const photoDTO: PhotoDTO = {
      viewOrder: index + 1,
    };

    if (item.file) {
      photoDTO.imageExtension = item.file.type.split("/")[1];
      photoDTO.contentLength = item.file.size;
    }

    if (item.postPhotoId) {
      photoDTO.photoId = item.postPhotoId;
    }

    return photoDTO;
  });
}

export const isValidImageSize = (image: File): boolean => {
  return 0 < image.size && image.size <= MAX_FILE_SIZE;
};

export const isValidImageExtension = (image: File): boolean => {
  return SUPPORTED_IMAGE_EXTENSIONS.includes(image.type);
};
