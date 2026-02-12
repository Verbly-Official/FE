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
        // [수정] Swagger 명세에 따라 파라미터명 변경 (corrector -> correctorType)
        const response = await getCorrections({ 
          sort: true,
          correctorType: 'NATIVE_SPEAKER' 
        });

        // [수정] 응답 구조 변경 대응 (result.corrections 사용)
        // getCorrections API 함수가 'result' 객체를 반환한다고 가정
        const sourceData = response.corrections || [];

        const mappedItems: ExpertItem[] = sourceData.map((item: CorrectionItem) => ({
          // [수정] API 필드 매핑 (correctionId, correctorName 등)
          id: item.correctionId ?? 0, 
          expertName: item.correctorName ?? 'Native Expert', 
          location: 'Global', // API에 지역 정보가 없다면 기본값 설정
          status: item.status ?? 'PENDING',
          imageUrl: undefined, // 프로필 이미지가 없다면 undefined (DefaultProfile 사용됨)
          title: item.title ?? '',
          
          // [주의] 목록 API에는 상세 내용(originalText, correctedText)이 포함되지 않는 경우가 많습니다.
          // 상세 내용은 "개별 조회 API"를 통해 가져오거나, 목록 API에 포함되어 있다면 해당 필드를 매핑해야 합니다.
          // 현재는 빈 값으로 처리합니다.
          originalText: '', 
          correctedText: '',
          comment: '' 
        }));

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
                  w-full sm:w-[272px] h-[192px] 
                  p-3 transition-all group cursor-pointer hover:shadow-md
                  flex-shrink-0
                "
              >
                <div className="relative w-full h-[100px] flex-none rounded-lg overflow-hidden bg-gray-1 mb-3">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge 
                      content={item.status === 'COMPLETED' ? "첨삭 완료" : "진행 중"}
                      size="small"
                      className={item.status === 'COMPLETED' ? "bg-primary-5 text-primary-500" : "bg-blue-50 text-blue-500"}
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