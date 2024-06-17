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
