"use client";

import apiManager from "@/api/apiManager";
import Frame from "@/app/components/frame";
import { toastPopupAtom } from "@/hooks/atoms";
import { addClassNames } from "@/libs/utils";
import { IChallengeDetailsDto } from "@/types/challenge";
import {
  IChallengeFeeListDto,
  MemberFeeView,
} from "@/types/challenge/challengeFeeList.interface";
import { IProfileDTO } from "@/types/member";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const [feeData, setFeeData] = useState<IChallengeFeeListDto>({
    myFee: 0,
    totalFee: 0,
    memberFeeList: [],
  });
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  useEffect(() => {
    const getFeeList = async () => {
      try {
        const res = await apiManager.get(`/challenges/${id}/fee`);
        const data: IChallengeFeeListDto = res.data?.data;
        setFeeData(data);
      } catch (error) {
        setToastPopup({
          // @ts-ignore
          message: error.data.message,
          top: false,
          success: false,
        });
      }
    };
    const getChallengeInfo = async () => {
      try {
        const res = await apiManager.get(`/challenges/${id}`);
        const data: IChallengeDetailsDto = res.data?.data;
        setIsEnrolled(data.isMemberEnrolledInChallenge);
      } catch (error) {
        setToastPopup({
          // @ts-ignore
          message: error.data.message,
          top: false,
          success: false,
        });
      }
    };
    getFeeList();
    getChallengeInfo();
  }, [id, setToastPopup]);

  const [criteria, setCriteria] = useState<"rankByFee" | "rankByAchvRate">(
    "rankByFee"
  );

  const rankByFee: MemberFeeView[] = [...feeData.memberFeeList].sort(
    (a, b) => b.totalFee - a.totalFee
  );
  const rankByAchvRate: MemberFeeView[] = [...feeData.memberFeeList].sort(
    (a, b) => b.completionRate - a.completionRate
  );

  return (
    <Frame title="벌금 현황" canGoBack hasTabBar>
      <div className="flex flex-col px-3 mt-8">
        <div className="flex flex-col space-y-4 text-sm">
          <div className="font-bold ">
            <span>전체 누적 벌금 총합 : </span>
            <span className=" text-habit-green">
              {feeData.totalFee.toLocaleString()}
            </span>
            <span>원</span>
          </div>
          <div>
            <span>나의 누적 벌금 총합 : </span>
            <span className="text-red-600">
              {feeData.myFee.toLocaleString()}
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
                className="px-4 py-3 font-light tracking-tighter text-left uppercase"
              >
                순위
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-light tracking-tighter text-left uppercase"
              >
                닉네임
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-light tracking-tighter text-left uppercase"
              >
                누적 벌금
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-light tracking-tighter text-left uppercase"
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
                    true ? "bg-habit-green" : "bg-white"
                  )}
                >
                  <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.nickname}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.totalFee.toLocaleString()}원
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.completionRate}%
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
                    participant.isMe ? "bg-habit-green" : "bg-white"
                  )}
                >
                  <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap ">
                    {participant.nickname}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.totalFee.toLocaleString()}원
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.completionRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex items-center justify-center mt-10">
        <button
          disabled={isEnrolled ? false : true}
          className={`px-28 py-2 font-light text-sm rounded-2xl text-center bg-[#D32F2F] text-white disabled:bg-slate-400`}
        >
          챌린지 포기
        </button>
      </div>
    </Frame>
  );
};

export default Page;
