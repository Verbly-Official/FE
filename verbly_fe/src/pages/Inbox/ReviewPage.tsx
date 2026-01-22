import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SideMenu from '../../components/Nav/SideMenu';
import { Header } from '../../components/Header/Header';
import { Avatar } from '../../components/Avatar/Avatar';
import { Badge } from '../../components/Badge/ContentBadge';
import { StarRating } from '../../components/Rating/StarRating';
import OutlinedButton from '../../components/Button/OutlinedButton';
import { useChatroom } from '../../hooks/useChatroom';
import { mockReviews } from './mocks/reviewData';
import { useNavigate } from 'react-router-dom';

import { mockChatrooms } from './mocks/chatData';
import MessageIcon from '../../assets/emoji/message1.svg';
import PersonPlusIcon from '../../assets/emoji/person-plus.svg';
import PersonIcon from '../../assets/emoji/person.svg';
import { InterestTag } from '../../components/Tag/InterestTag';
import SolidButton from '../../components/Button/SolidButton';
import LinearProgress from '../../components/ProgressIndicator/LinearProgress';
import TextArea from '../../components/TextArea/TextArea';
import { ReviewList } from './components/ReviewList';
import RequestCorrectionButton from '../../components/Button/RequestCorrectionButton';


const ReviewPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { partner: hookPartner, isLoading, error } = useChatroom(id || '');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState(mockReviews);
    const [isFollowing, setIsFollowing] = useState(false);

    // Fallback partner lookup if hook fails
    const partner = hookPartner || mockChatrooms.find(
        (room) => room.id.toString() === id || room.partner.id === id
    )?.partner;

    console.log('ReviewPage - id:', id);
    console.log('ReviewPage - hookPartner:', hookPartner);
    console.log('ReviewPage - fallback partner:', partner);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="text-gray-400 text-lg">Loading...</div>
            </div>
        );
    }

    if (!partner) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4">
                <div className="text-gray-400 text-lg">
                    {error || `Partner not found (ID: ${id})`}
                </div>
                <div className="text-xs text-gray-300">
                    Available IDs: {mockChatrooms.map(r => r.partner.id).join(', ')}
                </div>
                <button
                    onClick={() => window.history.back()}
                    className="text-violet-600 font-medium hover:underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const handleSubmitReview = () => {
        if (rating === 0 || !comment.trim()) {
            alert('별점과 리뷰 내용을 입력해주세요.');
            return;
        }

        const newReview = {
            id: Date.now(),
            author: 'Me',
            role: 'Student',
            rating: rating,
            date: 'Just now',
            content: comment.trim(),
            avatarUrl: ''
        };

        setReviews([newReview, ...reviews]);
        setRating(0);
        setComment('');
        alert('리뷰가 등록되었습니다!');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <div className="flex w-full max-w-[1920px] mx-auto h-[calc(100vh-64px)]">
                <SideMenu variant="default" />

                <div className="flex-1 overflow-y-auto px-10 py-8">
                    <div className="max-w-[1200px] mx-auto">

                        {/* Profile Header Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 flex items-start gap-8">
                            <Avatar src={partner.avatarUrl} className="w-[180px] h-[180px]" />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <h1 className="text-[32px] font-bold text-gray-900">{partner.name}</h1>
                                    <Badge content="Native (US)" size="medium" className="!bg-[#E6EEFF] !text-[#4D7CFF] !rounded-[4px]" />
                                    <Badge content="TOP TUTOR" size="medium" className="!bg-[#E6EEFF] !text-[#4D7CFF] !rounded-[4px]" />
                                </div>
                                <p className="text-lg text-gray-500 mb-8 max-w-[800px] leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur. Ornare velit massa adipiscing consequat semper a sed diam felis. Proin tortor dictumst bibendum nisl tempus enim maecenas
                                </p>
                                <div className="flex gap-4">
                                    <RequestCorrectionButton
                                        onClick={() => console.log('Request Correction clicked')}
                                    />
                                    <OutlinedButton
                                        size="medium"
                                        iconSrc={MessageIcon}
                                        label="Message"
                                        className="!h-[48px] !px-8 !text-violet-50 !border-violet-50 !text-lg !font-semibold [&>img]:[filter:invert(30%)_sepia(84%)_saturate(3451%)_hue-rotate(248deg)_brightness(92%)_contrast(96%)]"
                                        onClick={() => navigate('/inbox')}
                                    />
                                    <OutlinedButton
                                        size="medium"
                                        iconSrc={isFollowing ? PersonIcon : PersonPlusIcon}
                                        label={isFollowing ? 'Following' : 'Follow'}
                                        className={`!h-[48px] !px-8 !text-lg !font-semibold transition-all ${isFollowing
                                            ? '!bg-violet-50 !text-white !border-violet-50 [&>img]:brightness-0 [&>img]:invert'
                                            : '!text-violet-50 !border-violet-50 [&>img]:[filter:invert(30%)_sepia(84%)_saturate(3451%)_hue-rotate(248deg)_brightness(92%)_contrast(96%)]'
                                            }`}
                                        onClick={() => setIsFollowing(!isFollowing)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="flex gap-8">
                            {/* Left: Reviews */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews ({reviews.length + 125})</h3>
                                <div className="h-[1px] bg-gray-200 mb-6" />

                                {/* Write Review Box */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-gray-700">해당 튜터에 만족하셨나요?</span>
                                        <SolidButton
                                            size="small"
                                            label="Completed"
                                            onClick={handleSubmitReview}
                                            className="!rounded-lg !text-sm !font-bold"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <StarRating rating={rating} onRatingChange={setRating} size={24} gap={8} />
                                    </div>
                                    <TextArea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="글을 적어주세요..."
                                        className="!border-gray-200 !bg-gray-50"
                                        maxRows={8}
                                    />
                                </div>

                                {/* Review List */}
                                <ReviewList reviews={reviews} />
                            </div>

                            {/* Right: Sidebar Info */}
                            <div className="w-[320px] flex flex-col gap-6">
                                {/* Average Rating */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">AVERAGE RATING</h4>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl font-bold text-violet-600">4.9</span>
                                        <div className="flex flex-col gap-1">
                                            <StarRating rating={5} readonly size={24} gap={8} />
                                            <span className="text-xs text-gray-400">128 Reviews</span>
                                        </div>
                                    </div>
                                    <LinearProgress
                                        value={85}
                                        size="small"
                                        fillGradient="point"
                                        className="mb-2"
                                    />
                                    <span className="text-[10px] text-gray-400 block">Top 5% Rated</span>
                                </div>

                                {/* Interests */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">INTERESTS</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['K-POP', 'Travel', 'Teachiner', 'Food', 'Food', 'K-POP', 'Teachiner', 'Travel', 'Food', 'K-POP', 'Teachiner', 'Travel'].map((interest, index) => (
                                            <InterestTag key={index} label={interest} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
