import React from 'react';
import { TextField } from '../../../components/TextArea/TextField';
import OutlinedButton from '../../../components/Button/OutlinedButton';

interface PhoneVerificationFormProps {
  phone: string;
  verificationCode: string;
  isVerificationSent: boolean;
  isVerified: boolean;
  timer: number;
  onPhoneChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onSendVerification: () => void;
  onVerify: () => void;
}

export const PhoneVerificationForm: React.FC<PhoneVerificationFormProps> = ({
  phone,
  verificationCode,
  isVerificationSent,
  isVerified,
  timer,
  onPhoneChange,
  onVerificationCodeChange,
  onSendVerification,
  onVerify,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-4 lg:mb-[16px]">
        <h2 className="text-[length:var(--fs-subtitle1)] text-violet-50 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
          전화번호
        </h2>
        
        <div className="w-full">
          <TextField
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="01012345678"
            className="w-full"
            maxLength={13}
            disabled={isVerified}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px]">
        <div className="w-full sm:w-20 lg:w-[80px] flex-shrink-0"></div>
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-[12px]">
          <OutlinedButton 
            variant="assistive" 
            size="small"
            label={isVerificationSent ? "재발송" : "인증번호 발송"}
            onClick={onSendVerification}
            disabled={isVerified}
            className="whitespace-nowrap w-full sm:w-auto"
          />
          <div className="flex items-center gap-3 lg:gap-[12px] w-full">
            <div className="flex-1 flex gap-2">
              <TextField
                value={verificationCode}
                onChange={(e) => onVerificationCodeChange(e.target.value)}
                placeholder="인증번호 6자리"
                className="w-full"
                disabled={!isVerificationSent || isVerified}
                maxLength={6}
              />
              {isVerificationSent && !isVerified && (
                <OutlinedButton 
                  variant="assistive"
                  size="small"
                  label="확인"
                  onClick={onVerify}
                  className="whitespace-nowrap"
                />
              )}
            </div>
            {isVerificationSent && !isVerified && timer > 0 && (
              <span className="text-[length:var(--fs-body2)] text-violet-50 whitespace-nowrap min-w-[40px]">
                {formatTime(timer)}
              </span>
            )}
            {isVerified && (
               <span className="text-[length:var(--fs-body2)] text-main-100 whitespace-nowrap font-medium">
                인증완료
               </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};