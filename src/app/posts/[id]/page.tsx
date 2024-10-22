"use client";

import Frame from "@/app/components/frame";
import PostItem from "@/app/components/postItem";
import { ContentDTO } from "@/types/challenge";

const postFeedExample: ContentDTO = {
  id: 1,
  challengeEnrollmentId: 1,
  content: "content",
  writer: "writer",
  profileUrl: "",
  isAnnouncement: false,
  createdAt: "2021-09-01",
  photoViewList: [],
};

const Page = () => {
  return (
    <Frame canGoBack>
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
          <PostItem {...postFeedExample} />
        </div>
      </div>
    </Frame>
  );
};

export default Page;
