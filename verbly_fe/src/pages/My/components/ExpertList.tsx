import React, { useState } from 'react';
import DefaultProfile from '../../../components/Profile/img/large.svg';
import { TextButton } from '../../../components/Button';
import { Badge } from '../../../components/Badge/ContentBadge'; 
import KoreanHistoryModal from './KoreanHistoryModal';
import ExpertHistoryModal from './ExpertHistoryModal';
import FileIcon from '../../../assets/emoji/file.svg';
import ChevIcon from '../../../assets/emoji/chev-right.svg';

interface Corrector {
  id: string;
  name: string;
  location: string; 
  imageUrl?: string;
  isPro?: boolean;
}

interface MyCorrectionProps {
  modalType?: 'korean' | 'foreigner';
}

const CorrectionList: React.FC<MyCorrectionProps> = ({ modalType = 'korean' }) => {
  const correctors: Corrector[] = [
    { id: '1', name: 'EnglishPro', location: '뉴욕, 미국', isPro: true },
    { id: '2', name: 'Sarah T.', location: '런던, 영국', isPro: false },
    { id: '3', name: 'CodeWriter', location: '서울, 한국', isPro: true },
  ];

  const [selectedCorrector, setSelectedCorrector] = useState<Corrector | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleHistoryClick = (corrector: Corrector) => {
    setSelectedCorrector(corrector);
    setIsHistoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedCorrector(null);
  };

  return (
    <>
      <div className="w-full h-[300px] bg-white rounded-xl border border-gray-100 p-4 md:p-6">
        <div className="flex justify-start items-center mb-4 md:mb-6 gap-[8px]">
          <img src={FileIcon} alt="icon" className="w-6 h-6 md:w-8 md:h-8" />
          <h3 className="text-lg md:text-[20px] text-gray-9">
            전문가 의뢰 관리
          </h3>
        </div>

        <div className=" gap-3 flex flex-start"> 
          {correctors.map((corrector) => (
            <div 
              key={corrector.id} 
              className="bg-white border border-gray-100 rounded-xl flex flex-col p-3 w-[272px] transition-all group cursor-pointer"
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
              <div className="flex justify-between items-center w-full mt-auto">
                <div className="flex flex-col text-left gap-0.5">
                  <p className="text-base md:text-[17px] font-bold text-gray-900 truncate max-w-[120px]">
                    {corrector.name}
                  </p>
                  <p className="text-xs md:text-[14px] text-gray-400 truncate max-w-[120px]">
                    {corrector.location}
                  </p>
                </div>

                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHistoryClick(corrector);
                  }}
                >
                  <TextButton 
                    onClick={() => {}} 
                    variant="secondary" 
                    size="small"
                  >
                    <div className="flex items-center gap-[4px]">
                      <span>내역보기</span>
                      <img 
                        src={ChevIcon} 
                        alt="arrow" 
                        className="w-4 h-4 opacity-60" 
                      />
                    </div>
                  </TextButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default CorrectionList;