import React from "react";
import Link from "next/link";

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({
  children,
  href,
}: FloatingButtonProps) {
  return (
    <Link href={href} legacyBehavior>
      <a className="fixed cursor-pointer bottom-24 right-5 bg-habit-green rounded-full p-3 text-white shadow-xl">
        {children}
      </a>
    </Link>
  );
}
