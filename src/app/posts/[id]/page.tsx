"use client";

import Layout from "@app/components/layout";
import PostItem from "@app/components/postItem";
import { PostsFeedExample } from "@app/components/postsFeed";

const Page = () => {
  return (
    <Layout canGoBack>
      <div className="flex flex-col divide-y-2">
        <div className="px-5 py-3">
          <h1 className="text-2xl font-bold">책업일치</h1>
        </div>
        <div className="flex flex-col gap-3 px-5 py-3">
          <div className="flex gap-5 *:bg-habit-lightgray *:px-3 *:py-2 *:rounded-md *:text-sm *:font-[350] ">
            <div>수정</div>
            <div>삭제</div>
            <div className="ml-auto">목록</div>
          </div>
          <PostItem {...PostsFeedExample[0]} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
