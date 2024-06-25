// ex) [1, 2, 3].join() => "123"
// ex) [1, 2, 3].join("/") => "1/2/3"
// 따라서 여기서는 무엇을 하는 것이냐면
// ...는 rest파라미터라고하며 string인자들을 받는다 cls("hogkim", "jkwak") 라고해보자
// 그러면 classnames는 ["hogkim", "jkwak"]가 되고
// return은 "hogkim jkwak surlee"가 된다.
export function addClassNames(...classnames: string[]) {
  return classnames.join(" ");
}

// "/"로 나눈 뒤 마지막 세그먼트를 없애주는 함수.
// usePathname으로 마지막세그먼트를 교체하고 싶을 때 사용. 특히 Link에서 href를 다룰 때.
export function getParentPath(pathname: string) {
  const pathSegments = pathname.split("/");
  pathSegments.pop(); // Remove the last segment
  return pathSegments.join("/");
}

// 게시물등에서 사용하는 시간 함수. (몇 일 전으로 표기 해줌.)
export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}
