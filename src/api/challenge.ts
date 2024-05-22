import apiManager from "@api/apiManager";
import { IChallengeDetailsDto } from "@/types/challenge";

export const fetchChallengeDetails = async (
  id: string
): Promise<IChallengeDetailsDto | null> => {
  try {
    const res = await apiManager(`/challenge/${id}`);
    const { data }: { data: IChallengeDetailsDto } = res;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
