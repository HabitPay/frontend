import { addClassNames } from "@/libs/utils";
import Link from "next/link";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface IMenuProps {
  challengeId: string;
  currentPage: "챌린지 메인" | "참여 기록";
}

const Menu = ({ challengeId, currentPage }: IMenuProps) => {
  return (
    <div className="flex pb-3 space-x-5 text-xl border-b-2 border-habit-lightgray z-[60]">
      <Link href={`/challenges/${challengeId}/main`}>
        <span className={currentPage === "참여 기록" ? "text-habit-gray" : ""}>
          챌린지 메인
        </span>
      </Link>
      <Link href={`/challenges/${challengeId}/participation`}>
        <span
          className={currentPage === "챌린지 메인" ? "text-habit-gray" : ""}
        >
          참여 기록
        </span>
      </Link>
    </div>
  );
};

export default Menu;
