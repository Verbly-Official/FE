import React, { useEffect, useState } from 'react';
import DefaultProfile from '../../../components/Profile/img/large.svg';
import { TextButton } from '../../../components/Button';
import { Badge } from '../../../components/Badge/ContentBadge'; 
import KoreanHistoryModal from './KoreanHistoryModal';
import ExpertHistoryModal from './ExpertHistoryModal';
import FileIcon from '../../../assets/emoji/file.svg';
import ChevIcon from '../../../assets/emoji/chev-right.svg';
import { getNativeCorrections } from '../../../apis/correctionNative'; 

interface ExpertItem {
  id: number;
  expertName: string;
  location: string;
  status: string;
  imageUrl?: string;
  title?: string; 
  originalText?: string;
  correctedText?: string;
  comment?: string;
}

interface ExpertListProps {
  modalType?: 'korean' | 'native';
}

const ExpertList: React.FC<ExpertListProps> = ({ modalType = 'native' }) => {
  const [items, setItems] = useState<ExpertItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ExpertItem | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출 부분 (기존과 동일)
        const response = await getNativeCorrections({ page: 1, size: 6 });
        const mappedItems: ExpertItem[] = Array.isArray(response) ? response.map((item: any) => ({
          id: item.id,
          expertName: item.correctorName || 'Unknown Expert',
          location: item.correctorLocation || 'Global',
          status: item.status || 'COMPLETED',
          title: item.title,
          originalText: item.originalText,
          correctedText: item.correctedText,
          comment: item.comment
        })) : [];
        setItems(mappedItems);
      } catch (error) {
        console.error("전문가 의뢰 내역 조회 실패:", error);
        setItems([]); // 에러 발생 시 빈 배열로 설정
      }
    };
    fetchData();
  }, [modalType]);

  const handleHistoryClick = (item: ExpertItem) => {
    setSelectedItem(item);
    setIsHistoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      {/* ✅ [수정 1] 컨테이너에 shadow-sm 추가 (BadgeSection과 통일) */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex justify-start items-center mb-4 md:mb-6 gap-[8px]">
          <img src={FileIcon} alt="icon" className="w-6 h-6 md:w-8 md:h-8" />
          <h3 className="text-lg md:text-[20px] text-gray-9">전문가 의뢰 관리</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"> 
          {items.length > 0 ? (
            items.map((item) => (
              <div 
                key={item.id} 
                // w-[272px] h-[192px] 고정 크기 유지
                className="
                  bg-white border border-gray-100 rounded-xl 
                  flex flex-col items-start 
                  w-[272px] h-[192px] 
                  p-3 transition-all group cursor-pointer hover:shadow-md
                  flex-shrink-0
                "
              >
                {/* 카드 내용 (기존과 동일) */}
                <div className="relative w-full h-[100px] flex-none rounded-lg overflow-hidden bg-gray-50 mb-3">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge 
                      content={item.status === 'COMPLETED' ? "첨삭 완료" : "진행 중"}
                      size="small"
                      className="!px-1.5 !py-0.5 !text-xs opacity-90"
                    />
                  </div>
                  <img 
                    src={item.imageUrl || DefaultProfile} 
                    alt={item.expertName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex justify-between items-center w-full mt-auto">
                  <div className="flex flex-col text-left gap-0.5 min-w-0">
                    <p className="text-[16px] font-bold text-gray-900 truncate max-w-[120px]">
                      {item.expertName}
                    </p>
                    <p className="text-[13px] text-gray-400 truncate max-w-[120px]">
                      {item.location}
                    </p>
                  </div>

                  <div onClick={(e) => { e.stopPropagation(); handleHistoryClick(item); }}>
                    <TextButton onClick={() => {}} variant="secondary" size="small">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">내역보기</span>
                        <img src={ChevIcon} alt="arrow" className="w-3 h-3 opacity-60" />
                      </div>
                    </TextButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
             // ✅ [수정 2] 데이터 없음 영역: 점선 테두리 제거, 높이는 유지
             <div className="col-span-full h-[192px] flex items-center justify-center text-gray-400 text-sm w-full">
               의뢰한 내역이 없습니다.
             </div>
          )}
        </div>
      </div>

      {modalType === 'korean' ? (
        <KoreanHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={handleCloseModal}
          data={selectedItem} 
        />
      ) : (
        <ExpertHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={handleCloseModal}
          data={selectedItem} 
        />
      )}
    </>
  );
};

export default ExpertList;