import apiManager from "@/api/apiManager";
import { IMemberProfileDto } from "@/types/member";

export const fetchMemberProfile = async (
): Promise<IMemberProfileDto | null> => {
  try {
    const res = await apiManager.get(`/member`);
    const { data }: { data: IMemberProfileDto } = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
