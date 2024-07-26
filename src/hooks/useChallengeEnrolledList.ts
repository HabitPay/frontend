import { useState, useEffect } from "react";

import { isAfter, isBefore } from "date-fns";

import { fetchEnrolledChallenges } from "@/api/challenge";
import { IChallengeEnrolledList } from "@/types/challenge";
import { IChallengeEnrolledListItemDto } from "@/types/challenge";
import { ChallengeStatesEnum } from "@/types/enums";

const categorizeChallenge = (
  challenge: IChallengeEnrolledListItemDto,
  today: Date
): ChallengeStatesEnum => {
  if (isBefore(today, new Date(challenge.startDate))) {
    return ChallengeStatesEnum.Scheduled;
  }
  if (isAfter(today, new Date(challenge.endDate))) {
    // TODO: 챌린지 중도 포기한 경우도 추가하기
    return ChallengeStatesEnum.Completed;
  }
  return ChallengeStatesEnum.InProgress;
};

export const useChallengeEnrolledList = () => {
  const [challengeEnrolledList, setChallengeEnrolledList] =
    useState<IChallengeEnrolledList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEnrolledChallenges();
        if (data) {
          const categorizedData: IChallengeEnrolledList = {
            inProgress: [],
            scheduled: [],
            completed: [],
          };
          const today = new Date();

          data.forEach((challenge) => {
            const category: ChallengeStatesEnum = categorizeChallenge(
              challenge,
              today
            );
            switch (category) {
              case ChallengeStatesEnum.InProgress:
                categorizedData.inProgress.push(challenge);
                break;
              case ChallengeStatesEnum.Scheduled:
                categorizedData.scheduled.push(challenge);
                break;
              case ChallengeStatesEnum.Completed:
                categorizedData.completed.push(challenge);
                break;
              default:
                break;
            }
          });

          setChallengeEnrolledList(categorizedData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { challengeEnrolledList, isLoading, error };
};
