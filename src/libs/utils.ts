import axios from "axios";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

// return은 "hogkim jkwak surlee"가 된다.
export function addClassNames(...classnames: string[]) {
  return classnames.join(" ");
}

// "/"로 나눈 뒤 마지막 세그먼트를 없애주는 함수.
// usePathname으로 마지막세그먼트를 교체하고 싶을 때 사용. 특히 Link에서 href를 다룰 때.
export function getParentPath(pathname: string) {
  const pathSegments = pathname.split("/");
  pathSegments.pop();
  return pathSegments.join("/");
}

export const calculateTimeRemaining = (startDate: string, endDate: string) => {
  const currentDate = new Date();
  const challengeStartDate = new Date(startDate);
  const challengeEndDate = new Date(endDate);

  if (currentDate < challengeStartDate) {
    const daysRemaining = differenceInDays(challengeStartDate, currentDate);
    const hoursRemaining = differenceInHours(challengeStartDate, currentDate);
    const minutesRemaining = differenceInMinutes(
      challengeStartDate,
      currentDate
    );

    if (daysRemaining > 0) {
      return `시작까지 ${daysRemaining}일 남음`;
    } else if (hoursRemaining > 0) {
      return `시작까지 약 ${hoursRemaining}시간 남음`;
    } else if (minutesRemaining > 0) {
      return `시작까지 약 ${minutesRemaining}분 남음`;
    } else {
      return `시작까지 1분 미만 남음`;
    }
  }

  if (currentDate >= challengeStartDate && currentDate <= challengeEndDate) {
    const daysRemaining = differenceInDays(challengeEndDate, currentDate);
    const hoursRemaining = differenceInHours(challengeEndDate, currentDate);
    const minutesRemaining = differenceInMinutes(challengeEndDate, currentDate);

    if (daysRemaining > 0) {
      return `종료까지 ${daysRemaining}일 남음`;
    } else if (hoursRemaining > 0) {
      return `종료까지 약 ${hoursRemaining}시간 남음`;
    } else if (minutesRemaining > 0) {
      return `종료까지 약 ${minutesRemaining}분 남음`;
    } else {
      return `종료까지 1분 미만 남음`;
    }
  }

  if (currentDate > challengeEndDate) {
    return "챌린지가 종료됨.";
  }

  return "알 수 없는 상태";
};

// 게시물등에서 사용하는 시간 함수. (몇 일 전으로 표기 해줌.)
export function formatToTimeAgo(date: string): string {
  const SEC = 1000;
  const MIN = SEC * 60;
  const HOUR = MIN * 60;
  const DAY = HOUR * 24;

  const time = new Date(date).getTime();
  const kstTime = new Date(time + 9 * HOUR).getTime();
  const now = new Date().getTime();
  const diff = kstTime - now;

  const formatter = new Intl.RelativeTimeFormat("ko");
  if (-diff <= MIN) {
    return formatter.format(Math.round(diff / SEC), "seconds");
  } else if (-diff <= HOUR) {
    return formatter.format(Math.round(diff / MIN), "minutes");
  } else if (-diff <= DAY) {
    return formatter.format(Math.round(diff / HOUR), "hours");
  } else if (-diff <= DAY * 7) {
    return formatter.format(Math.round(diff / DAY), "days");
  } else {
    return format(new Date(time), "yyyy.MM.dd HH:mm");
  }
}

export function arrayToFileList(filesArray: File[]) {
  const dataTransfer = new DataTransfer();
  filesArray.forEach((file) => {
    dataTransfer.items.add(file);
  });
  return dataTransfer.files;
}

export async function urlToFileWithAxios(
  url: string,
  filename: string
): Promise<File> {
  const response = await axios.get(url, { responseType: "blob" });
  const data = response.data;
  return new File([data], filename, { type: data.type });
}
