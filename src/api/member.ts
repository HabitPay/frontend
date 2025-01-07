import apiManager from "@/api/apiManager";
import { IProfileDTO } from "@/types/member";

export const fetchMemberProfile = async (
  userId?: string
): Promise<IProfileDTO | null> => {
  try {
    const endpoint = userId ? `/member/${userId}` : `/member`;
    const res = await apiManager.get(endpoint);
    const { data }: { data: IProfileDTO } = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
