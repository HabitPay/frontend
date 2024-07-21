"use client";

import { addClassNames } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface LayoutProps {
  title?: string;
  isWhiteTitle?: boolean;
  isBorder?: boolean;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  isWhiteTitle,
  isBorder,
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const currentPath = usePathname();
  console.log(currentPath);
  const onClick = () => {
    // 여기 if문이 보기가 싫음. 깔끔한 코드 추천받습니다.
    if (currentPath === "/onboarding") {
      console.log("clicked");
      router.push("/");
    } else {
      router.back();
    }
  };
  return (
    <div className="max-w-xl mx-auto">
      <div
        className={addClassNames(
          "z-50 fixed top-0 flex items-center justify-center w-full h-12 max-w-xl px-10 text-lg font-medium text-gray-800",
          isWhiteTitle ? "bg-white" : "bg-habit-background",
          isBorder ? "border-b border-gray-300" : ""
        )}
      >
        {canGoBack ? (
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
        ) : null}
        {title ? (
          <span className={addClassNames(canGoBack ? "mx-auto" : "", "")}>
            {title}
          </span>
        ) : null}
      </div>
      <div className={addClassNames("pt-12", hasTabBar ? "pb-20" : "")}>
        {children}
      </div>
      {hasTabBar ? (
        <nav className="fixed bottom-0 z-50 flex justify-center w-full max-w-xl gap-12 py-4 text-xs text-gray-700 bg-white border-t">
          <Link href="/challenges/my_challenge">
            <div
              className={addClassNames(
                "flex flex-col items-center space-y-2 p-3",
                currentPath === "/challenges/my_challenge"
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
          <Link href="/notice">
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
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
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
}
