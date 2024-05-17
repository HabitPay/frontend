"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { StatusCodes } from "http-status-codes";

import apiManager from "@api/apiManager";
import Layout from "@app/components/layout";
import { AxiosError } from "axios";

interface IForm {
  nickname: string;
  number: number;
}

export interface ITokenData{
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType:string;
}

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: IForm) => {
    console.log(data);
    const { nickname } = data;
    try {
      const res = await apiManager.post<ITokenData>("/member", {
        nickname,
      });
      if (res.status === StatusCodes.CREATED) {
        const { accessToken, refreshToken, tokenType } = res.data;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("tokenType", tokenType);
        router.push("/my_challenge");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const accessToken: string | null = searchParams.get("accessToken");

    // 소셜 로그인을 통해 들어오지 않고 주소로 직접 접근하는 경우 로그인을 하도록 이동
    if (accessToken === null) {
      router.push("/");
    } else {
      sessionStorage.setItem("accessToken", accessToken);
      router.replace("/onboarding");
    }
  }, []);

  return (
    <Layout canGoBack>
      <div className="mx-5">
        <div className="mt-4 mb-4">
          <h2 className=" text-xl font-bold">사용할 닉네임을 입력해주세요</h2>
          <span className="text-sm">
            입력한 정보는 이후에 언제든 수정가능합니다.
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              className="bg-habit-background border-b-2 border-slate-200 focus:outline-none focus:border-green-500"
              type="text"
              placeholder="닉네임을 입력해주세요."
              {...register("nickname", {
                required: { value: true, message: "닉네임을 입력해주세요." },
                maxLength: {
                  value: 15,
                  message: "닉네임이 너무 깁니다.",
                },
                minLength: {
                  value: 2,
                  message: "닉네임이 너무 짧습니다.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9가-힣]*$/,
                  message: "특수문자 및 공백은 포함 될 수 없습니다.",
                },
              })}
            />
            <span className="mt-1 text-red-500 text-sm">
              {errors?.nickname?.message as string}
            </span>
            <span className="text-sm mt-4 mb-24">
              닉네임은 최소 2자부터 최대 15자까지 가능합니다.(특수문자 불가)
            </span>
          </div>
          <button className=" py-2 w-full text-sm font-medium bg-habit-green hover:bg-green-600 text-white border border-transparent rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none relative bottom-0">
            다음
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Page;
