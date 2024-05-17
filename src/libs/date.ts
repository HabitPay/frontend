import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const TIME_ZONE = "Asia/Seoul";

export const convertKstDate = (date: string, time: string): string => {
  const combinedString: string = `${date} ${time}`;
  const kstDate: Date = toZonedTime(new Date(combinedString), TIME_ZONE);
  return format(kstDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
};
