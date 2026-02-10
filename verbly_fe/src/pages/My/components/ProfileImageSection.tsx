import React, { useRef } from 'react';
import { IconButton } from '../../../components/Button/IconButton';
import EditIcon from '../../../assets/emoji/edit.svg';
// ✅ [추가] 기본 프로필 이미지 임포트
import DefaultProfile from '../../../components/Profile/img/large.svg';

interface ProfileImageSectionProps {
  previewImg: string;
  onImageUpload: (file: File) => void;
}

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  previewImg,
  onImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-7 lg:gap-[28px] mb-6 md:mb-8 lg:mb-[32px]">
      <h2 className="text-base md:text-lg lg:text-[18px] font-semibold text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
        프로필
      </h2>
      
      <div className="relative w-full sm:w-auto">
        <img 
          // ✅ [수정] previewImg가 빈 문자열이면 DefaultProfile 사용
          src={previewImg || DefaultProfile} 
          alt="프로필 이미지" 
          className="w-32 h-32 md:w-40 md:h-40 lg:w-[160px] lg:h-[160px] rounded-full object-cover border-2 border-gray-200 mx-auto sm:mx-0 bg-gray-50" 
          // ✅ [추가] 이미지 로드 실패 시에도 기본 이미지로 대체
          onError={(e) => {
            e.currentTarget.src = DefaultProfile;
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <div className="absolute bottom-0 right-0 sm:bottom-[4px] sm:right-[4px]">
          <IconButton
            iconSrc={EditIcon}
            ariaLabel="edit-profile-image"
            size="medium"
            shape="round"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white shadow-md border border-gray-200 hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};