import ChallengesButton from "./challengesStatusButton";

interface ChallengesButtonProps {
  challengesState: string;
}

function EnrolledChallengeList({ challengesState }: ChallengesButtonProps) {
  return (
    <>
      <ChallengesButton
        title="진행 중"
        isActivated={challengesState === "In Progress"}
        onClick={() => handleChallengesButtonClick("In Progress")}
      />
      <ChallengesButton
        title="진행 예정"
        isActivated={challengesState === "Scheduled"}
        onClick={() => handleChallengesButtonClick("Scheduled")}
      />
      <ChallengesButton
        title="완료"
        isActivated={challengesState === "Completed"}
        onClick={() => handleChallengesButtonClick("Completed")}
      />
    </>
  );
}

export default EnrolledChallengeList;
