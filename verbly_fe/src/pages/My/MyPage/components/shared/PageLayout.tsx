import React from 'react';
import { Header } from '../../../../../components/Header/Header';
import SideMenu from '../../../../../components/Nav/SideMenu';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 헤더 */}
      <div className="w-full max-w-[1920px] mx-auto relative z-50">
        <Header />
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 사이드 메뉴 */}
        <div className="relative z-40">
          <SideMenu variant="default" />
        </div>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-[32px] overflow-x-hidden relative min-h-[calc(100vh-60px)]">
          {children}
        </main>
      </div>
    </div>
  );
};