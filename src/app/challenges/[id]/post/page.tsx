"use client";

import Layout from "@app/components/layout";

const Page = () => {
  return (
    <Layout isPost isManager canGoBack title="게시물 작성" isWhiteTitle>
      <textarea
        className="w-full h-full min-h-screen px-4 py-8 border-t border-gray-300"
        placeholder="오늘의 챌린지 내용에 대해서 작성해주세요."
      />
    </Layout>
  );
};

export default Page;
