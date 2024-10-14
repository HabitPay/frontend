import { useState, useEffect } from "react";

import { IChallengeDetailsDto } from "@/types/challenge";
import { SelectedStatus } from "@/types/enums";
import { fetchChallengeDetails } from "../api/challenge";
import Error from "next/error";

export const calculateSelectedDays = (selectedDays: number[], days: number) => {
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
        const data = await fetchChallengeDetails(id);

        if (data) {
          setChallengeDetails(data);
          setSelectedDays(
            calculateSelectedDays(selectedDays, data.participatingDays)
          );
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, selectedDays]);

  return { challengeDetails, selectedDays, isLoading, error };
};
