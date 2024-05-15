"use client";

import { useState } from "react";

import { format, differenceInDays, set } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { toZonedTime } from "date-fns-tz";
import { ko } from "date-fns/locale";
import { addDays, addYears } from "date-fns";
import { NumericFormat } from "react-number-format";
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

const INCREASE_FEE = [100, 1000, 10000];

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
    getValues,
    formState: { errors },
  } = useForm<IChallengeForm>({});

  const [selectedDays, setSelectedDays] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [challengeDate, setChallengeDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const onSubmitWithValidation = (form: IChallengeForm) => {
    console.log(form);
  };

  const onTitleChange = () => {};

  const onDescriptionChange = () => {};

  const onSelectedDaysChange = (index: number) => {
    setSelectedDays((prev) => {
      const newSelectedDays = [...prev];
      newSelectedDays[index] = newSelectedDays[index] === 1 ? 0 : 1;
      return newSelectedDays;
    });
  };

  const onClickIncreasingFee = (amount: number) => {
    const currentFeePerAbsence = parseInt(
      control._formValues.feePerAbsence || "0",
      10
    );
    setValue("feePerAbsence", currentFeePerAbsence + amount);
  };

  const handleResetFee = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setValue("feePerAbsence", 0);
  };

  const handleFeePerAbsenceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const commaRemovedValue = event.target.value.replace(/,/g, "");
    const numberValue = parseInt(commaRemovedValue, 10);
    setValue("feePerAbsence", numberValue);
  };

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
            <div className="mt-4 mb-4">
              <Controller
                name="startDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateRange
                    locale={ko}
                    onChange={(item) => setChallengeDate([item.selection])}
                    showSelectionPreview={true}
                    months={1}
                    ranges={challengeDate}
                    minDate={new Date()}
                    maxDate={addYears(new Date(), 2)}
                    shownDate={new Date()}
                    dateDisplayFormat={"yyyy.MM.dd"}
                    direction="horizontal"
                    startDatePlaceholder="시작 일자 선택"
                    endDatePlaceholder="종료 일자 선택"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center py-2 mb-4 text-sm bg-habit-lightgray rounded-2xl">
              <span>챌린지 기간: 총 </span>
              <span className=" text-habit-green">
                {challengeDate[0]?.startDate && challengeDate[0]?.endDate
                  ? differenceInDays(
                      challengeDate[0]?.endDate,
                      challengeDate[0]?.startDate
                    ) + 1
                  : 0}
              </span>
              <span>일</span>
            </div>
            <div className="flex flex-col">
              <Label title="챌린지 요일 선택" isRequired />
              <div className="mt-2 text-sm text-habit-gray">
                반드시 하루 이상 선택해주세요.
              </div>
              <div className="flex flex-col mt-3 mb-5">
                <div className="flex flex-row justify-between px-3 text-sm">
                  {selectedDays.map((item, index) => (
                    <div
                      key={index}
                      className={addClassNames(
                        "flex items-center justify-center p-1 rounded-full size-6 ",
                        item === 1
                          ? "text-habit-green bg-[#E0E9E1]"
                          : "bg-white"
                      )}
                      onClick={() => onSelectedDaysChange(index)}
                    >
                      {Days[index]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Label title="벌금 설정" isRequired />
              <div className="mt-2 mb-3 text-sm text-habit-gray">
                1회 실패 당 부과되는 벌금을 설정해주세요.
              </div>
              <div className="flex flex-row justify-between mb-4">
                <Controller
                  name="feePerAbsence"
                  control={control}
                  render={({ field: { ref, onChange, onBlur, ...rest } }) => (
                    <NumericFormat
                      getInputRef={ref}
                      thousandSeparator=","
                      onChange={handleFeePerAbsenceChange}
                      onBlur={handleFeePerAbsenceChange}
                      {...rest}
                    />
                  )}
                />
                <button
                  className="h-10 px-4 py-2 bg-habit-lightgray rounded-xl text-sm"
                  onClick={handleResetFee}
                >
                  초기화
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                {INCREASE_FEE.map((amount, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-yellow-100 rounded-xl"
                    onClick={() => onClickIncreasingFee(amount)}
                  >
                    +{new Intl.NumberFormat("ko-KR").format(amount)}원
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* TODO: 없어도 될 것 같아서 주석 처리 */}
          {/* <Label
            title="챌린지 최대 참여 인원은 1000명입니다."
            isRequired
          ></Label> */}
          <button className="py-2 text-sm text-white bg-habit-green rounded-2xl font-extralight">
            챌린지 생성
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Page;
