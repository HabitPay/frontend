"use client";

import Layout from "@app/components/layout";
import TextArea from "@app/components/textarea";
import Label from "../components/label";

const Page = () => {
  return (
    <Layout canGoBack hasTabBar title="챌린지 생성">
      <div className="flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-3">
          <Label title="챌린지 이름" isRequired />
          <input type="text" placeholder="책업일치" />
        </div>
        <div className="flex flex-col space-y-3">
          <Label title="챌린지 설명" isRequired />
          <TextArea />
        </div>
        <div className="flex flex-col">
          <Label title="챌린지 기간" isRequired />
          <div className="flex flex-row justify-between mt-6 mb-4">
            <div className="flex flex-col items-center justify-center space-y-6">
              <span className="text-sm text-habit-gray">시작 일자</span>
              <input type="date" className="text-center" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
              <span className="text-sm text-habit-gray">종료 일자</span>
              <input type="date" className="text-center" />
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <div className="flex flex-row justify-between px-3 text-sm">
              <div className="flex items-center justify-center p-1 rounded-full size-6 bg-habit-gray">
                일
              </div>
              <div className="flex items-center justify-center p-1 rounded-full size-6 bg-habit-gray">
                월
              </div>
              <div className="flex items-center justify-center p-1 rounded-full size-6 bg-habit-lightgray text-habit-green ">
                화
              </div>
              <div className="flex items-center justify-center p-1 rounded-full size-6 bg-habit-gray">
                수
              </div>
              <div className="flex items-center justify-center p-1 rounded-full size-6 bg-habit-lightgray text-habit-green ">
                목
              </div>
              <div className="flex items-center justify-center p-1 rounded-full size-6 bg-habit-gray">
                금
              </div>
              <div className="flex items-center justify-center p-1 rounded-full size-6 bg-habit-gray">
                토
              </div>
            </div>
            <div className="flex items-center justify-center py-2 mt-4 text-sm  bg-habit-lightgray rounded-2xl">
              <span>챌린지 기간: </span>
              <span className=" text-habit-green">29</span>
              <span>일</span>
            </div>
          </div>
          <div className="flex flex-col">
            <Label title="벌금 설정" isRequired />
            <div className="mt-4 mb-3 text-sm  text-habit-gray">
              벌금은 0원부터 설정 가능합니다.
            </div>
            <input type="text" placeholder="1,000원" className="mb-4" />
            <div className="flex items-center justify-between text-sm">
              <div className="px-4 py-2 bg-yellow-100  rounded-xl">+100원</div>
              <div className="px-4 py-2 bg-yellow-100  rounded-xl">
                +1,000원
              </div>
              <div className="px-4 py-2 bg-yellow-100  rounded-xl">
                +10,00원
              </div>
              <div className="px-4 py-2  bg-habit-lightgray rounded-xl">
                초기화
              </div>
            </div>
          </div>
        </div>
        <Label title="챌린지 최대 참여 인원은 1000명입니다." isRequired></Label>
        <button className="py-2 text-sm text-white  bg-habit-green rounded-2xl font-extralight">
          챌린지 생성
        </button>
      </div>
    </Layout>
  );
};

export default Page;
