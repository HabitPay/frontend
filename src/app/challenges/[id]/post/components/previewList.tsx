import { Dispatch, SetStateAction, useState } from "react";
import { imageInfo } from "../page";
import Image from "next/image";
import PreviewImage from "./previewImage";

interface IPreviewList {
  imageList: imageInfo[];
  setImageList: Dispatch<SetStateAction<imageInfo[]>>;
}

const PreviewList = ({ imageList, setImageList }: IPreviewList) => {
  const onImageCancelClicked = (index: number) => {
    const newImageList = [...imageList];

    newImageList.splice(index, 1);
    console.log(newImageList);
    setImageList(newImageList);
  };

  return (
    <div className="flex w-full h-28 bg-white fixed bottom-[94px] gap-5 items-center px-5">
      {imageList.map((item, index) =>
        PreviewImage({ item, index, onImageCancelClicked })
      )}
    </div>
  );
};

export default PreviewList;
