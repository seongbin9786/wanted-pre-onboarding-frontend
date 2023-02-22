# 설명 회의

## 1. [로그인, 회원가입]

### 1-1. 이메일, 비밀번호 유효성 검사

단순히 상태값을 여러 개 선언

```tsx
const [email, setEmail] = useState('');
const [emailIsValid, setEmailIsvalid] = useState(false);
const [password, setPassword] = useState('');
const [passwordlIsValid, setPasswordlIsvalid] = useState(false);
const submitAvailable = emailIsValid && passwordlIsValid;

const updateEmail = (newEmail: string) => {
  setEmailIsvalid(newEmail.includes('@'));
  setEmail(newEmail);
};

const updatePassword = (newPassword: string) => {
  setPasswordlIsvalid(newPassword.length >= 8);
  setPassword(newPassword);
};
```

### 1-2. 로그인 완료시 JWT 토큰 로컬 스토리지 저장

Context에서 login, logout 함수를 제공

```tsx
export const LoginContext = createContext(initialState);

export const LoginProvider = ({ children }: React.PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const login = (newAccessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, newAccessToken);
    setAccessToken(newAccessToken);
    setLoggedIn(true);
  };

  const logout = () => {
    setAccessToken('');
    setLoggedIn(false);
    localStorage.removeItem(ACCESS_TOKEN);
  };

  const loadAccessToken = () => {
    const fromLocalStorage = localStorage.getItem(ACCESS_TOKEN);
    if (fromLocalStorage) {
      login(fromLocalStorage);
    }
  };

  useEffect(() => {
    loadAccessToken();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
```

### 1-3. 로그인 여부에 따른 리다이렉팅 구현

페이지마다 상태에 따라 직접 `useNavigate` 사용

```tsx
const navigate = useNavigate();

const redirectToTodoList = () => {
  navigate('/todo');
};

const redirectIfLoggedIn = () => {
  if (loggedIn) {
    redirectToTodoList();
  }
};

const handleLogin = async (email: string, password: string) => {
  const accessToken = await authApi.signInApi({ email, password });
  login(accessToken);
  redirectToTodoList();
};

useEffect(() => {
  redirectIfLoggedIn();
});
```

## 2. [투두 리스트]

### 2-1. 투두 리스트 아이템 상태에 따른 목록 표기

Page 컴포넌트에서 `todos` 배열의 상태를 소유 및 갱신

```tsx
return (
  <li style={ListItemStyle} key={id}>
    <span style={MarkerStyle}>{idx + 1}.</span>
    <TodoListItem
      id={id}
      name={todo}
      checked={isCompleted}
      handleCheck={handleCheckChange}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  </li>
);
```

### 2-2. 투두 리스트 CRUD 기능

(상동) Page 컴포넌트에서 `todos` 배열의 상태를 소유 및 갱신

```tsx
  const [todos, setTodos] = useState<TodoListItemData[]>([]);
  const todoApi = useMemo( /* new TodoApi */ );

  const handleAddNewTodo = useCallback( /* setTodos((todos) => [...todos, createdTodo]); */ );

  const handleCheckChange = useCallback( /* setTodos([...todos]); */ );

  const handleSubmit = useCallback( /* setTodos((todos) => [...todos]); */ );

  const handleDelete = useCallback( /* setTodos((todos) => todos.filter */ );
```

## 3. [기타]

### 3-1. 디자인패턴

(없음)

### 3-2. 폴더구조

| 폴더명 | 역할 |
|--------|------|
| `apis` | API 요청의 목적에 맞게 전처리/후처리를 캡슐화 |
| `components` | 페이지에 소속될 컴포넌트 |
| `constants` | 소스 코드 전반에 퍼져있는 상수값(하드 코딩된 문자열 등을 포함) |
| `contexts` | 앱 전체에서 접근 가능한 상태들 (Context API 사용) |
| `pages` | 라우팅 단위가 되는 컴포넌트. 라우팅에 관련된 기능과 페이지 소속 공유 상태를 소유 |

