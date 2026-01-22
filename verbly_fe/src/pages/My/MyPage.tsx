import { Header } from '../../components/Header/Header';
import SideMenu from '../../components/Nav/SideMenu';

// 하위 컴포넌트 및 데이터 Import
import { ProfileCard, mockUser, mockExpertRequests, mockCorrectionHistory } from '../../components/Mypage/My_profilecard';
import { BadgeManagement } from '../../components/Mypage/My_badge';
import { ExpertRequestManagement } from '../../components/Mypage/My_corrector';
import { PremiumBanner } from '../../components/Mypage/My_banner';
import { Dashboard } from '../../components/Mypage/My_board';
import { CorrectionHistory } from '../../components/Mypage/My_correctedlist';

const MyPage = () => {
  return (
    <div className="flex flex-col h-screen bg-bg0">
      {/* Header */}
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Side Menu */}
        <SideMenu variant="default" />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="w-auto mx-auto">
            {/* 상단 섹션: 프로필 + 뱃지/전문가 의뢰 */}
            <div className="flex gap-[29px] mb-8">
              {/* 왼쪽: 프로필 카드 */}
              <div className="w-full max-w-[615px] h-auto max-h-[550px]">
                <ProfileCard user={mockUser} />
              </div>
              
              {/* 오른쪽: 뱃지 관리 + 전문가 의뢰 관리 */}
              <div className="flex flex-col gap-8 flex-1"> 
                <BadgeManagement badges={mockUser.badges} />
                <ExpertRequestManagement requests={mockExpertRequests} />
              </div>
            </div>
            
            {/* 프리미엄 배너 */}
            <div className="mb-8">
              <PremiumBanner />
            </div>
            
            {/* 하단 섹션: 대시보드 + Correction History */}
            <div className="flex flex-col gap-8">
              <Dashboard />
              <CorrectionHistory history={mockCorrectionHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;