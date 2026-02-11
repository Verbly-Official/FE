import React, { useEffect, useState } from 'react';
import DefaultProfile from '../../../components/Profile/img/large.svg';
import { TextButton } from '../../../components/Button';
import { Badge } from '../../../components/Badge/ContentBadge'; 
import KoreanHistoryModal from './KoreanHistoryModal';
import ExpertHistoryModal from './ExpertHistoryModal';
import FileIcon from '../../../assets/emoji/file.svg';
import ChevIcon from '../../../assets/emoji/chev-right.svg';
import { getCorrections, type CorrectionItem } from '../../../apis/correction'; 

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

        // 파라미터: sort=true(최신순), corrector='NATIVE_SPEAKER'(전문가 의뢰만)
        // page, size 파라미터 없이 호출하여 전체 목록 조회
        const response = await getCorrections({ 
          sort: true,
          corrector: 'NATIVE_SPEAKER' 
        });

        // API 응답 데이터를 UI 상태(ExpertItem)로 매핑
        const mappedItems: ExpertItem[] = Array.isArray(response.items) 
          ? response.items.map((item: CorrectionItem) => ({
              id: item.id,
              // API에 전문가 이름 필드가 있다면 사용, 없으면 기본값
              expertName: item.correctorName || 'Native Expert', 
              // 목록 API에 지역 정보가 없다면 기본값 처리
              location: 'Global', 
              status: item.status,
              imageUrl: undefined, // 이미지가 없다면 아래 렌더링 로직에서 DefaultProfile 사용됨
              title: item.title,
              
              // ⚠️ 중요: 목록 조회 API에는 보통 상세 텍스트(originalText 등)가 포함되지 않습니다.
              // 모달에서 상세 내용을 보려면 '상세 조회 API'를 별도로 연동해야 할 수 있습니다.
              originalText: '', 
              correctedText: '',
              comment: '' 
            })) 
          : [];
                  setItems(mappedItems);
      } catch (error) {
        console.error("전문가 의뢰 내역 조회 실패:", error);
        setItems([]);
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
      <div className="w-full bg-[var(--color-white)] rounded-xl shadow-sm border border-gray-2 p-4 md:p-6">
        <div className="flex justify-start items-center mb-4 md:mb-6 gap-[8px]">
          <img src={FileIcon} alt="icon" className="w-6 h-6" />
          <h3 className="text-[length:var(--fs-subtitle1)] text-gray-9">전문가 의뢰 관리</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"> 
          {items.length > 0 ? (
            items.map((item) => (
              <div 
                key={item.id} 
                className="
                  bg-[var(--color-white)] border border-gray-2 rounded-xl 
                  flex flex-col items-start 
                  w-[272px] h-[192px] 
                  p-3 transition-all group cursor-pointer hover:shadow-md
                  flex-shrink-0
                "
              >
                <div className="relative w-full h-[100px] flex-none rounded-lg overflow-hidden bg-gray-1 mb-3">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge 
                      content={item.status === 'COMPLETED' ? "첨삭 완료" : "진행 중"}
                      size="small"
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
                    <p className="text-[length:var(--fs-subtitle2)] text-gray-9 truncate max-w-[120px]">
                      {item.expertName}
                    </p>
                    <p className="text-[length:var(--fs-button1)] text-gray-5 truncate max-w-[120px]">
                      {item.location}
                    </p>
                  </div>

                  <div onClick={(e) => { e.stopPropagation(); handleHistoryClick(item); }}>
                    <TextButton onClick={() => {}} variant="secondary" size="small">
                      <div className="flex items-center gap-1">
                        <span className="text-[length:var(--fs-button2)]">내역보기</span>
                        <img src={ChevIcon} alt="arrow" className="w-3 h-3 opacity-60" />
                      </div>
                    </TextButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full h-[192px] flex items-center justify-center text-gray-5 text-[length:var(--fs-body2)] w-full">
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