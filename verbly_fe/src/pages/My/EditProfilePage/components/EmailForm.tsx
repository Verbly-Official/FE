import React from 'react';
import { TextField } from '../../../../components/TextArea/TextField';
import Select, { type Option } from '../../../../components/Select/Select';

interface EmailFormProps {
  emailId: string;
  emailDomain: Option | null;
  customEmailDomain: string;
  onEmailIdChange: (value: string) => void;
  onEmailDomainChange: (option: Option | null) => void;
  onCustomDomainChange: (value: string) => void;
  emailOptions: Option[];
}

export const EmailForm: React.FC<EmailFormProps> = ({
  emailId,
  emailDomain,
  customEmailDomain,
  onEmailIdChange,
  onEmailDomainChange,
  onCustomDomainChange,
  emailOptions,
}) => {
  const isDirectInput = emailDomain?.value === 'write';

  const handleDomainChange = (val: Option | null) => {
    onEmailDomainChange(val);
    if (val?.value !== 'write') {
      onCustomDomainChange('');
    }
  };

  return (
    <div className="mb-8 md:mb-10 lg:mb-[40px]">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-3">
        <h2 className="text-base md:text-lg lg:text-[18px] font-semibold text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
          이메일
        </h2>
        
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-[12px]">
          <div className="w-full sm:flex-1">
            <TextField
              value={emailId}
              onChange={(e) => onEmailIdChange(e.target.value)}
              placeholder="Verbly1234"
              className="w-full"
            />
          </div>
          <span className="text-gray-400 text-base hidden sm:inline">@</span>
          <div className="w-full sm:flex-1">
            <Select
              options={emailOptions}
              placeholder="직접입력"
              onChange={handleDomainChange}
            />
          </div>
        </div>
      </div>

      {/* 직접입력 선택 시 도메인 입력 필드 */}
      {isDirectInput && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px]">
          <div className="w-full sm:w-20 lg:w-[80px] flex-shrink-0"></div>
          <div className="w-full">
            <TextField
              value={customEmailDomain}
              onChange={(e) => onCustomDomainChange(e.target.value)}
              placeholder="example.com"
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};