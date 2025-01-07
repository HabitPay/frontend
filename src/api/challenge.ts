import apiManager from "@/api/apiManager";
import {
  IChallengeDetailsDto,
  IChallengeEnrolledListItemDto,
} from "@/types/challenge";

export const fetchChallengeDetails = async (
  id: string
): Promise<IChallengeDetailsDto> => {
  const res = await apiManager.get(`/challenges/${id}`);
  const { data }: { data: IChallengeDetailsDto } = res.data;
  console.log(data);
  return data;
};

export const fetchEnrolledChallenges = async (
  userId?: string
): Promise<IChallengeEnrolledListItemDto[]> => {
  const endpoint = userId ? `/challenges/members/${userId}` : `/challenges/me`;
  const res = await apiManager.get(endpoint);
  const { data }: { data: IChallengeEnrolledListItemDto[] } = res.data;
  console.log(data);
  return data;
};
