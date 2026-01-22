import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatroom } from '../../../hooks/useChatroom';
import { Avatar } from '../../../components/Avatar/Avatar';
import { Badge } from '../../../components/Badge/ContentBadge';
import OutlinedButton from '../../../components/Button/OutlinedButton';
import FollowButton from '../../../components/Button/FollowButton';
import PersonIcon from '../../../assets/emoji/person.svg';
import EditIcon from '../../../assets/emoji/edit.svg';
import RequestCorrectionButton from '../../../components/Button/RequestCorrectionButton';

import { UserProfile } from '../../../components/Profile/Profile';

interface ChatProfileSidebarProps {
    chatroomId: string;
}

import { InterestTag } from '../../../components/Tag/InterestTag';

export const ChatProfileSidebar: React.FC<ChatProfileSidebarProps> = ({ chatroomId }) => {
    const { partner } = useChatroom(chatroomId);
    const navigate = useNavigate();

    if (!partner) return null;

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Profile Section */}
            <div className="flex flex-col items-center px-6 py-10 border-b border-gray-100">
                <div className="relative mb-4">
                    <Avatar src={partner.avatarUrl} className="w-[160px] h-[160px]" />
                </div>

                <h2 className="text-title3-bold24 text-gray-10 mb-1">{partner.name}</h2>
                <p className="text-body1-medium16 text-gray-500 mb-4">New york, USA</p>

                <Badge
                    content="Native Speaker"
                    size="medium"
                    className="!bg-blue-100 !text-violet-50"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 px-6 py-6 border-b border-gray-100">
                {/* Custom Request Correction Button */}
                <RequestCorrectionButton
                    className="self-stretch"
                    onClick={() => console.log('Request Correction clicked')}
                />

                <OutlinedButton
                    size="medium"
                    iconSrc={PersonIcon}
                    label="View Profile"
                    className="w-full !text-violet-50 !border-violet-50 !text-subtitle6-semi18 [&>img]:[filter:invert(30%)_sepia(84%)_saturate(3451%)_hue-rotate(248deg)_brightness(92%)_contrast(96%)]"
                    onClick={() => navigate(`/profile/${chatroomId}`)}
                />

                <OutlinedButton
                    size="medium"
                    iconSrc={EditIcon}
                    label="Review"
                    className="w-full !text-violet-50 !border-violet-50 !text-subtitle6-semi18 [&>img]:[filter:invert(30%)_sepia(84%)_saturate(3451%)_hue-rotate(248deg)_brightness(92%)_contrast(96%)]"
                    onClick={() => navigate(`/review/${chatroomId}`)}
                />
            </div>

            {/* Interests Section */}
            <div className="px-6 py-6 border-b border-gray-100">
                <h3 className="text-btn1-semi14 text-gray-5 uppercase tracking-wider mb-4">INTERESTS</h3>
                <div className="flex flex-wrap gap-2">
                    {['K-POP', 'Travel', 'Teachiner', 'Food', 'Food', 'K-POP', 'Teachiner', 'Travel'].map((interest, index) => (
                        <InterestTag key={index} label={interest} />
                    ))}
                </div>
            </div>

            {/* Recommended Section */}
            <div className="px-6 py-6">
                <h3 className="text-btn1-semi14 text-gray-5 uppercase tracking-wider mb-4">RECOMMENDED</h3>
                <div className="flex flex-col gap-4">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <UserProfile
                                size="small"
                                data={{
                                    id: index.toString(),
                                    name: 'Mark',
                                    introduction: 'Teacher',
                                    profileImg: '',
                                    role: 'FOREIGNER'
                                }}
                            />
                            <FollowButton />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatProfileSidebar;
