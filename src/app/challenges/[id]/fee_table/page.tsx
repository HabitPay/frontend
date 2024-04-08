"use client";

import Layout from "@app/components/layout";
import { addClassNames } from "@libs/utils";
import { useState } from "react";

interface Participant {
  nickname: string;
  fee: number;
  achvRate: number;
}

const feeOfParticipants: Participant[] = [
  { nickname: "joonhan", fee: 4000, achvRate: 20 },
  { nickname: "신길동매운짬뽕", fee: 2000, achvRate: 35 },
  { nickname: "영등포불꽃주먹", fee: 3000, achvRate: 35 },
  { nickname: "개포동푹신푸딩", fee: 0, achvRate: 50 },
];

const Page = () => {
  const [criteria, setCriteria] = useState<"rankByFee" | "rankByAchvRate">(
    "rankByFee"
  );
  const myNickname = "joonhan";

  const totalFee = feeOfParticipants.reduce(
    (acc, participant) => acc + participant.fee,
    0
  );
  const rankByFee: Participant[] = [...feeOfParticipants].sort(
    (a, b) => b.fee - a.fee
  );
  const rankByAchvRate: Participant[] = [...feeOfParticipants].sort(
    (a, b) => b.achvRate - a.achvRate
  );

  return (
    <Layout title="벌금 현황" canGoBack hasTabBar>
      <div className="flex flex-col px-3 mt-8">
        <div className="flex flex-col space-y-4 text-sm">
          <div className="font-bold ">
            <span>전체 누적 벌금 총합 : </span>
            <span className=" text-habit-green">
              {totalFee.toLocaleString()}
            </span>
            <span>원</span>
          </div>
          <div>
            <span>나의 누적 벌금 총합 : </span>
            <span className="text-red-600">
              {feeOfParticipants[0].fee.toLocaleString()}
            </span>
            <span>원</span>
          </div>
        </div>
        <div className="flex justify-end w-full mt-6 space-x-3 text-sm">
          <div
            onClick={() => setCriteria("rankByFee")}
            className={addClassNames(
              "px-3 py-2 rounded-xl ",
              criteria === "rankByFee"
                ? " border-2 border-habit-green text-habit-green bg-white"
                : " border-2 border-habit-lightgray bg-habit-lightgray"
            )}
          >
            벌금 높은 순
          </div>
          <div
            onClick={() => setCriteria("rankByAchvRate")}
            className={addClassNames(
              "px-3 py-2 rounded-xl ",
              criteria === "rankByAchvRate"
                ? " border-2 border-habit-green text-habit-green bg-white"
                : " border-2 border-habit-lightgray bg-habit-lightgray"
            )}
          >
            달성율 높은 순
          </div>
        </div>
        <table className="min-w-full mt-5 divide-y divide-gray-200">
          <thead className="text-sm text-white bg-black">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 font-light tracking-wider text-left uppercase"
              >
                순위
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-light tracking-wider text-left uppercase"
              >
                닉네임
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-light tracking-wider text-left uppercase"
              >
                누적 벌금
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-light tracking-wider text-left uppercase"
              >
                달성률
              </th>
            </tr>
          </thead>
          {criteria === "rankByFee" ? (
            <tbody className="text-sm bg-white divide-y divide-gray-200">
              {rankByFee.map((participant, index) => (
                <tr
                  key={index}
                  className={addClassNames(
                    "",
                    participant.nickname === myNickname
                      ? "bg-habit-green"
                      : "bg-white"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.nickname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.fee.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.achvRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="text-sm bg-white divide-y divide-gray-200">
              {rankByAchvRate.map((participant, index) => (
                <tr
                  key={index}
                  className={addClassNames(
                    "",
                    participant.nickname === myNickname
                      ? "bg-habit-green"
                      : "bg-white"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.nickname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.fee.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.achvRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="px-28 py-2 font-light text-sm rounded-2xl text-center bg-[#D32F2F] text-white">
          챌린지 포기
        </div>
      </div>
    </Layout>
  );
};

export default Page;
