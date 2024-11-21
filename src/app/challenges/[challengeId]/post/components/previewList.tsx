import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { imageInfo } from "../page";
import PreviewImage from "./previewImage";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

interface IPreviewList {
  imageList: imageInfo[];
  setImageList: Dispatch<SetStateAction<imageInfo[]>>;
  setDeletedImageList?: Dispatch<SetStateAction<number[]>>;
}

const PreviewList = ({
  imageList,
  setImageList,
  setDeletedImageList,
}: IPreviewList) => {
  const onImageCancelClicked = (index: number, postPhotoId?: number) => {
    const newImageList = [...imageList];

    newImageList.splice(index, 1);
    if (setDeletedImageList && postPhotoId) {
      setDeletedImageList((prev) => [...prev, postPhotoId]);
    }
    setImageList(newImageList);
  };
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      console.log("source: ", source);
      console.log("destination: ", destination);
      if (!destination) return;
      if (destination.index === source.index) return;

      const newImageList = Array.from(imageList);
      const temp = newImageList[source.index];
      newImageList.splice(source.index, 1);
      newImageList.splice(destination.index, 0, temp);
      setImageList(newImageList);
    },
    [imageList, setImageList]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="previewImageBoard" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex w-full max-w-xl  h-28 bg-white fixed bottom-[85px] gap-5 items-center px-5 border-t border-gray-300"
          >
            {imageList.map((item, index) => (
              <Draggable
                key={`draggable-${index}`}
                draggableId={`draggable-${index}`}
                index={index}
              >
                {(provided) => (
                  <PreviewImage
                    innerRef={provided.innerRef}
                    dragHandleProps={provided.dragHandleProps}
                    draggableProps={provided.draggableProps}
                    key={index}
                    item={item}
                    index={index}
                    onImageCancelClicked={() =>
                      onImageCancelClicked(index, item.postPhotoId)
                    }
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PreviewList;
