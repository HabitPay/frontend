import { PhotoDTO } from "@/types/post";
import axios from "axios";

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
  imageFiles: FileList | undefined
) => {
  if (!imageFiles) return;
  const imageFilesArray = Array.from(imageFiles);

  if (imageFilesArray.length !== preSignedUrls.length) {
    console.error(
      "Error: Mismatch between imageFiles and preSignedUrls length"
    );
    throw new Error("이미지 업로드 실패");
  }

  const uploadPromises = imageFilesArray.map((image, index) =>
    uploadImageToS3(
      preSignedUrls[index],
      image,
      image.type.slice(image.type.indexOf("/") + 1)
    )
  );

  try {
    await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Some uploads failed:", error);
    throw new Error("이미지 업로드 실패");
  }
};

export const convertFilesToPhotoDTOs = (files: FileList | undefined) => {
  if (!files || !files.length) {
    return [];
  }
  let photosData: PhotoDTO[] = Array.from(files).map((file, index) => ({
    viewOrder: index + 1,
    contentLength: file.size,
    imageExtension: file.type.slice(file.type.indexOf("/") + 1),
  }));
  return photosData;
};
