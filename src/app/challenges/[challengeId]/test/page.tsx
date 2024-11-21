"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const testArray = ["hogkim", "jkwak", "hogwon", "solpang"];

const Page = () => {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="previewImageBoard">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex w-full h-28 bg-white fixed bottom-[94px] gap-5 items-center px-5"
          >
            {testArray.map((item, index) => (
              <Draggable
                key={`draggable-${index}`}
                draggableId={`draggable-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Page;
