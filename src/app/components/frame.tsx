"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getId } from "@/libs/jwt";
import { addClassNames } from "@/libs/utils";
import ChevronLeftIcon from "./icons/chevronLeftIcon";
import HomeIcon from "./icons/homeIcon";
import BarsIcon from "./icons/barsIcon";
import UserIcon from "./icons/userIcon";

interface LayoutProps {
  title?: string;
  isWhiteTitle?: boolean;
  isBorder?: boolean;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const Frame = ({
  title,
  isWhiteTitle,
  isBorder,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) => {
  const router = useRouter();
  const currentPath = usePathname();
  const [myId, setMyId] = useState<string | null | undefined>();
  const onClick = () => {
    if (currentPath === "/onboarding") {
      router.push("/");
    } else {
      router.back();
    }
  };
  useEffect(() => {
    setMyId(getId());
  }, []);
  return (
    <div className={`min-h-screen max-w-xl mx-auto shadow-xl h-auto`}>
      <div
        className={`z-50 fixed top-0 flex items-center justify-center w-full h-12 max-w-xl px-10 text-lg font-medium text-gray-800 ${
          isWhiteTitle ? "bg-white" : "bg-habit-background"
        } ${isBorder && "border-b border-gray-300"}`}
      >
        {canGoBack && (
          <button onClick={onClick} className="absolute left-4">
            <ChevronLeftIcon className="size-7" />
          </button>
        )}
        {title && (
          <span className={addClassNames(canGoBack ? "mx-auto" : "", "")}>
            {title}
          </span>
        )}
      </div>
      <div className={`pt-12 ${hasTabBar && "pb-20"}`}>{children}</div>
      {hasTabBar ? (
        <nav className="fixed bottom-0 z-50 flex justify-center w-full max-w-xl gap-12 py-4 text-xs text-gray-700 bg-white border-t">
          <Link href={`/${myId}/challenge`}>
            <div
              className={addClassNames(
                "flex flex-col items-center space-y-2 p-3",
                currentPath === `/${myId}/challenge`
                  ? "bg-[#EFF8F0] rounded-2xl text-habit-green"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <HomeIcon className="size-7" />
            </div>
          </Link>
          <Link href="/challenges/challenge-list">
            <div
              className={addClassNames(
                "flex flex-col items-center space-y-2 p-3",
                currentPath === "/notice"
                  ? "bg-[#EFF8F0] rounded-2xl text-habit-green"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <BarsIcon className="size-7" />
            </div>
          </Link>
          <Link href="/profile">
            <div
              className={addClassNames(
                "flex flex-col items-center space-y-2 p-3",
                currentPath === "/profile"
                  ? "bg-[#EFF8F0] rounded-2xl text-habit-green"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <UserIcon className="size-7" />
            </div>
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default Frame;
