"use client";

import Label from "@app/challenges/components/label";
import Layout from "@app/components/layout";
import TextArea from "@app/components/textarea";
import { addClassNames } from "@libs/utils";
import { format, differenceInDays } from "date-fns";

interface ChallengeData {
  title: string;
  explanation: string;
  startAt: Date;
  endAt: Date;
  days: number[];
  fee: number;
}

enum Days {
  일,
  월,
  화,
  수,
  목,
  금,
  토,
}

const challenge: ChallengeData = {
  title: "탄수화물 억제 모임",
  explanation: "1달 동안 매일 탄수화물 섭취량 500kcal 이하 섭취",
  startAt: new Date(2024, 1, 1),
  endAt: new Date(2024, 2, 1),
  days: [0, 0, 1, 0, 1, 0, 0],
  fee: 1000,
};

const Page = () => {
  return (
    <Layout canGoBack hasTabBar title="챌린지 정보 수정">
      <div className="flex flex-col px-12 space-y-4">
        <div className="flex flex-col space-y-3">
          <Label title="챌린지 이름" isRequired />
          <div className="px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
            {challenge.title}
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Label title="챌린지 설명" isRequired />
          <TextArea value={challenge.explanation} />
        </div>
        <div className="flex flex-col">
          <Label title="챌린지 기간" isRequired />
          <div className="flex flex-row justify-between mt-6 mb-4">
            <div className="flex flex-col items-center justify-center space-y-5">
              <span className="text-sm text-habit-gray">시작 일자</span>
              <div className="flex items-center justify-center w-40 px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
                {format(challenge.startAt, "yyyy.MM.dd (EEE)")}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-5">
              <span className="text-sm text-habit-gray">종료 일자</span>
              <div className="flex items-center justify-center w-40 px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
                {format(challenge.endAt, "yyyy.MM.dd (EEE)")}
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <div className="flex flex-row justify-between px-3 text-sm">
              {challenge.days.map((item, index) => (
                <div
                  key={index}
                  className={addClassNames(
                    "flex items-center justify-center p-1 rounded-full size-6 ",
                    item === 1
                      ? "text-habit-green bg-[#E0E9E1]"
                      : "bg-[#CCCCCC]"
                  )}
                >
                  {Days[index]}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center py-2 mt-4 text-sm bg-habit-lightgray rounded-2xl">
              <span>챌린지 기간 : </span>
              <span className=" text-habit-green">
                {differenceInDays(challenge.endAt, challenge.startAt)}
              </span>
              <span>일</span>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <Label title="벌금 설정" isRequired />
            <div className="mt-4 mb-3 text-sm text-habit-gray">
              벌금은 0원부터 설정 가능합니다.
            </div>
            <div className="px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
              {`${challenge.fee.toLocaleString()}원`}
            </div>
          </div>
        </div>
        <button className="py-2 text-sm text-white bg-habit-green rounded-2xl font-extralight ">
          저장
        </button>
        <button className="py-2 text-sm text-white bg-[#D32F2F] rounded-2xl font-extralight">
          챌린지 종료
        </button>
      </div>
    </Layout>
  );
};

export default Page;
