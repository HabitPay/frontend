import Image from "next/image";
import { imageInfo } from "../page";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";
import { memo } from "react";

interface IPreviewImage {
  item: imageInfo;
  index: number;
  onImageCancelClicked: (index: number) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  innerRef: (element?: HTMLElement | null | undefined) => void;
  [key: string]: any;
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
      className="flex flex-col items-center relative size-16"
    >
      <Image src={item.preview} alt="image" fill className="object-cover" />
      <div
        onClick={() => onImageCancelClicked(index)}
        className="absolute -top-2 -right-2 bg-slate-100 border rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="absolute bottom-1 left-1 bg-slate-600 opacity-75 rounded-md p-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          />
        </svg>
      </div>
    </div>
  );
};

export default memo(PreviewImage);
