import apiManager from "@/api/apiManager";
import { IProfileDTO } from "@/types/member";

export const fetchMemberProfile = async (
  userId?: string
): Promise<IProfileDTO | null> => {
  try {
    const endpoint = userId ? `/members/${userId}` : `/member`;
    console.log(endpoint);
    const res = await apiManager.get(endpoint);
    const data: IProfileDTO = res.data.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
