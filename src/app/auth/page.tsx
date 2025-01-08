"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getId } from "@/libs/jwt";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const myId = getId();

  useEffect(() => {
    const accessToken: string | null = searchParams.get("accessToken");
    // 소셜 로그인을 통해 들어오지 않고 주소로 직접 접근하는 경우 로그인을 하도록 이동
    if (accessToken === null) {
      router.push("/");
    } else {
      localStorage.setItem("accessToken", accessToken);
      router.push(`/${myId}/challenge`);
    }
  }, [router, searchParams, myId]);

  return <></>;
}

export default Page;
