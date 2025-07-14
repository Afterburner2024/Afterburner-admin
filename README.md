# Afterburner Admin

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/) [![Firebase](https://img.shields.io/badge/Firebase-10.12.2-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

Afterburner 서비스의 효율적인 관리를 위해 제작된 어드민 대시보드 프로젝트입니다. React, TypeScript, Vite 기반으로 구축되었으며, Firebase를 통해 인증 및 데이터를 관리합니다.

## ✨ 주요 기능

- **대시보드**: 최신 회원, 프로젝트, 스터디 그룹 현황을 요약하여 보여주는 메인 페이지입니다.
- **회원 관리**: 전체 회원 목록을 조회하고, 각 회원의 상세 정보를 확인할 수 있습니다.
- **프로젝트 관리**: 등록된 프로젝트 목록과 상세 내용을 관리합니다.
- **스터디 그룹 관리**: 생성된 스터디 그룹 목록과 상세 정보를 관리합니다.
- **공지사항 관리**: 서비스의 공지사항을 작성, 수정, 삭제할 수 있습니다.
- **문의 관리**: 사용자들이 남긴 문의사항을 확인하고 답변을 관리합니다.
- **인증**: Firebase Authentication을 사용한 안전한 이메일/비밀번호 및 소셜 로그인 기능을 제공합니다.

## 🛠️ 기술 스택

- **프레임워크**: React
- **언어**: TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand (authStore)
- **라우팅**: React Router
- **백엔드/데이터베이스**: Firebase (Authentication, Firestore)
- **코드 품질**: ESLint

## 📂 프로젝트 구조

```
src/
├── components/    # 공통 UI 컴포넌트 (헤더, 사이드바, 테이블 등)
├── hooks/         # 커스텀 훅 (인증, 데이터 페칭, 토글 등)
├── layouts/       # 페이지 레이아웃 (어드민 레이아웃)
├── pages/         # 각 페이지 컴포넌트 (대시보드, 회원 관리 등)
├── store/         # 전역 상태 관리 (Zustand)
├── types/         # TypeScript 타입 정의
├── utils/         # 유틸리티 함수 (API 호출, 날짜 포맷팅, Firebase 설정)
├── App.tsx        # 메인 애플리케이션 컴포넌트
├── main.tsx       # 애플리케이션 진입점
└── routes.tsx     # 라우팅 설정
```

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/Afterburner-admin.git
cd Afterburner-admin
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, Firebase 프로젝트의 설정 값을 입력해주세요.

`.env.example` 파일을 참고하여 아래와 같이 변수를 설정합니다.

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note**: Vite에서는 클라이언트 측에서 환경 변수를 사용하기 위해 `VITE_` 접두사가 필요합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

서버가 실행되면 `http://localhost:5173` (또는 다른 포트)에서 애플리케이션을 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

- `npm run dev`: 개발 모드로 Vite 서버를 실행합니다.
- `npm run build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `npm run lint`: ESLint를 사용하여 코드 스타일을 검사하고 수정합니다.
- `npm run preview`: 프로덕션 빌드 결과물을 로컬에서 미리 봅니다.

## 📄 라이선스

이 프로젝트는 [LICENSE](./LICENSE) 파일에 명시된 라이선스를 따릅니다.