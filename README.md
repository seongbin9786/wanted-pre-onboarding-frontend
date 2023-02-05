# 원티드 프리온보딩 프론트엔드 - 선발 과제

## 작성자

김성빈(seongbin9786@gmail.com)

## 배포 주소

[배포 주소](wanted-pre-onboarding-frontend-bvv9kdntp-seongbin9786.vercel.app)

## 사용한 라이브러리

### 기능
- 모두 바닐라로 직접 구현했습니다.

### 테스트 (UI) (#32)
- [Cypress](https://www.cypress.io/)

### 코드 컨벤션 (#27)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 기능 목록표

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

### 자율성과 창의력을 발휘한 부분


## 설계

1. API fetch
2. components/page 분리
3. style 분리
4. Login Context 사용

### 리팩토링

| 번호 | 작업명 | Issue | PR |
|------|-------|-------|----|
| 1 | API 호출 함수를 페이지 요소로부터 분리 | [#15](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/15) | [#26](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/26) |
| 2 | Todo List에서 CreateForm 컴포넌트 분리 | [#17](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/17) | [#28](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/28) |
| 3 | SignIn, SignUp 페이지 간 중복 제거 | [#18](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/18) | [#28](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/28) | 
| 4 | AccessToken 상태 관리를 분리 | [#19](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/19) | [#29](https://github.com/seongbin9786/wanted-pre-onboarding-frontend/issues/29) |