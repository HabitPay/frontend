import apiManager from "@/api/apiManager";
import {
  IChallengeDetailsDto,
  IChallengeEnrolledListItemDto,
} from "@/types/challenge";

export const fetchChallengeDetails = async (
  id: string
): Promise<IChallengeDetailsDto | null> => {
  try {
    const res = await apiManager.get(`/challenges/${id}`);
    const { data }: { data: IChallengeDetailsDto } = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchEnrolledChallenges = async (): Promise<
  IChallengeEnrolledListItemDto[] | null
> => {
  try {
    const res = await apiManager.get(`/challenges/me`);
    const { data }: { data: IChallengeEnrolledListItemDto[] } = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
