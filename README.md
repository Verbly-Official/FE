# Verbly: 내가 쓴 영어일기를 AI와 원어민이 듀얼 첨삭해주는 서비스

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/021e41e2-ee30-49c6-b4cb-7a2eebadc6b9" />

<br/>

## <span id="프로젝트-소개">프로젝트 소개</span>
>**“AI 1차 교정 + 원어민 2차 첨삭의 2단계 학습 플랫폼"**

많은 한국인 학습자들은
틀릴까 봐 영어 사용을 망설입니다.

버블리는 이 장벽을 낮추기 위해
AI의 빠른 문법 교정과
원어민의 문화적·맥락적 피드백을 결합했습니다.

교정된 문장은 자동으로 개인 라이브러리에 저장되고,
퀴즈와 복습을 통해 장기 기억으로 전환됩니다.

학습은 혼자가 아니라,
글로벌 커뮤니티 속에서 함께 성장하는 경험이 됩니다.

<br/>

## <span id="배포-주소">배포 주소</span>
> **🌐 프론트엔드 주소:** https://www.verbly.kr <br/>
> **⚙️ 백엔드 주소:** https://api.verbly.kr <br/>

<br/>

## <span id="팀원-소개">팀원 소개</span>
<div align="center">

| 멍이(전지은) | 누아(조호연) | 나옹(성유진) | 지니(김정현) |
|:--:|:--:|:--:|:--:|
| <img src="https://github.com/kniiiiko.png" width="100"/> | <img src="https://github.com/whghdus.png" width="100"/> | <img src="https://github.com/Naongjin.png" width="100"/> | <img src="https://github.com/ninininhihi.png" width="100"/> |
| [@kniiiiko](https://github.com/kniiiiko) | [@whghdus](https://github.com/whghdus) | [@Naongjin](https://github.com/Naongjin) | [@ninininhihi](https://github.com/ninininhihi) |

</div>

<br/>

<div align="center">
  
## <span id="사용-기술-스택">사용 기술 스택</span>
| 분류              | 기술                               |
| --------------- | -------------------------------- |
| Package Manager | pnpm (v10.20.0)                  |
| UI Library      | React                            |
| Styling         | Tailwind CSS (v4)                |
| HTTP Client     | axios (v1.13.2)                  |
| Routing         | react-router-dom (v7.12.0)       |
| Server State    | @tanstack/react-query (v5.90.16) |
| Global State    | zustand (v5.0.10)                |

</div>

<br/>

## <span id="git-컨벤션">git 컨벤션</span>
### 브랜치 전략
**Git Flow 방식: dev ← 개별 브랜치**
- dev: 개발 + 배포 브랜치

### 브랜치 명명 규칙 
**브랜치 형식: 브랜치종류-#이슈번호/브랜치이름**
- 브랜치 종류: feat, refactor, bug  등등…

<br/>

## <span id="폴더-구조">폴더 구조</span>
```
📦 verbly.react
├── .github
│   └── ISSUE_TEMPLATE
│
├── public
│
├── src
│   ├── apis
│   │
│   ├── assets
│   │   ├── emoji
│   │   └── fonts
│   │
│   ├── auth
│   │
│   ├── components
│   │   ├── AccountActionModal
│   │   ├── Avatar
│   │   ├── Badge
│   │   ├── Button
│   │   ├── Chat
│   │   ├── Chip
│   │   ├── Comment
│   │   ├── Header
│   │   ├── Home
│   │   ├── Interaction
│   │   ├── Logo
│   │   │   └── img
│   │   ├── Nav
│   │   │   └── components
│   │   ├── Pagination
│   │   ├── Profile
│   │   │   └── img
│   │   ├── ProfileCard
│   │   ├── ProgressIndicator
│   │   ├── Rating
│   │   ├── SearchBar
│   │   ├── Select
│   │   ├── Switch
│   │   ├── Tab
│   │   ├── Tag
│   │   ├── Text
│   │   ├── TextArea
│   │   ├── Toast
│   │   └── TrendingTag
│   │
│   ├── contexts
│   │
│   ├── hooks
│   │
│   ├── pages
│   │   ├── Correction
│   │   │   ├── Native
│   │   │   ├── components
│   │   │   ├── korean
│   │   │   └── layout
│   │   │
│   │   ├── Home
│   │   │   └── components
│   │   │
│   │   ├── Inbox
│   │   │   └── components
│   │   │
│   │   ├── Library
│   │   │   ├── components
│   │   │   └── emoji
│   │   │
│   │   ├── Review
│   │   │   └── components
│   │   │
│   │   ├── My
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   └── img
│   │   │
│   │   └── Onboarding
│   │       └── video
│   │
│   ├── routes
│   │
│   ├── store
│   │
│   ├── styles
│   │
│   ├── types
│   │
│   └── utils
│
├── .vite
│   └── deps
```
