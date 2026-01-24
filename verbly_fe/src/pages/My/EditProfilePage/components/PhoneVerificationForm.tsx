import React from 'react';
import { TextField } from '../../../../components/TextArea/TextField';
import OutlinedButton from '../../../../components/Button/OutlinedButton';

interface PhoneVerificationFormProps {
  phone: string;
  verificationCode: string;
  isVerificationSent: boolean;
  timer: number;
  onPhoneChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onSendVerification: () => void;
}

export const PhoneVerificationForm: React.FC<PhoneVerificationFormProps> = ({
  phone,
  verificationCode,
  isVerificationSent,
  timer,
  onPhoneChange,
  onVerificationCodeChange,
  onSendVerification,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-4 lg:mb-[16px]">
        <h2 className="text-base md:text-lg lg:text-[18px] font-semibold text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
          전화번호
        </h2>
        
        <div className="w-full">
          <TextField
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+82 010-1234-5678"
            className="w-full"
          />
        </div>
      </div>

      {/* 인증번호 발송 및 입력 */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px]">
        <div className="w-full sm:w-20 lg:w-[80px] flex-shrink-0"></div>
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-[12px]">
          <OutlinedButton 
            variant="assistive" 
            size="small"
            label={isVerificationSent ? "재발송" : "인증번호 발송"}
            onClick={onSendVerification}
            className="whitespace-nowrap w-full sm:w-auto"
          />
          <div className="flex items-center gap-3 lg:gap-[12px] w-full">
            <div className="flex-1">
              <TextField
                value={verificationCode}
                onChange={(e) => onVerificationCodeChange(e.target.value)}
                placeholder="인증번호 입력"
                className="w-full"
                disabled={!isVerificationSent}
              />
            </div>
            {isVerificationSent && timer > 0 && (
              <span className="text-sm lg:text-[14px] text-violet-500 font-medium whitespace-nowrap">
                {formatTime(timer)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};