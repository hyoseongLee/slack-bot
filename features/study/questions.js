const questions = [
  {
    category: "cs",
    list: [
      "객체 지향 프로그래밍에 대해 설명해 주세요.",
      "프로세스와 스레드의 차이에 대해 설명해 주세요.",
      "멀티 프로세스와 멀티 스레드의 차이에 대해 설명해 주세요.",
      "Stack과 Queue의 차이에 대해 설명해 주세요.",
      "List, Map, Set의 차이점을 설명해 주세요.",
      "라이브러리와 프레임워크의 차이점을 설명해 주세요.",
    ],
  },
  {
    category: "JavaScript",
    list: [
      "Sync와 Async의 차이점을 설명해 주세요.",
      "Blocking과 Non-Blocking의 차이를 설명해 주세요.",
      "콜백함수에 대해 설명해 주세요.",
      "콜백지옥의 의미와 콜백지옥을 해결하는 방법을 설명해 주세요.",
      "Event loop에 대해 설명해 주세요.",
      "Promise와 Async, Await의 차이를 설명해 주세요.",
      "map과 forEach의 차이를 설명해 주세요.",
      "var, let, const의 차이를 설명해 주세요.",
      "메서드 체이닝에 대해 설명해 주세요.",
      "일반 함수와 화살표 함수의 차이",
      "this의 의미를 설명해 주세요.",
      "함수 선언형과 함수 표현식의 차이를 설명해 주세요.",
      "호이스팅에 대해 설명해 주세요.",
      "이벤트 버블링과 이벤트 캡처링에 대해 설명해 주세요.",
      "이벤트 전파와 이벤트 위임에 대해 설명해 주세요.",
      "클로저에 대해 설명해 주세요.",
      "렉시컬 스코프에 대해 설명해 주세요.",
      "렉시컬 환경에 대해 설명해 주세요.",
      "실행 컨텍스트에 대해 설명해 주세요.",
      "스코프와 스코프 체인에 대해 설명해주세요.",
      "프로토타입과 프로토타입 체인에 대해 설명해 주세요.",
      "깊은 복사와 얕은 복사의 차이점을 설명해 주세요.",
      "구조 분해 할당(destructuring) 대해 설명해 주세요.",
      "spread 문법과 rest 문법의 차이에 대해 설명해 주세요.",
      "ES6에서 생긴 큰 변화들에 대해 설명해 주세요.",
      "Ajax에 대해 설명해 주세요.",
      "import와 require의 차이점에 대해 설명해 주세요.",
      "npm에 대해 설명해 주세요.",
      "package.json과 package-lock.json의 역할에 대해 설명해 주세요.",
      "typescript를 쓰는 이유에 대해 설명해 주세요.",
      "null, undefined, undeclared, NaN에 대해 설명해 주세요.",
      "자바스크립트 데이터 타입에 대해 설명해 주세요.",
      "mutable과 immutable에 대해 설명해 주세요.",
      "throttle과 debounce에 대해 설명해 주세요.",
      "iterable, iterator, generator에 대해 설명해 주세요.",
      "자바스크립트 동작 원리에 대해 설명해 주세요.",
    ],
  },
  {
    category: "React",
    list: [
      "DOM에 대해 설명해 주세요.",
      "Virtual DOM에 대해 설명해 주세요.",
      "클래스형 컴포넌트와 함수형 컴포넌트의 차이를 설명해 주세요.",
      "React의 장점과 단점을 설명해 주세요.",
      "JSX에 대해 설명해 주세요.",
      "브라우저는 JSX 파일을 읽을 수 있나요?",
      "재조정(Reconciliation) 개념에 대해서 설명해 주세요.",
      "state와 props의 차이를 설명해 주세요.",
      "자식 컴포넌트에서 props를 변경할 수 있나요?",
      "React Hooks에 대해 설명해 주세요.",
      "React Lifecycle에 대해 설명해 주세요.",
      "useState에 대해 설명해 주세요.",
      "useEffect에 대해 설명해 주세요.",
      "useEffect와 useLayoutEffect의 차이 대해 설명해 주세요.",
      "state를 직접 변경하지 않고 setState를 사용하는 이유를 설명해 주세요.",
      "React rendering 성능을 향상하기 위한 방법들을 설명해 주세요.",
      "Props drilling의 개념과 Props drilling을 피하는 방법에 대해 설명해 주세요.",
      "전역 상태 관리 방법에 대해 설명해 주세요.",
    ],
  },
  {
    category: "CS",
    list: [
      "Frontend\nDNS에 대해 설명해 주세요.",
      "브라우저 주소창에 www.google.com을 입력하면 발생하는 일을 설명해 주세요.",
      "브라우저 렌더링 과정을 설명해 주세요.",
      "URI과 URL의 차이",
      "RESTful API에 대해 설명해 주세요.",
      "Webpack, Babel, Polyfill에 대해 설명해 주세요.",
      "SPA, CSR, SSR의 차이를 설명해 주세요.",
      "CORS가 무엇이며, 해결하기 위한 방법에 대해 설명해 주세요.",
      "Sementic Markup에 대해 설명해 주세요.",
      "HTML에서의 attributes와 properties의 차이점을 설명해 주세요.",
      "로컬 스토리지, 세션 스토리지, 쿠키에 대해 설명해 주세요.",
      "MVC, MVVM 패턴에 대해 설명해 주세요.",
      "HTTP와 HTTPS의 차이점을 설명해 주세요.",
      "페이지 로드 시간을 줄이는 방법들에 대해서 설명해 주세요.",
      "테스트 코드에 대해 설명해 주세요.",
      "웹 서비스 배포 시스템 구축 경험이 있으신가요?",
      "CI/CD에 대해 설명해 주세요.",
    ],
  },
  {
    category: "기타",
    list: [
      "자기소개 부탁드립니다.",
      "회사 지원 동기가 어떻게 되시나요.",
      "프론트엔드 포지션을 선택한 이유가 어떻게 되시나요?",
      "최근에 경험했던 기억에 남는 에러에 대해 말씀해주세요.",
      "요즘 공부하시고 있는 것에 대해 말씀해주세요.",
      "새로운 기술을 습득하기 위해 어떠한 방식으로 연구하시나요?",
      "협업을 하면서 갈등이 생겼던 경험이 있으신가요?",
      "개발 도중에 발생하는 에러에 대해 보통 어떻게 대처하시나요?",
    ],
  },
];

const getRandomQuestion = () => {
  const randomCategoryIndex = Math.floor(Math.random() * questions.length);
  const categoryObj = questions[randomCategoryIndex];

  const randomQuestionIndex = Math.floor(
    Math.random() * categoryObj.list.length
  );
  const question = categoryObj.list[randomQuestionIndex];

  return {
    category: categoryObj.category,
    question: question,
  };
};

module.exports = { getRandomQuestion };
