"use client";

import { useState } from "react";

import { format, differenceInDays, set } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { toZonedTime } from "date-fns-tz";
import { ko } from "date-fns/locale";
import { addYears } from "date-fns";
import { NumericFormat } from "react-number-format";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { addClassNames } from "@libs/utils";
import Layout from "@app/components/layout";
import TextArea from "@app/components/textarea";
import Label from "../components/label";
import Button from "@app/components/button";
import { convertKstDate } from "@libs/date";
import apiManager from "@api/apiManager";
import { Days, SelectedStatus } from "@/types/enums";

const INCREASE_FEE = [100, 1000, 10000];

interface IChallengeForm {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  participatingDays: number;
  feePerAbsence: number;
}

interface IChallengeDto {
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

  const [selectedDays, setSelectedDays] = useState<number[]>(
    new Array(7).fill(SelectedStatus.NOT_SELECTED)
  );

  const [challengeDate, setChallengeDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const onSubmitWithValidation = async (form: IChallengeForm) => {
    const data: IChallengeDto = {
      title: form.title,
      description: form.description,
      participatingDays: form.participatingDays,
      feePerAbsence: form.feePerAbsence,
      startDate: convertKstDate(form.startDate, form.startTime),
      endDate: convertKstDate(form.endDate, form.endTime),
    };
    console.log(data);
    try {
      const res = await apiManager.post("/challenges", data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const onTitleChange = () => {};

  const handleSelectedDaysChange = (index: number) => {
    setSelectedDays((prev) => {
      const newSelectedDays = [...prev];
      newSelectedDays[index] =
        newSelectedDays[index] === SelectedStatus.SELECTED
          ? SelectedStatus.NOT_SELECTED
          : SelectedStatus.SELECTED;
      return newSelectedDays;
    });

    let bitValue: number = getValues("participatingDays");
    bitValue ^= 1 << (6 - index);
    setValue("participatingDays", bitValue);
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
              placeholder="챌린지 설명을 입력해주세요."
              register={register}
              options={{
                required: {
                  value: true,
                  message: "챌린지 설명을 입력해주세요.",
                },
              }}
              name="description"
            />
          </div>
          <div className="flex flex-col">
            <Label title="챌린지 기간" isRequired />
            <div className="mt-4 mb-4">
              <DateRange
                locale={ko}
                onChange={(item) => {
                  setChallengeDate([item.selection]);
                  setValue(
                    "startDate",
                    format(item.selection.startDate, "yyyy-MM-dd")
                  );
                  setValue(
                    "endDate",
                    format(item.selection.endDate, "yyyy-MM-dd")
                  );
                }}
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
            </div>
            <div className="flex justify-around mb-4">
              <div className="flex flex-col">
                <Label title="챌린지 시작 시간" isRequired />
                {control._formValues.startDate && (
                  <h3 className="text-neutral-500">{getValues("startDate")}</h3>
                )}
                <input
                  type="time"
                  className="mt-3"
                  {...register("startTime", {
                    required: {
                      value: true,
                      message: "시작 시간을 입력해주세요.",
                    },
                  })}
                />
              </div>
              <div className="flex flex-col">
                <Label title="챌린지 종료 시간" isRequired />
                {control._formValues.endDate && (
                  <h3 className="text-neutral-500">{getValues("endDate")}</h3>
                )}
                <input
                  type="time"
                  className="mt-3"
                  {...register("endTime", {
                    required: {
                      value: true,
                      message: "종료 시간을 입력해주세요.",
                    },
                  })}
                />
              </div>
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
                  <input
                    type="hidden"
                    {...register("participatingDays", {
                      required: {
                        value: true,
                        message: "요일을 선택해주세요.",
                      },
                    })}
                  />
                  {selectedDays.map((item, index) => (
                    <div
                      key={index}
                      className={addClassNames(
                        "flex items-center justify-center p-1 rounded-full size-6 ",
                        item === SelectedStatus.SELECTED
                          ? "text-habit-green bg-[#E0E9E1]"
                          : "bg-white"
                      )}
                      onClick={() => handleSelectedDaysChange(index)}
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

          <Button text="챌린지 생성" />
          {/* <button className="py-2 text-sm text-white bg-habit-green rounded-2xl font-extralight">
            챌린지 생성
          </button> */}
        </div>
      </form>
    </Layout>
  );
}

export default Page;
