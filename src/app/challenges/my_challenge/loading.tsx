import Layout from "@/app/components/layout";

const Loading = () => {
  return (
    <Layout>
      <div className="flex flex-col px-5 animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col gap-2">
            <div className="w-14 h-6 bg-gray-400 rounded-md" />
            <div className="w-20 h-4 bg-gray-400 rounded-md" />
          </div>
          <div className="rounded-full size-16 bg-gray-400" />
        </div>
        <div className="flex flex-col mb-10">
          <div className="mb-2 w-32 h-4 bg-gray-400 rounded-md" />
          <h3 className="mb-5 w-32 h-7 bg-gray-400 rounded-md" />
          <div className="flex items-center mb-2 space-x-2">
            <div className="px-3 py-1 border-2 h-9 w-20 rounded-xl bg-gray-400" />
            <div className="px-3 py-1 border-2 h-9 w-16 rounded-xl bg-gray-400" />
            <div className="px-3 py-1 border-2 h-9 w-20 rounded-xl bg-gray-400" />
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
                    <div className="w-36 h-4 bg-gray-400 rounded-md" />
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
                <div className="w-60 h-5 bg-gray-400 rounded-md" />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-6 h-6 bg-gray-400 rounded-md" />
                <div className="w-32 h-5 bg-gray-400 rounded-md" />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-6 h-6 bg-gray-400 rounded-md" />
                <div className="w-36 h-5 bg-gray-400 rounded-md" />
              </div>
            </div>
            <div className="w-full py-[6px] h-8 text-sm font-thin text-white bg-gray-400 rounded-xl" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Loading;