### 3-2. 이외 자기가 잘했다고 생각하는부분

#### 3-2-1. 간단한 CyPress E2E 테스트

문제의 요구사항을 토대로 자동화된 검증 과정을 구성하는 방법을 통해 구현을 점검하고자 Cypress를 활용하였음. 수동으로 테스트했을 땐 쉽게 각 기능이 구현됐다고 생각했지만, 실제로 `data-testid`를 활용해 테스트하면서 `testid`의 오타 및 누락 등 여러 건의 오류를 잡을 수 있었음.

#### 3-2-3. GitHub Flow, commit message, squash merge

작업은 GitHub Flow 프로세스를 따라 작업하였음(Issue 생성 > 신규 Branch 생성 > PR 생성 > PR 병합).

- ![example-git-branches](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/blob/main/docs/images/example-git-branches.png)
- ![example-issue-body](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/blob/main/docs/images/example-issue-body.png)
- ![example-pr-body](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/blob/main/docs/images/example-pr-body.png)

commit message는 [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)을 따라 작성하였음.

- ![example-git-commit](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/blob/main/docs/images/example-git-commit.png)

main에 병합되는 커밋은 squash merge하여 평가자 입장에서 보기 편하게 남김 ([F-lab 레포 참고](https://github.com/f-lab-edu/online-marketplace/commits/develop)).

- ![example-squash-merge](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/blob/main/docs/images/example-squash-merge.png)

#### 3-2-3. 기능 목록표 작성

과제 평가자 입장에서 쉽게 기능 개발 과정을 확인할 수 있게 기능 목록표 및 Issue, PR을 링크하였음.

| 과제 번호 | 기능명 | Issue | PR |
|----------|--------|-------|----|
| `A0` | 로그인/회원가입 마크업 | [#1](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/1) | [#2](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/2) |
| `A1` | 이메일/비밀번호 유효성 검사 | [#3](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/3) | [#6](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/6) |
| `A2` | 회원가입 후 리다이렉션 | [#4](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/4) | [#6](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/6) |
| `A3` | 로그인 후 리다이렉션, JWT 저장 | [#5](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/5) | [#6](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/6) |
| `A4` | 로그인 여부에 따른 리다이렉션 | [#20](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/2issues/0) | [#29](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/2issues/9) |
| `A5` | 투두 목록 마크업 | [#7](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/7) | [#13](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/13) |
| `A6` | 투두 추가 기능 구현 | [#8](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/8) | [#13](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/13) |
| `A7` | 투두 체크박스 구현 | [#9](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/9) | [#13](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/13) |
| `A8` | 투두 수정/삭제 마크업 | [#10](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/10), [#12](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/12) | [#14](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/14) |
| `A9` | 투두 삭제 기능 구현 | [#11](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/11) | [#14](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/14) |
| `A10` | 투두 수정 기능 구현 | [#12](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/12) | [#14](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/14) |

#### 3-2-3. 공통 코드

| 유형 | 객체명 | 역할 |
|------|-------|------|
| 컴포넌트 | `UserAbstractField` | Id, Password 입력의 중복 코드 제거 |
| 컴포넌트 | `LoginForm` | SignIn, SignUp 페이지의 중복 코드 제거 |
| 객체 | `AbstractApi` | Auth, Todo Api의 중복 코드 제거 |

#### 3-2-4. Style과 Logic의 분리

`index.tsx`와 `style.tsx`로 분리하여 style 객체를 별개 파일로 분리하였음. 스타일과 로직은 바뀌는 이유가 서로 달라 응집도가 없으므로 결합도를 높일 이유가 없음.

#### 3-2-5. 상수 분리

소스 코드 전반에 퍼져있는 상수값은 화면 로직과 관련이 없으므로 해당 상수를 변경하기 위해 컴포넌트를 변경하기보단 상수만 변경할 수 있게 하는 게 적절하다. 바뀌는 이유가 서로 다르기 때문에 응집도가 없으므로 결합도를 높일 이유가 없다.
