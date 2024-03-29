"use client";

import GoogleCustomButton from "./components/googleCustomButton";

const Page = () => {
  return (
    <>
      <div className=" bg-inherit h-screen flex flex-col justify-center items-center  space-y-8">
        <div className="flex flex-col items-center">
          <span className=" font-light">성공하는 습관 만들기</span>
          <span className=" font-bold text-lg">HabitPay</span>
        </div>
        <div className="flex flex-col space-y-4">
          <GoogleCustomButton />
        </div>
      </div>
    </>
  );
};

export default Page;
