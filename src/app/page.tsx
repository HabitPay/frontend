"use client";

import GoogleCustomButton from "./components/googleCustomButton";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen space-y-8 bg-inherit">
        <div className="flex flex-col items-center">
          <span className="font-light ">성공하는 습관 만들기</span>
          <span className="text-lg font-bold ">HabitPay</span>
        </div>
        <div className="flex flex-col space-y-4">
          <GoogleCustomButton />
        </div>
      </div>
    </>
  );
};

export default Page;
