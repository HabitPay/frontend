import Layout from "@/app/components/layout";
import Menu from "../components/menu";

export default function Loading() {
  return (
    <Layout canGoBack hasTabBar>
      <div className="flex flex-col px-6 divide-y-2 animate-pulse">
        <div className="flex gap-4 pb-3">
          <div className="w-24 bg-gray-400 h-7 rounded-xl" />
          <div className="w-24 bg-gray-400 h-7 rounded-xl" />
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="w-32 h-8 bg-gray-400 rounded-xl" />
          <div className="w-16 h-10 bg-gray-400 rounded-xl" />
        </div>
        <div className="flex flex-col gap-10 pt-5">
          <div className="w-40 h-8 bg-gray-400 rounded-xl" />
          <div className="h-8 bg-gray-400 w-wull rounded-xl" />
        </div>
      </div>
    </Layout>
  );
}
