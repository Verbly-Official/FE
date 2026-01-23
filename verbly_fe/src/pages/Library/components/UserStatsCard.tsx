import React from 'react';
import { UserProfile } from '../../../components/Profile/Profile';
import FireIcon from '../../../assets/emoji/fire2.svg';
import PersonIcon from '../../../assets/emoji/person.svg';
import PointIcon from '../../../assets/emoji/point.svg';
import DefaultProfileIcon from '../../../components/Profile/img/basicProfile.svg'; // Correct default profile image

interface UserStatsCardProps {
    userData: {
        id: string;
        name: string;
        level?: number;
        profileImg: string;
        introduction: string;
        role: 'FOREIGNER' | 'KOREAN';
    };
    stats: {
        follow: number;
        streak: number;
        point: number;
        correctionReceived: number;
    };
}

export const UserStatsCard: React.FC<UserStatsCardProps> = ({ userData, stats }) => {
    const displayUser = {
        ...userData,
        profileImg: userData.profileImg || DefaultProfileIcon
    };

    return (
        <div className="bg-white p-[24px] rounded-[16px] border border-gray-100 flex flex-col items-center gap-[24px] shadow-sm">
            {/* UserProfile - 이미지 크기 120px로 조정 */}
            <div className="[&_img]:!w-[120px] [&_img]:!h-[120px] [&_h2]:!text-[20px] [&_span]:!text-[14px]">
                <UserProfile size="large" data={displayUser} />
            </div>

            {/* Stats Grid - 아이콘 -> 텍스트 -> 숫자 순서 */}
            <div className="grid grid-cols-3 w-full border-t border-gray-100 pt-[24px] gap-[8px]">
                <div className="flex flex-col items-center gap-[4px]">
                    <img src={PersonIcon} alt="follow" className="w-[24px] h-[24px] opacity-40" />
                    <span className="text-[14px] text-gray-5 font-medium">Follow</span>
                    <span className="text-[20px] font-bold text-gray-10">{stats.follow}</span>
                </div>
                <div className="flex flex-col items-center gap-[4px] border-x border-gray-100">
                    <img src={FireIcon} alt="streak" className="w-[24px] h-[24px] opacity-40" />
                    <span className="text-[14px] text-gray-5 font-medium">Streak</span>
                    <span className="text-[20px] font-bold text-gray-10">{stats.streak}</span>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                    <img src={PointIcon} alt="point" className="w-[24px] h-[24px] opacity-40" />
                    <span className="text-[14px] text-gray-5 font-medium">Point</span>
                    <span className="text-[20px] font-bold text-gray-10">{stats.point}</span>
                </div>
            </div>

            {/* Correction Received */}
            <div className="w-full flex flex-col gap-[12px]">
                <span className="text-[16px] font-bold text-gray-8 text-left">Correction</span>
                <div className="bg-violet-100 p-[16px] rounded-[12px] flex flex-col items-center justify-center gap-[4px] h-[80px]">
                    <span className="text-[24px] font-bold text-violet-50">{stats.correctionReceived}</span>
                    <span className="text-[14px] text-violet-50 opacity-70">Received</span>
                </div>
            </div>
        </div>
    );
};
