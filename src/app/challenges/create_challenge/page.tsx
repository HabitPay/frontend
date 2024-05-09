"use client";

import { useState } from "react";

import { format, differenceInDays } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { toZonedTime } from "date-fns-tz";
import { ko } from "date-fns/locale";
import { addDays, addYears } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { addClassNames } from "@libs/utils";
import Layout from "@app/components/layout";
import TextArea from "@app/components/textarea";
import Label from "../components/label";

enum Days {
  일,
  월,
  화,
  수,
  목,
  금,
  토,
}

const TIME_ZONE = "Asia/Seoul";

interface IChallengeForm {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participatingDays: number;
  feePerAbsence: number;
}

function Page() {
  const {
    register,
    control,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IChallengeForm>({});

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const onSubmitWithValidation = (form: IChallengeForm) => {
    console.log(form);
  };

  const onTitleChange = () => {};

  const onDescriptionChange = () => {};

  const onStartDateChange = () => {};

  return (
    <Layout canGoBack hasTabBar title="챌린지 생성">
      <form onSubmit={handleSubmit(onSubmitWithValidation)}>
        <div className="flex flex-col px-12 space-y-4">
          <div className="flex flex-col space-y-3">
            <Label title="챌린지 이름" isRequired />
            <input
              type="text"
              placeholder="챌린지 이름"
              {...register("title", {
                required: {
                  value: true,
                  message: "챌린지 이름을 입력해주세요.",
                },
                onChange: onTitleChange,
              })}
            />
          </div>
          <div className="flex flex-col space-y-3">
            <Label title="챌린지 설명" isRequired />
            <TextArea
              {...register("description", {
                required: {
                  value: true,
                  message: "챌린지 설명을 입력해주세요.",
                },
                onChange: onDescriptionChange,
              })}
            />
          </div>
          <div className="flex flex-col">
            <Label title="챌린지 기간" isRequired />
            <div className="flex flex-row justify-around mt-4 mb-4">
              <div className="flex flex-col items-center justify-center space-y-5">
                <span className="text-sm text-habit-gray">시작 일자</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-5">
                <span className="text-sm text-habit-gray">종료 일자</span>
              </div>
            </div>
            <div className="mb-5">
              <Controller
                name="startDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateRange
                    locale={ko}
                    onChange={(item) => setState([item.selection])}
                    showSelectionPreview={true}
                    months={1}
                    ranges={state}
                    minDate={new Date()}
                    maxDate={addYears(new Date(), 2)}
                    dateDisplayFormat={"yyyy.MM.dd"}
                    direction="horizontal"
                    startDatePlaceholder="시작 일자"
                    endDatePlaceholder="종료 일자 선택"
                  />
                )}
              />
            </div>
            <div className="flex flex-col mb-5">
              <div className="flex flex-row justify-between px-3 text-sm">
                {[0, 0, 0, 0, 0, 0, 0].map((item, index) => (
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
                  {differenceInDays(new Date(2024, 4, 1), new Date(2024, 2, 1))}
                </span>
                <span>일</span>
              </div>
            </div>
            <div className="flex flex-col">
              <Label title="벌금 설정" isRequired />
              <div className="mt-4 mb-3 text-sm text-habit-gray">
                벌금은 0원부터 설정 가능합니다.
              </div>
              <input type="text" placeholder="1,000원" className="mb-4" />
              <div className="flex items-center justify-between text-sm">
                <div className="px-4 py-2 bg-yellow-100 rounded-xl">+100원</div>
                <div className="px-4 py-2 bg-yellow-100 rounded-xl">
                  +1,000원
                </div>
                <div className="px-4 py-2 bg-yellow-100 rounded-xl">
                  +10,00원
                </div>
                <div className="px-4 py-2 bg-habit-lightgray rounded-xl">
                  초기화
                </div>
              </div>
            </div>
          </div>
          <Label
            title="챌린지 최대 참여 인원은 1000명입니다."
            isRequired
          ></Label>
          <button className="py-2 text-sm text-white bg-habit-green rounded-2xl font-extralight">
            챌린지 생성
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Page;
