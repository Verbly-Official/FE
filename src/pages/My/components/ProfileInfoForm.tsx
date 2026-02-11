import React from 'react';
import { TextField } from '../../../components/TextArea/TextField';

interface ProfileInfoFormProps {
  name: string;
  introduction: string;
  onNameChange: (value: string) => void;
  onIntroChange: (value: string) => void;
}

export const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({
  name,
  introduction,
  onNameChange,
  onIntroChange,
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-6 md:mb-7 lg:mb-[28px]">
        <label className="text-[length:var(--fs-body2)] text-violet-50 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
          이름 (필수)
        </label>
        <div className="w-full">
          <TextField
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Name"
            className="w-full"
            maxLength={10} 
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-7 lg:gap-[28px]">
        <label className="text-[length:var(--fs-body2)] text-violet-50 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
          자기소개
        </label>
        <div className="w-full">
          <TextField
            value={introduction}
            onChange={(e) => onIntroChange(e.target.value)}
            placeholder="자기소개"
            className="w-full"
            maxLength={150} 
          />
        </div>
      </div>
    </>
  );
};