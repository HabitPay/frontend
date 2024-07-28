"use client";

import { useForm } from "react-hook-form";
import { format, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";

import apiManager from "@/api/apiManager";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import Label from "@/app/challenges/components/label";
import Layout from "@/app/components/layout";
import TextArea from "@/app/components/textarea";
import { addClassNames } from "@/libs/utils";
import { IChallengePatchDto } from "@/types/challenge";
import { Days } from "@/types/enums";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { challengeDetails, selectedDays, isLoading, error } =
    useChallengeDetails(id);
  const {
    register,
    control,
    watch,
    setValue,
    setError,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IChallengePatchDto>({});

  const onSubmitWithValidation = async (form: IChallengePatchDto) => {
    try {
      const res = await apiManager.patch(`/challenges/${id}`, form);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChallengeDelete = async () => {
    try {
      const res = await apiManager.delete(`/challenges/${id}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: CSS 적용하기 or 스켈레톤으로 처리하기
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Layout canGoBack hasTabBar title="챌린지 정보 수정">
      <div className="flex flex-col px-12 space-y-4">
        <form onSubmit={handleSubmit(onSubmitWithValidation)}>
          <div className="flex flex-col space-y-3">
            <Label title="챌린지 이름" isRequired />
            <div className="px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
              {challengeDetails?.title}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Label title="챌린지 설명" isRequired />
            <TextArea
              placeholder="챌린지 설명을 입력해주세요."
              register={register}
              options={{
                required: {
                  value: true,
                  message: "챌린지 설명을 입력해주세요.",
                },
              }}
              name="description"
              defaultValue={challengeDetails?.description}
            />
          </div>
          <div className="flex flex-col">
            <Label title="챌린지 기간" isRequired />
            <div className="flex flex-row justify-between mt-4 mb-4">
              <div className="flex flex-col items-center justify-center space-y-5">
                <span className="text-sm text-habit-gray">시작 일자</span>
                <div className="flex items-center justify-center w-40 px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
                  {challengeDetails &&
                    format(challengeDetails?.startDate, "yyyy.MM.dd (EEE)", {
                      locale: ko,
                    })}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-5">
                <span className="text-sm text-habit-gray">종료 일자</span>
                <div className="flex items-center justify-center w-40 px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
                  {challengeDetails &&
                    format(challengeDetails?.endDate, "yyyy.MM.dd (EEE)", {
                      locale: ko,
                    })}
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <Label title="챌린지 참여 요일" isRequired />
              <div className="flex flex-row justify-between px-3 mt-3 text-sm">
                {selectedDays.map((item, index) => (
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
                  {challengeDetails &&
                    differenceInDays(
                      challengeDetails?.endDate,
                      challengeDetails?.startDate
                    ) + 1}
                </span>
                <span>일</span>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <Label title="1회 실패 당 벌금" isRequired />
              <div className="px-4 py-2 mt-2 text-sm font-light rounded-xl bg-habit-lightgray">
                {challengeDetails &&
                  `${new Intl.NumberFormat("ko-KR").format(
                    challengeDetails?.feePerAbsence
                  )}원`}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <button className="py-2 text-sm text-white bg-habit-green rounded-2xl font-extralight ">
              저장
            </button>
          </div>
        </form>
        {/* TODO: 챌린지 삭제 확인 창 추가하기 */}
        <button
          className="py-2 text-sm text-white bg-[#D32F2F] rounded-2xl font-extralight"
          onClick={handleChallengeDelete}
        >
          챌린지 삭제
        </button>
      </div>
    </Layout>
  );
};

export default Page;
