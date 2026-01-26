import React from 'react';
import NewspaperIcon from '../../img/L-Newspaper.svg';
import AcademicIcon from '../../img/L-Academic.svg';

export const DecorativeIcons: React.FC = () => {
  return (
    <div className="hidden xl:block pointer-events-none">
      {/* 뉴스페이퍼 아이콘 */}
      <img 
        src={NewspaperIcon} 
        alt="" 
        className="absolute -right-30 top-60 w-[500px] h-[500px] opacity-80 rotate-5"
      />
      {/* 학사모 아이콘 */}
      <img 
        src={AcademicIcon} 
        alt="" 
        className="absolute -right-50 top-40 w-[400px] h-[400px] opacity-80 -rotate-12"
      />
    </div>
  );
};