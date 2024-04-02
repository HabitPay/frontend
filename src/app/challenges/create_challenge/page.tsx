"use client";

import Input from "@app/components/input";
import Layout from "@app/components/layout";
import TextArea from "@app/components/textarea";
import Label from "../components/label";

const Page = () => {
  return (
    <Layout canGoBack hasTabBar title="챌린지 생성">
      <div className="flex flex-col space-y-4 p-4">
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
              <span className="text-habit-gray text-sm">시작 일자</span>
              <input type="date" className="text-center" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
              <span className="text-habit-gray text-sm">종료 일자</span>
              <input type="date" className="text-center" />
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <div className="flex flex-row justify-between text-sm px-3">
              <div className="flex items-center justify-center size-6 rounded-full bg-habit-gray p-1">
                일
              </div>
              <div className="flex items-center justify-center size-6 rounded-full bg-habit-gray p-1">
                월
              </div>
              <div className="flex items-center justify-center size-6 rounded-full bg-habit-lightgray p-1 text-habit-green ">
                화
              </div>
              <div className="flex items-center justify-center size-6 rounded-full bg-habit-gray p-1">
                수
              </div>
              <div className="flex items-center justify-center size-6 rounded-full bg-habit-lightgray p-1 text-habit-green ">
                목
              </div>
              <div className="flex items-center justify-center size-6 rounded-full bg-habit-gray p-1">
                금
              </div>
              <div className="flex items-center justify-center size-6 rounded-full bg-habit-gray p-1">
                토
              </div>
            </div>
            <div className=" bg-habit-lightgray py-2 items-center justify-center flex rounded-2xl text-sm mt-4">
              <span>챌린지 기간: </span>
              <span className=" text-habit-green">29</span>
              <span>일</span>
            </div>
          </div>
          <div className="flex flex-col">
            <Label title="벌금 설정" isRequired />
            <div className=" text-habit-gray text-sm mt-4 mb-3">
              벌금은 0원부터 설정 가능합니다.
            </div>
            <input type="text" placeholder="1,000원" className="mb-4" />
            <div className="flex justify-between items-center  text-sm">
              <div className=" bg-yellow-100 py-2 px-4 rounded-xl">+100원</div>
              <div className=" bg-yellow-100 py-2 px-4 rounded-xl">
                +1,000원
              </div>
              <div className=" bg-yellow-100 py-2 px-4 rounded-xl">
                +10,00원
              </div>
              <div className=" bg-habit-lightgray py-2 px-4 rounded-xl">
                초기화
              </div>
            </div>
          </div>
        </div>
        <Label title="챌린지 최대 참여 인원은 1000명입니다." isRequired></Label>
        <button className=" bg-habit-green py-2 rounded-2xl text-sm text-white font-extralight">
          챌린지 생성
        </button>
      </div>
    </Layout>
  );
};

export default Page;
