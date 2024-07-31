import { Dispatch, SetStateAction } from "react";
import ChallengesButton from "./challengeStateButton";
import { ChallengeStatesEnum } from "@/types/enums";

interface ChallengesButtonProps {
  challengeStateSelection: string;
  setter: Dispatch<SetStateAction<ChallengeStatesEnum>>;
}

function ChallengeStateSelector({
  challengeStateSelection,
  setter,
}: ChallengesButtonProps) {
  return (
    <>
      <ChallengesButton
        title={ChallengeStatesEnum.InProgress}
        isActivated={challengeStateSelection === ChallengeStatesEnum.InProgress}
        onClick={() => setter(ChallengeStatesEnum.InProgress)}
      />
      <ChallengesButton
        title={ChallengeStatesEnum.Scheduled}
        isActivated={challengeStateSelection === ChallengeStatesEnum.Scheduled}
        onClick={() => setter(ChallengeStatesEnum.Scheduled)}
      />
      <ChallengesButton
        title={ChallengeStatesEnum.Completed}
        isActivated={challengeStateSelection === ChallengeStatesEnum.Completed}
        onClick={() => setter(ChallengeStatesEnum.Completed)}
      />
    </>
  );
}

export default ChallengeStateSelector;
