import { useState, useEffect } from "react";

import { fetchEnrolledChallenges } from "@/api/challenge";
import { IChallengeEnrolledListItemDto } from "@/types/challenge";

export const useChallengeEnrolledList = () => {
  const [challengeEnrolledList, setChallengeEnrolledList] = useState<
    IChallengeEnrolledListItemDto[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEnrolledChallenges();
        if (data) {
          setChallengeEnrolledList(data);
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
