import React from 'react';
import { InteractionIcon } from '../../../components/Interaction/InteractionIcon';
import SolidButton from '../../../components/Button/SolidButton';
import { UserProfile } from '../../../components/Profile/Profile';
import type { User } from '../../../types/user';

interface StudentHeaderProps {
  student: User;
  isBookmarked: boolean;
  onBookmarkToggle: (value: boolean) => void;
  showActions?: boolean;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  student,
  isBookmarked,
  onBookmarkToggle,
  showActions = false,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <UserProfile 
            size='small'
            data={student} 
          />
        </div>
        <div className="flex items-center gap-2">
          {showActions && (
            <>
              <SolidButton
                variant="primary"
                size="medium"
                label='첨삭한 내용에 만족'
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
              />
              <SolidButton 
                variant="primary"
                size="medium"
                label='추가 문의하기'
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
              />
            </>
          )}
          <InteractionIcon 
            type="bookmark" 
            selected={isBookmarked} 
            onToggle={onBookmarkToggle} 
          />
        </div>
      </div>
    </div>
  );
};