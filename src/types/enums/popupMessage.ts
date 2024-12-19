import {
  MAX_FILE_SIZE,
  MB,
  SUPPORTED_IMAGE_EXTENSIONS,
} from "@/libs/constants";

const supportedFileTypes = SUPPORTED_IMAGE_EXTENSIONS.map(
  (type) => type.split("/")[1]
).join(", ");

export const PopupErrorMessage = {
  ReLoginRequired: "다시 로그인 해 주세요",
  UnsupportedFileType: `지원되는 파일 형식은 ${supportedFileTypes} 입니다.`,
  FileSizeExceeded: `파일 크기는 ${MAX_FILE_SIZE / MB}MB를 초과할 수 없습니다.`,
} as const;
