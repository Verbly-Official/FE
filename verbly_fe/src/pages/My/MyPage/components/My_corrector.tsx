import React, { useState } from 'react';
import DefaultProfile from '../../../../components/Profile/img/large.svg';
import { TextButton } from '../../../../components/Button';
import { Badge } from '../../../../components/Badge/ContentBadge'; 
import KoreanHistoryModal from './KoreanHistoryModal';
import ExpertHistoryModal from './ExpertHistoryModal';

interface Corrector {
  id: string;
  name: string;
  location: string; 
  imageUrl?: string;
  isPro?: boolean;
}

interface MyCorrectorProps {
  modalType?: 'korean' | 'foreigner'; // 어떤 모달을 사용할지 결정
}

const My_corrector: React.FC<MyCorrectorProps> = ({ modalType = 'korean' }) => {
  const correctors: Corrector[] = [
    { id: '1', name: 'EnglishPro', location: '뉴욕, 미국', isPro: true },
    { id: '2', name: 'Sarah T.', location: '런던, 영국', isPro: false },
    { id: '3', name: 'CodeWriter', location: '서울, 한국', isPro: true },
  ];

  // 모달 상태 관리
  const [selectedCorrector, setSelectedCorrector] = useState<Corrector | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // 내역보기 모달 열기 (버튼 클릭 시)
  const handleHistoryClick = (corrector: Corrector) => {
    setSelectedCorrector(corrector);
    setIsHistoryModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedCorrector(null);
  };

  return (
    <>
      <div className="w-full h-[300px] bg-white rounded-xl border border-gray-100 p-4 md:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-6 gap-2">
          <h3 className="text-lg md:text-[20px] text-gray-9">
            전문가 의뢰 관리
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"> 
          {correctors.map((corrector) => (
            <div 
              key={corrector.id} 
              className="bg-white border border-gray-100 rounded-xl md:rounded-2xl flex flex-col p-3 hover:border-violet-100 hover:shadow-sm transition-all group cursor-pointer"
            >
              {/* 상단 이미지 영역 */}
              <div className="relative w-full h-28 md:h-[110px] rounded-lg md:rounded-xl overflow-hidden bg-gray-50 mb-3">
                <div className="absolute top-2 left-2 z-10">
                  <Badge 
                    content="첨삭 완료"
                    size="small"
                    className="!px-1.5 !py-0.5 !text-xs md:!text-[14px] opacity-90"
                  />
                </div>
                
                <img 
                  src={corrector.imageUrl || DefaultProfile} 
                  alt={corrector.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 하단 정보 */}
              <div className="flex justify-between items-end w-full mt-auto">
                <div className="flex flex-col text-left gap-0.5">
                  <p className="text-base md:text-[17px] font-bold text-gray-900 truncate max-w-[120px]">
                    {corrector.name}
                  </p>
                  <p className="text-xs md:text-[12px] text-gray-400 truncate max-w-[120px]">
                    {corrector.location}
                  </p>
                </div>

                <div 
                  className="shrink-0 mb-0.5"
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
                    handleHistoryClick(corrector); // 내역보기 모달 열기
                  }}
                >
                  <TextButton 
                    onClick={() => {}} // 빈 함수 (이벤트 버블링 방지는 상위 div에서 처리)
                    variant="secondary" 
                    size="small"
                    className="!text-[10px] md:!text-[11px] !text-gray-400 hover:!text-violet-600 !p-0 gap-0.5"
                  >
                    내역보기 
                    <span className="text-[9px] md:text-[10px] ml-0.5">&gt;</span>
                  </TextButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 타입에 따라 다른 모달 렌더링 */}
      {modalType === 'korean' ? (
        <KoreanHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={handleCloseModal}
          expertName={selectedCorrector?.name} 
        />
      ) : (
        <ExpertHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={handleCloseModal}
          expertName={selectedCorrector?.name} 
        />
      )}
    </>
  );
};

export default My_corrector;