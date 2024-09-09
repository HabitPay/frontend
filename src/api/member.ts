import apiManager from "@/api/apiManager";
import { IProfileDTO } from "@/types/member";

export const fetchMemberProfile = async (): Promise<IProfileDTO | null> => {
  try {
    const res = await apiManager.get(`/member`);
    const { data }: { data: IProfileDTO } = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
