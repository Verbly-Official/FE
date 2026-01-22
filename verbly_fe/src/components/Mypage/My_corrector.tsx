import React from 'react';
import BasicProfile from '../Profile/img/basicProfile.svg';
import { TextButton } from '../Button';
import { Badge } from '../Badge/ContentBadge'; 

interface Corrector {
  id: string;
  name: string;
  location: string; 
  imageUrl?: string;
  isPro?: boolean;
}

const My_corrector: React.FC = () => {
  const correctors: Corrector[] = [
    { id: '1', name: 'EnglishPro', location: '뉴욕, 미국', isPro: true },
    { id: '2', name: 'Sarah T.', location: '런던, 영국', isPro: false },
    { id: '3', name: 'CodeWriter', location: '서울, 한국', isPro: true },
  ];

  return (
    <div className="w-full h-[60%] bg-white rounded-xl border border-gray-100 p-6 gap-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <h3 className="text-[20px] text-gray-9">
          전문가 의뢰 관리
        </h3>
      </div>

      {/* 가로 스크롤 리스트 */}
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide"> 
        {correctors.map((corrector) => (
          <div 
            key={corrector.id} 
            className="w-[272px] h-[192px] bg-white border border-gray-100 rounded-2xl flex flex-col p-3 hover:border-violet-100 hover:shadow-sm transition-all group"
          >
            {/* 상단: 이미지 영역 (절반 정도 차지) */}
            <div className="relative w-full h-[110px] rounded-xl overflow-hidden bg-gray-50 mb-3">
              {/* 뱃지: 이미지 위에 위치 (absolute) */}
              <div className="absolute top-2 left-2 z-10">
                <Badge 
                  content= "첨삭 완료"
                  size="small"
                  className="!px-1.5 !py-0.5 !text-[14px] opacity-90" // 사이즈 미세 조정
                />
              </div>
              
              <img 
                src={corrector.imageUrl || BasicProfile} 
                alt={corrector.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 하단: 정보 + 버튼 (가로 배치) */}
            <div className="flex justify-between items-end w-full mt-auto">
              {/* 왼쪽: 이름 및 주거지 */}
              <div className="flex flex-col text-left gap-0.5">
                <p className="text-[17px] font-bold text-gray-900 truncate max-w-[80px]">
                  {corrector.name}
                </p>
                <p className="text-[12px] text-gray-400 truncate max-w-[80px]">
                  {corrector.location}
                </p>
              </div>

              {/* 오른쪽: 내역보기 버튼 */}
              <div className="shrink-0 mb-0.5">
                <TextButton 
                  onClick={() => {}} 
                  variant="secondary" 
                  size="small"
                  className="!text-[11px] !text-gray-400 hover:!text-violet-600 !p-0 gap-0.5"
                >
                  내역보기 
                  <span className="text-[10px] ml-0.5">&gt;</span>
                </TextButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default My_corrector;