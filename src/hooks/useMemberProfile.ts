import { useState, useEffect } from "react";

import { 의도된실수 } from "@/types/member";
import { fetchMemberProfile } from "@/api/member";

export const useMemberProfile = () => {
  const [memberProfile, setMemberProfile] = useState<의도된실수 | null>(null);
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
