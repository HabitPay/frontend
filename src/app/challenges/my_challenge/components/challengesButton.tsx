import { addClassNames } from "@/libs/utils";
import { Dispatch } from "react";

interface IChallengesButton {
  title: string;
  isActivated: boolean;
  onClick: () => void;
}

const ChallengesButton = ({
  title,
  isActivated,
  onClick,
}: IChallengesButton) => {
  return (
    <button
      className={addClassNames(
        "px-3 py-1 border-2 rounded-xl",
        isActivated
          ? "bg-white text-habit-green border-habit-green"
          : "bg-habit-lightgray text-black border-habit-lightgray "
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ChallengesButton;
