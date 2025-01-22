import { memo } from "react";
import Image from "next/image";

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";
import { imageInfo } from "../page";
import CancelIcon from "@/app/components/icons/cancelIcon";
import MoveIcon from "@/app/components/icons/moveIcon";

interface IPreviewImage {
  item: imageInfo;
  index: number;
  onImageCancelClicked: (index: number) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  innerRef: (element?: HTMLElement | null | undefined) => void;
  [key: string]: any;
  postPhotoId?: number;
}

const PreviewImage = ({
  item,
  index,
  onImageCancelClicked,
  draggableProps,
  dragHandleProps,
  innerRef,
}: IPreviewImage) => {
  return (
    <div
      ref={innerRef}
      {...dragHandleProps}
      {...draggableProps}
      className="relative flex flex-col items-center size-16"
    >
      <Image src={item.preview} alt="image" fill className="object-cover" />
      <div
        onClick={() => onImageCancelClicked(index)}
        className="absolute border rounded-full -top-2 -right-2 bg-slate-100"
      >
        <CancelIcon className="size-4" />
      </div>
      <div className="absolute bottom-1 left-1 bg-slate-600 opacity-75 rounded-md p-[1px]">
        <MoveIcon className="size-4" />
      </div>
    </div>
  );
};

export default memo(PreviewImage);
