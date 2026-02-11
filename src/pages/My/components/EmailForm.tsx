import React from 'react';
import { TextField } from '../../../components/TextArea/TextField';
import Select, { type Option } from '../../../components/Select/Select';
import CloseIcon from '../../../assets/emoji/close.svg';

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

  const handleDomainChange = (selectedValue: string | number) => {
    const selectedOption = emailOptions.find((opt) => opt.value === selectedValue) ?? null;
    
    onEmailDomainChange(selectedOption);

    if (selectedValue !== 'write') {
      onCustomDomainChange('');
    }
  };

  const handleResetDirectInput = () => {
    onEmailDomainChange(null);
    onCustomDomainChange('');
  };

  return (
    <div className="mb-8 md:mb-10 lg:mb-[40px]">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-3">
        <h2 className="text-[length:var(--fs-subtitle1)] text-violet-50 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
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
          
          <div className="w-full sm:flex-1 relative">
            {isDirectInput ? (
              <div className="relative w-full">
                <TextField
                  value={customEmailDomain}
                  onChange={(e) => onCustomDomainChange(e.target.value)}
                  placeholder="@example.com"
                  className="w-full"
                />
                <button
                  type="button"
                  onClick={handleResetDirectInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full"
                  aria-label="도메인 선택으로 돌아가기"
                >
                  <img src={CloseIcon} alt="reset" className="w-4 h-4 opacity-50 hover:opacity-100" />
                </button>
              </div>
            ) : (
              <Select
                options={emailOptions}
                value={emailDomain?.value ?? ''}
                placeholder="직접입력"
                size='medium'
                onChange={handleDomainChange}
                className='w-full'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};