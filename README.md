# 원티드 프리온보딩 프론트엔드 - 선발 과제

## 1. 프로젝트의 실행 방법

1. [배포된 웹사이트](https://wanted-pre-onboarding-frontend-one-iota.vercel.app/)에 방문합니다.

    <img src="https://user-images.githubusercontent.com/28754907/216826571-d5ece146-d2f8-4a92-8740-7884c05a1041.png" width="300px" />

2. 회원가입을 수행합니다.

    <img src="https://user-images.githubusercontent.com/28754907/216826633-77b46839-b478-4332-9106-2581cedeb411.png" width="300px" />

3. 로그인합니다.

    <img src="https://user-images.githubusercontent.com/28754907/216826642-46d37bc9-be15-4318-b2b6-aa8f4484daec.png" width="300px" />

4. 할일 목록 페이지로 이동되면, 새로운 할 일을 생성합니다.

    <img src="https://user-images.githubusercontent.com/28754907/216826668-1ae280c7-dff3-48a5-abd2-28ce6c56e9a2.png" width="300px" />

5. 할 일을 생성됐음을 확인할 수 있습니다.

    <img src="https://user-images.githubusercontent.com/28754907/216826686-483ef214-9382-4b8b-8be0-d4b3e95ad2ed.png" width="300px" />

6. 생성된 할 일을 수정할 수 있습니다. 제출 버튼을 누르면 수정됐음을 확인할 수 있습니다.

    <img src="https://user-images.githubusercontent.com/28754907/216826695-bd792a4c-50c4-4177-93f1-1e2482ad6177.png" width="300px" />

    <img src="https://user-images.githubusercontent.com/28754907/216826712-a140b785-4e49-4401-8460-2cb9b6798a05.png" width="300px" />

7. 할 일을 삭제할 수 있습니다. 삭제 버튼을 누르면 삭제됐음을 확인할 수 있습니다.

    <img src="https://user-images.githubusercontent.com/28754907/216826718-5eb4a987-d361-4ee9-b35f-ddf6f0f2a225.png" width="300px" />




## 2. 배포 주소

[배포 주소](wanted-pre-onboarding-frontend-bvv9kdntp-seongbin9786.vercel.app)

- 웹사이트는 vercel을 사용해 `main` 브랜치의 최신 버전이 푸시될 때마다 자동으로 배포됩니다.

## 3. 사용한 라이브러리

### 3-1. 기능

모든 기능은 vanilla JavaScript로 직접 구현했습니다.

### 3-2. 테스트 (UI) ([#32](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/32))

- [Cypress](https://www.cypress.io/)
- ![cypress](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/blob/main/docs/images/cypress.png)

### 3-3. 코드 컨벤션 ([#27](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/27))

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 4. 기능 목록표

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

### 4-1. 자율성과 창의력을 발휘한 부분

#### 4-1-1. 로그인 여부 상태

`login`으로 추상화하여 이해를 명확하게 할 수 있도록 구현했습니다. 또한 accessToken을 체크 조건에 사용하기보다 `loggedIn` 조건을 활용했습니다.

### 4-1-2. Cypress를 활용한 E2E 테스트

문제의 요구사항을 토대로 자동화된 검증 과정을 구성하는 방법을 통해 구현을 점검하고자 Cypress를 활용했습니다. 수동으로 테스트했을 땐 쉽게 각 기능이 구현됐다고 생각했지만, 실제로 `data-testid`를 활용해 테스트하면서 `testid`의 오타 및 누락 등 여러 건의 오류를 잡을 수 있었습니다.

## 5. 설계

### 5-1. 각 상세 설명

#### 5-1-1. API 요청 logic 분리

 1. 코드 재사용
    1. `AbstractApi` 클래스에서 Auth, Todo Api 요청에 필요한 코드를 재사용할 수 있게 구현했습니다.
    2. 덕분에 각 endpoint에 요청하는 메소드의 길이는 1-6 라인입니다.
 2. 요청, 응답 Typing
    1. 입력 `FormData`, 응답 `Response` 인터페이스를 정의해 활용했습니다.

#### 5-1-2. components/page 분리

1. Page는 페이지 단위의 기능을 구현하고 소속 컴포넌트 간 데이터 공유를 구현했습니다.
2. Component는 단위로 분리되는 기능들을 최대한 구현 및 캡슐화했습니다.

#### 5-1-3. style과 logic의 분리

1. 컴포넌트의 스타일 요소는 모두 `style.tsx`로 분리했습니다.
2. 상태 관리 및 HTML 구성만 각 컴포넌트(`index.tsx`)에서 수행했습니다.

#### 5-1-4. Login Context 사용

1. 로그인에 필요한 상태 관리의 적절한 위치가 없어 Context로 관리했습니다.
   1. 이전에는 가장 상위 컴포넌트에서 수행했으나 여러 로직이 해당 컴포넌트에 있어 가독성이 좋지 않았습니다.
   2. 값 관리: `loggedIn, accessToken`
   3. 함수 구현: `login, logout`
2. 이후 최상위 Page가 아닌 깊은 곳의 컴포넌트에서 사용자 정보가 필요할 때를 해당 기능 구현이 수월할 것입니다.

#### 5-1-5. 문자열 리소스를 상수로 관리

1. 소스 코드 전반에 퍼져있는 상수값(하드 코딩된 문자열 등을 포함)을 하나의 폴더(`src/constants`)에서 관리합니다.

### 5-2. 리팩토링

| 번호 | 작업명 | Issue | PR |
|------|-------|-------|----|
| 1 | API 호출 함수를 페이지 요소로부터 분리 | [#15](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/15) | [#26](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/26) |
| 2 | Todo List에서 CreateForm 컴포넌트 분리 | [#17](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/17) | [#28](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/28) |
| 3 | SignIn, SignUp 페이지 간 중복 제거 | [#18](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/18) | [#28](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/28) | 
| 4 | AccessToken 상태 관리를 분리 | [#19](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/19) | [#29](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/29) |

