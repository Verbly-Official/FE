import SideMenu from '../../components/Nav/SideMenu';
import ProfileCard from '../../components/Mypage/My_profilecard';
import MyBadge from '../../components/Mypage/My_badge';
import MyCorrector from '../../components/Mypage/My_corrector';
import MyBanner from '../../components/Mypage/My_banner';
import MyCorrected from '../../components/Mypage/My_corrected';
import MyBoard from '../../components/Mypage/My_board';
import { Header } from '../../components/Header/Header';

// 테스트용 더미 데이터
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
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Header 영역 */}
      <div className="w-full max-w-[1920px] mx-auto">
        <Header />
      </div>

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 좌측 사이드 메뉴 */}
        <SideMenu variant="default" />

        {/* 페이지 내용 */}
        <main className="flex-1 p-[32px] overflow-x-hidden">
          <div className="flex flex-col gap-[24px] mx-auto">
            
            {/* [상단 섹션] 좌측: 프로필 / 우측: 배지 + 전문가 의뢰 */}
            <div className="flex flex-col h-[30%] xl:flex-row gap-[24px]">
              {/* 프로필 카드 (고정 너비 유지 혹은 반응형) */}
              <div className="flex-none xl:w-[40%] h-full flex justify-center xl:block">
                <ProfileCard />
              </div>

              {/* 우측: 배지(상) + 전문가 의뢰(하) */}
              <div className="flex flex-col gap-[24px] flex-1 min-w-0">
                <MyBadge />
                <MyCorrector />
              </div>
            </div>

            {/* [하단 섹션] 배너 -> 게시글(Board) -> 첨삭 리스트(CorrectedList) 순서 */}
            <div className="flex flex-col gap-[24px] flex-1 w-full min-w-0">
               <MyBanner />
               <div>
                <div className="mb-4 text-lg font-bold text-gray-9">대시보드</div>
                <MyBoard />
               </div>
               
               <div>
                <div className="mb-4 text-lg font-bold text-gray-9">Correction History</div>
                {/*있으면 불러오기*/}
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