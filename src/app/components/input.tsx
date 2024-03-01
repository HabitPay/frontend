import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  register: UseFormRegisterReturn;
}

export default function Input({ register, type }: InputProps) {
  return (
    <input
      id={register?.name}
      {...register}
      type={type}
      className="appearance-none w-full px-3 py-2 rounded-2xl  placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
    />
  );
}
