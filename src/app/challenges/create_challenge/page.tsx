"use client";

import { useState } from "react";

import { format, differenceInDays, set, addDays } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { ko } from "date-fns/locale";
import { addYears } from "date-fns";
import { NumericFormat } from "react-number-format";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { addClassNames } from "@libs/utils";
import Layout from "@app/components/layout";
import Label from "../components/label";
import Button from "@app/components/button";
import { convertKstDate } from "@libs/date";
import apiManager from "@api/apiManager";
import { Days, SelectedStatus } from "@/types/enums";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const [selectedDays, setSelectedDays] = useState<number[]>(
    new Array(7).fill(SelectedStatus.NOT_SELECTED)
  );

  const [challengeDate, setChallengeDate] = useState<Range[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);

  const onSubmitWithValidation = async (form: IChallengeForm) => {
    // startDate와 endDate를 설정 안해도 여기로 들어오고 오류가 남.
    try {
      const data: IChallengeDto = {
        title: form.title,
        description: form.description,
        participatingDays: form.participatingDays,
        feePerAbsence: form.feePerAbsence,
        startDate: convertKstDate(form.startDate, form.startTime),
        endDate: convertKstDate(form.endDate, form.endTime),
      };
      const res = await apiManager.post("/challenges", data);
      console.log(res);
      // res.data로 메세지를 받을 수 있음. 사용자에게 표시되도록. id도 추출해서 redirect
      // router.push(`/challenges/${res.data}/main`);
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
      <form
        onSubmit={handleSubmit(onSubmitWithValidation)}
        className="flex flex-col px-10 space-y-4 mb-10"
      >
        <div className="flex flex-col space-y-3">
          <Label id="Challenge_name" title="챌린지 이름" isRequired />
          <input
            className="px-3 py-1 text-sm rounded-md input-focus"
            type="text"
            placeholder="챌린지 이름"
            id="Challenge_name"
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
          <Label id="Challenge_explanation" title="챌린지 설명" isRequired />
          <textarea
            className="w-full p-3 mt-1 text-sm border-transparent rounded-md input-focus"
            placeholder="챌린지 설명을 입력해주세요."
            rows={4}
            id="Challenge_explanation"
            {...register("description", {
              required: {
                value: true,
                message: "챌린지 설명을 입력해주세요.",
              },
            })}
          />
        </div>
        <div className="flex flex-col">
          <Label title="챌린지 기간" isRequired id="Challenge_period" />
          <div className="mt-1 mb-4" id="Challenge_period">
            <DateRange
              className="rounded-md"
              locale={ko}
              onChange={async (item) => {
                const { startDate, endDate } = item.selection;

                if (startDate && endDate) {
                  setChallengeDate([item.selection]);
                  setValue("startDate", format(startDate, "yyyy-MM-dd"));
                  setValue("endDate", format(endDate, "yyyy-MM-dd"));
                } else {
                  console.error("Invalid date selection", item.selection);
                }
                // setChallengeDate([item.selection]);
                // setValue(
                //   "startDate",
                //   format(item.selection.startDate!, "yyyy-MM-dd")
                // );
                // setValue(
                //   "endDate",
                //   format(item.selection.endDate!, "yyyy-MM-dd")
                // );
              }}
              // showSelectionPreview={true}
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
              <Label
                title="챌린지 시작 시간"
                isRequired
                id="Challenge_start_time"
              />
              {control._formValues.startDate && (
                <h3 className="text-neutral-500">{getValues("startDate")}</h3>
              )}
              <input
                type="time"
                className="px-2 py-1 mt-3 text-sm font-light rounded-md input-focus"
                id="Challenge_start_time"
                {...register("startTime", {
                  required: {
                    value: true,
                    message: "시작 시간을 입력해주세요.",
                  },
                })}
              />
            </div>
            <div className="flex flex-col">
              <Label
                title="챌린지 종료 시간"
                isRequired
                id="Challenge_end_time"
              />
              {control._formValues.endDate && (
                <h3 className="text-neutral-500">{getValues("endDate")}</h3>
              )}
              <input
                type="time"
                className="px-2 py-1 mt-3 text-sm font-light rounded-md input-focus"
                id="Challenge_end_time"
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
            <Label title="챌린지 요일 선택" isRequired id="Challenge_days" />
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
            <Label title="벌금 설정" isRequired id="Set_fees" />
            <div className="mt-2 mb-3 text-sm text-habit-gray">
              1회 실패 당 부과되는 벌금을 설정해주세요.
            </div>
            <div className="flex flex-row justify-between mb-4 *:rounded-md *:px-2 *:py-1 *:text-sm">
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
                className="h-10 px-4 py-2 text-sm bg-habit-lightgray rounded-xl"
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
      </form>
    </Layout>
  );
}

export default Page;
