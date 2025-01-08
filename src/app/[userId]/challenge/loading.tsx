import Frame from "@/app/components/frame";

const Loading = () => {
  return (
    <Frame>
      <div className="flex flex-col px-5 animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col gap-2">
            <div className="h-6 bg-gray-400 rounded-md w-14" />
            <div className="w-20 h-4 bg-gray-400 rounded-md" />
          </div>
          <div className="bg-gray-400 rounded-full size-16" />
        </div>
        <div className="flex flex-col mb-10">
          <div className="w-32 h-4 mb-2 bg-gray-400 rounded-md" />
          <h3 className="w-32 mb-5 bg-gray-400 rounded-md h-7" />
          <div className="flex items-center mb-2 space-x-2">
            <div className="w-20 px-3 py-1 bg-gray-400 border-2 h-9 rounded-xl" />
            <div className="w-16 px-3 py-1 bg-gray-400 border-2 h-9 rounded-xl" />
            <div className="w-20 px-3 py-1 bg-gray-400 border-2 h-9 rounded-xl" />
          </div>
          <div className="flex flex-col px-4 py-6 mt-6 space-y-4 bg-white rounded-xl">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center -space-x-2">
                    <div className="z-10 rounded-full size-12 bg-slate-400" />
                    <div className="flex items-center justify-center rounded-full size-12 bg-habit-lightgray"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-16 h-4 bg-gray-400 rounded-md" />
                    <div className="h-4 bg-gray-400 rounded-md w-36" />
                  </div>
                </div>
                <div className="w-6 h-6" />
              </div>
              <div className="w-full h-3 bg-gray-400" />
            </div>
            <div className="w-full h-[2px]  bg-habit-lightgray" />
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-6 h-6 bg-gray-400 rounded-md" />
                <div className="h-5 bg-gray-400 rounded-md w-60" />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-6 h-6 bg-gray-400 rounded-md" />
                <div className="w-32 h-5 bg-gray-400 rounded-md" />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-6 h-6 bg-gray-400 rounded-md" />
                <div className="h-5 bg-gray-400 rounded-md w-36" />
              </div>
            </div>
            <div className="w-full py-[6px] h-8 text-sm font-thin text-white bg-gray-400 rounded-xl" />
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default Loading;
