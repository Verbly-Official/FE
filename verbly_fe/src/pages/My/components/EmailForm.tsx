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
  // '직접입력' 상태 여부 확인
  const isDirectInput = emailDomain?.value === 'write';

  const handleDomainChange = (selectedValue: string | number) => {
    // [Type Safety 수정] find가 undefined를 반환할 경우 null로 명시적 변환
    const selectedOption = emailOptions.find((opt) => opt.value === selectedValue) ?? null;
    
    onEmailDomainChange(selectedOption);

    // 직접 입력 모드가 아닐 경우 커스텀 도메인 값 초기화
    if (selectedValue !== 'write') {
      onCustomDomainChange('');
    }
  };

  // 직접 입력 모드 취소 (다시 Select 박스로 돌아가기)
  const handleResetDirectInput = () => {
    onEmailDomainChange(null); // 도메인 선택 초기화
    onCustomDomainChange('');  // 입력값 초기화
  };

  // UI 구조는 원본과 100% 동일하게 유지
  return (
    <div className="mb-8 md:mb-10 lg:mb-[40px]">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-3">
        <h2 className="text-base md:text-lg lg:text-[18px] font-semibold text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
          이메일
        </h2>
        
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-[12px]">
          {/* 이메일 아이디 입력 */}
          <div className="w-full sm:flex-1">
            <TextField
              value={emailId}
              onChange={(e) => onEmailIdChange(e.target.value)}
              placeholder="Verbly1234"
              className="w-full"
            />
          </div>
          
          {/* 도메인 선택 영역 (조건부 렌더링) */}
          <div className="w-full sm:flex-1 relative">
            {isDirectInput ? (
              // 1. 직접 입력 모드일 때
              <div className="relative w-full">
                <TextField
                  value={customEmailDomain}
                  onChange={(e) => onCustomDomainChange(e.target.value)}
                  // 원본 UI 의도대로 @를 포함한 예시 유지
                  placeholder="@example.com"
                  className="w-full"
                />
                {/* 원래대로(Select) 돌아가는 버튼 */}
                <button
                  type="button"
                  onClick={handleResetDirectInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="도메인 선택으로 돌아가기"
                >
                  <img src={CloseIcon} alt="reset" className="w-4 h-4 opacity-50 hover:opacity-100" />
                </button>
              </div>
            ) : (
              // 2. 일반 모드일 때: Select 컴포넌트 표시
              <Select
                options={emailOptions}
                // 값이 없을 때 null 대신 '' 처리 (Select 컴포넌트 타입에 따라 조정)
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