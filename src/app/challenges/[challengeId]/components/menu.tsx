import Link from "next/link";

export interface IMenuProps {
  challengeId: string;
  currentPage: "챌린지 메인" | "참여 기록";
  isMemberEnrolledInChallenge: boolean;
}

const Menu = ({
  challengeId,
  currentPage,
  isMemberEnrolledInChallenge,
}: IMenuProps) => {
  return (
    <div className="flex pb-3 space-x-5 text-xl border-b-2 border-habit-lightgray">
      <Link href={`/challenges/${challengeId}/main`}>
        <span className={currentPage === "참여 기록" ? "text-habit-gray" : ""}>
          챌린지 메인
        </span>
      </Link>
      {isMemberEnrolledInChallenge && (
        <Link href={`/challenges/${challengeId}/participation`}>
          <span
            className={currentPage === "챌린지 메인" ? "text-habit-gray" : ""}
          >
            참여 기록
          </span>
        </Link>
      )}
    </div>
  );
};

export default Menu;
