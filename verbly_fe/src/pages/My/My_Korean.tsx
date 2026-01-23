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
      {/* Header 영역 - z-index 확보 */}
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto">
          <Header />
        </div>
      </div>

      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 좌측 사이드 메뉴 - 모바일 숨김, 고정 높이 처리 */}
        <aside className="hidden lg:block sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto w-64 shrink-0 border-r border-gray-100 bg-white">
          <SideMenu variant="default" />
        </aside>

        {/* 메인 컨텐츠 영역 */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            
            {/* Grid Layout: 모바일 1열 -> XL 이상 12열 그리드 (4:8 비율) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* [Left Column] 프로필 카드 */}
              {/* xl 화면부터는 스크롤 시 상단에 고정(sticky)되어 빈 공간 방지 */}
              <section className="xl:col-span-4 xl:sticky xl:top-24 space-y-6">
                <ProfileCard />
                
                {/* 모바일/태블릿에서는 배너가 프로필 바로 아래에 오는 것이 자연스러울 수 있음 (옵션) */}
                <div className="block xl:hidden">
                   <MyBanner />
                </div>
              </section>

              {/* [Right Column] 메인 정보 흐름 */}
              <section className="xl:col-span-8 flex flex-col gap-6 lg:gap-8">
                
                {/* 1. 배지 & 전문가 관리 */}
                <div className="space-y-6">
                  <MyBadge />
                  <MyCorrector />
                </div>

                {/* 2. 배너 (데스크탑 전용 위치) */}
                <div className="hidden xl:block">
                  <MyBanner />
                </div>

                {/* 3. 대시보드 */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    대시보드
                  </h3>
                  <MyBoard />
                </div>

                {/* 4. 첨삭 히스토리 */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Correction History
                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      Recent {MOCK_CORRECTIONS.length}
                    </span>
                  </h3>
                  <MyCorrected data={MOCK_CORRECTIONS} />
                </div>

              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;