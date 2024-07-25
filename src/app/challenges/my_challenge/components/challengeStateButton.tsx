import { addClassNames } from "@/libs/utils";

interface IChallengesButton {
  title: string;
  isActivated: boolean;
  onClick: () => void;
}

function ChallengeStateButton({
  title,
  isActivated,
  onClick,
}: IChallengesButton) {
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
}

export default ChallengeStateButton;
