// ex) [1, 2, 3].join() => "123"
// ex) [1, 2, 3].join("/") => "1/2/3"
// 따라서 여기서는 무엇을 하는 것이냐면
// ...는 rest파라미터라고하며 string인자들을 받는다 cls("hogkim", "jkwak") 라고해보자
// 그러면 classnames는 ["hogkim", "jkwak"]가 되고
// return은 "hogkim jkwak surlee"가 된다.
export function addClassNames(...classnames: string[]) {
  return classnames.join(" ");
}
