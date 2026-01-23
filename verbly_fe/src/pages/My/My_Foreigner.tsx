// My_Korean.tsx (My_Foreigner.tsx도 동일하게 적용, MyBanner만 제거)
import SideMenu from '../../components/Nav/SideMenu';
import ProfileCard from './components/My_profilecard';
import MyBadge from './components/My_badge';
import MyCorrector from './components/My_corrector';
import MyBanner from './components/My_banner';
import MyCorrected from './components/My_corrected';
import MyBoard from './components/My_board';
import { Header } from '../../components/Header/Header';
import type { User } from '../../types/user';

const MOCK_USER: User = {
  id: "user1",
  name: "Test User",
  profileImg: "https://via.placeholder.com/150",
  introduction: "Hello, I am using this app.",
  progress: {},
  stats: {}
};

const MOCK_CORRECTIONS = [
  {
    id: "1",
    title: "How to improve my English speaking skills?",
    date: "2024.01.20",
    correctorName: "Jenny",
  },
  {
    id: "2",
    title: "Where is the bathroom?",
    date: "2024.01.18",
    correctorName: "Mike",
  },
  {
    id: "3",
    title: "What is the difference between 'affect' and 'effect'?",
    date: "2024.01.15",
    correctorName: "Tom",
  },
  {
    id: "4",
    title: "Can you explain the past perfect tense?",
    date: "2024.01.10",
    correctorName: "Sarah",
  },
];

const MyPage = () => {
  const user = MOCK_USER;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header 영역 */}
      <div className="w-full max-w-[1920px] mx-auto">
        <Header />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 좌측 사이드 메뉴 - 모바일에서 숨김 */}
        <div className="hidden lg:block">
          <SideMenu variant="default" />
        </div>

        {/* 페이지 내용 - 반응형 패딩 */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-[32px] overflow-x-hidden">
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-[24px] mx-auto max-w-7xl">
            
            {/* 상단 섹션: 모바일 1열, 태블릿+ 2열 */}
            <div className="flex flex-col xl:flex-row gap-4 md:gap-6 lg:gap-[24px]">
              {/* 프로필 카드 */}
              <div className="w-full xl:w-[40%] flex justify-center xl:block">
                <div className="w-full max-w-md xl:max-w-none">
                  <ProfileCard />
                </div>
              </div>

              {/* 우측: 배지 + 전문가 의뢰 */}
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-[24px] flex-1 min-w-0">
                <MyBadge />
                <MyCorrector />
              </div>
            </div>

            {/* 하단 섹션 */}
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-[24px] w-full min-w-0">
              {/* 배너 (한국인 페이지만) */}
              
              <div>
                <div className="mb-3 md:mb-4 text-base md:text-lg font-bold text-gray-9">대시보드</div>
                <MyBoard />
              </div>
               
              <div>
                <div className="mb-3 md:mb-4 text-base md:text-lg font-bold text-gray-9">Correction History</div>
                <MyCorrected data={MOCK_CORRECTIONS} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;