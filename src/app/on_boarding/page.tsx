"use client";

import { error } from "console";
import { useForm } from "react-hook-form";

interface IForm {
  nickname: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data);
  };
  return (
    <>
      <div>
        <h2>사용할 닉네임을 입력해주세요</h2>
        <span>입력한 정보는 이후에 언제든 수정가능합니다.</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
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
        <span>{errors?.nickname?.message as string}</span>
        <span>
          닉네임은 최소 2자부터 최대 15자까지 가능합니다.(특수문자 불가)
        </span>
        <button>제출</button>
      </form>
    </>
  );
};

export default Page;
