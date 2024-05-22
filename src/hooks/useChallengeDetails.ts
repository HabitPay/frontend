import { useState, useEffect } from "react";

import apiManager from "@api/apiManager";
import { IChallengeDetailsDto } from "@/types/challenge";
import { SelectedStatus } from "@/types/enums";

const calculateSelectedDays = (selectedDays: number[], days: number) => {
  selectedDays.forEach((_, idx) => {
    if (days & (1 << (6 - idx))) {
      selectedDays[idx] = SelectedStatus.SELECTED;
    }
  });
  return selectedDays;
};

export const useChallengeDetails = (id: string) => {
  const [challengeDetails, setChallengeDetails] =
    useState<IChallengeDetailsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>(
    new Array(7).fill(SelectedStatus.NOT_SELECTED)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiManager(`/challenge/${id}`);
        setChallengeDetails(res.data);
        setSelectedDays(
          calculateSelectedDays(selectedDays, res.data.participatingDays)
        );
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { challengeDetails, selectedDays, isLoading, error };
};
