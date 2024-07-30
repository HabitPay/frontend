import ChallengeCard from "./challengeCard";
import { ChallengeStatesEnum } from "@/types/enums";
import { IChallengeEnrolledList } from "@/types/challenge";

interface IChallengesProps {
  challenges: IChallengeEnrolledList;
  challengeState: ChallengeStatesEnum;
}

function Challenges({ challenges, challengeState }: IChallengesProps) {
  return (
    <>
      {challengeState == ChallengeStatesEnum.InProgress &&
        challenges.inProgress.length === 0 && (
          <div className="flex flex-col justify-center pt-6">
            <span>참여 중인 챌린지가 없습니다.</span>
            <span>새로운 챌린지에 참여해보세요!</span>
          </div>
        )}

      {challengeState == ChallengeStatesEnum.InProgress &&
        challenges.inProgress.length > 0 && (
          <ChallengeCard
            items={challenges.inProgress}
            challengeState={challengeState}
          />
        )}

      {challengeState == ChallengeStatesEnum.Scheduled &&
        challenges.scheduled.length === 0 && (
          <div className="flex flex-col justify-center pt-6">
            <span>진행 예정인 챌린지가 없습니다.</span>
            <span>새로운 챌린지에 참여해보세요!</span>
          </div>
        )}

      {challengeState == ChallengeStatesEnum.Scheduled &&
        challenges.scheduled.length > 0 && (
          <ChallengeCard
            items={challenges.scheduled}
            challengeState={challengeState}
          />
        )}

      {challengeState == ChallengeStatesEnum.Completed &&
        challenges.completed.length === 0 && (
          <div className="flex flex-col justify-center pt-6">
            <span>종료된 챌린지가 없습니다.</span>
          </div>
        )}

      {challengeState == ChallengeStatesEnum.Completed && (
        <ChallengeCard
          items={challenges.completed}
          challengeState={challengeState}
        />
      )}
    </>
  );
}

export default Challenges;
