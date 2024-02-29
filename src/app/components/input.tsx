import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  register: UseFormRegisterReturn;
}

export default function Input({ register, type }: InputProps) {
  return (
    <div>
      <div className="rounded-md relative flex  items-center shadow-sm">
        <input
          id={register?.name}
          {...register}
          type={type}
          className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
    </div>
  );
}
