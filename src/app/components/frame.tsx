"use client";

import { getId } from "@/libs/jwt";
import { addClassNames } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default Frame;
