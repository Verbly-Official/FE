import React from 'react';
import { Text } from '../../../components/Text/Text';
import { UserProfile } from '../../../components/Profile/Profile';
import type { User } from '../../../types/user';

interface CorrectionContentProps {
  correction: {
    original: {
      textBefore: string;
      wrongText: string;
      textAfter: string;
    };
    corrected: {
      textBefore: string;
      correctText: string;
      textAfter: string;
    };
  };
  expert: User & { comment: string };
}

export const CorrectionContent: React.FC<CorrectionContentProps> = ({
  correction,
  expert,
}) => {
  return (
    <div className="bg-[var(--color-white)] border border-gray-2 rounded-xl p-4">
      <div className="space-y-4">
        {/* Original */}
        <div>
          <span className="text-[length:var(--fs-subtitle2)] text-gray-9 leading-relaxed">
            {correction.original.textBefore}
            <Text size="medium" state="wrong">
              {correction.original.wrongText}
            </Text>
            {correction.original.textAfter}
          </span>
        </div>

        {/* Corrected */}
        <div>
          <div className="text-[length:var(--fs-button2)] font-bold text-blue-50 mb-1 tracking-wide">CORRECTED</div>
          <span className="text-[length:var(--fs-subtitle2)] text-gray-9 leading-relaxed">
            {correction.corrected.textBefore}
            <Text size="medium" state="right">
              {correction.corrected.correctText}
            </Text>
            {correction.corrected.textAfter}
          </span>
        </div>

        {/* Expert Opinion */}
        <div className="bg-blue-90 border-l-4 border-blue-50 p-3">
          <div className="flex items-start flex-col gap-3">
            <UserProfile 
              size='small'
              data={expert}
            />
            <p className="text-[length:var(--fs-button2)] text-gray-7 leading-relaxed mt-1">
              {expert.comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};