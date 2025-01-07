import { useState, useEffect } from "react";

import { IProfileDTO } from "@/types/member";
import { fetchMemberProfile } from "@/api/member";

export const useMemberProfile = (userId?: string) => {
  const [memberProfile, setMemberProfile] = useState<IProfileDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMemberProfile();
        if (data) {
          setMemberProfile(data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { memberProfile, isLoading, error };
};
