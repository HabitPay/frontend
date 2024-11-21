"use client";

import { useForm } from "react-hook-form";
import { format, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";

import apiManager from "@/api/apiManager";
import { useChallengeDetails } from "@/hooks/useChallengeDetails";
import Label from "@/app/challenges/components/label";
import TextArea from "@/app/components/textarea";
import { addClassNames } from "@/libs/utils";
import { IChallengePatchDto } from "@/types/challenge";
import { Days } from "@/types/enums";
import { useSetRecoilState } from "recoil";
import { toastPopupAtom } from "@/hooks/atoms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmModal from "@/app/components/confirmModal";
import Frame from "@/app/components/frame";

const Page = ({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) => {
  const { challengeDetails, selectedDays, isLoading, error } =
    useChallengeDetails(challengeId);
  const { register, handleSubmit } = useForm<IChallengePatchDto>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setToastPopup = useSetRecoilState(toastPopupAtom);
  const router = useRouter();
  useEffect(() => {
    document.title = "Challenge Edit | HabitPay";
  }, []);
  const onSubmitWithValidation = async (form: IChallengePatchDto) => {
    try {
      const res = await apiManager.patch(`/challenges/${challengeId}`, form);
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
      router.push(`/challenges/${challengeId}/main`);
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

  const handleChallengeDelete = async () => {
    try {
      const res = await apiManager.delete(`/challenges/${challengeId}`);
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
      router.push(`/challenges/my-challenge`);
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Frame canGoBack hasTabBar title="챌린지 정보 수정">
      <div className="flex flex-col px-10 space-y-4">
        <form
          onSubmit={handleSubmit(onSubmitWithValidation)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col space-y-2">
            <Label id="" title="챌린지 이름" isRequired />
            <div className="px-4 py-2 text-sm font-light rounded-xl bg-habit-lightgray">
              {challengeDetails?.title}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label id="description" title="챌린지 설명" isRequired />
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
          <div className="flex flex-col gap-3">
            <Label id="" title="챌린지 기간" isRequired />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-sm text-habit-gray">시작 일자</div>
                <div className="flex items-center justify-center py-2 text-sm font-light w-36 rounded-xl bg-habit-lightgray">
                  {challengeDetails &&
                    format(
                      new Date(challengeDetails?.startDate),
                      "yyyy.MM.dd (EEE)",
                      {
                        locale: ko,
                      }
                    )}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-sm text-habit-gray">종료 일자</div>
                <div className="flex items-center justify-center py-2 text-sm font-light w-36 rounded-xl bg-habit-lightgray">
                  {challengeDetails &&
                    format(
                      new Date(challengeDetails?.endDate),
                      "yyyy.MM.dd (EEE)",
                      {
                        locale: ko,
                      }
                    )}
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <Label id="" title="챌린지 참여 요일" isRequired />
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
                      new Date(challengeDetails?.endDate),
                      new Date(challengeDetails?.startDate)
                    ) + 1}
                </span>
                <span>일</span>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <Label id="" title="1회 실패 당 벌금" isRequired />
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
        <ConfirmModal
          onClick={handleChallengeDelete}
          onClose={() => setIsModalOpen(false)}
          open={isModalOpen}
        >
          챌린지 삭제
        </ConfirmModal>
        <button
          className="py-2 text-sm text-white bg-[#D32F2F] rounded-2xl font-extralight"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          챌린지 삭제
        </button>
      </div>
    </Frame>
  );
};

export default Page;
