import { useState, useEffect } from "react";

import apiManager from "@api/apiManager";
import { IChallengeDetailsDto } from "@/types/challenge";

export const useChallengeDetails = (id: string) => {
  const [challengeDetails, setChallengeDetails] =
    useState<IChallengeDetailsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiManager(`/challenge/${id}`);
        setChallengeDetails(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { challengeDetails, isLoading, error };
};
