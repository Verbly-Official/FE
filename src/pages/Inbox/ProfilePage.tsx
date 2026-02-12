import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideMenu from '../../components/Nav/SideMenu';
import GNB from '../../components/Nav/GNB';
import { Avatar } from '../../components/Avatar/Avatar';
import { Badge } from '../../components/Badge/ContentBadge';
import { StarRating } from '../../components/Rating/StarRating';
import { useChatroom } from '../../hooks/useChatroom';
import MessageIcon from '../../assets/emoji/message1.svg';
import PersonPlusIcon from '../../assets/emoji/person-plus.svg';
import PersonIcon from '../../assets/emoji/person.svg';
import { InterestTag } from '../../components/Tag/InterestTag';
import LinearProgress from '../../components/ProgressIndicator/LinearProgress';
import { ReviewList } from './components/ReviewList';
import RequestCorrectionButton from '../../components/Button/RequestCorrectionButton';
import { getReviews, getReviewMeta } from '../../apis/review';
import type { Review, ReviewMeta } from '../../types/review';

const ProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { partner, isLoading: isChatLoading, error } = useChatroom(id || '');

    // Review State
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewMeta, setReviewMeta] = useState<ReviewMeta | null>(null);
    const [isReviewsLoading, setIsReviewsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchReviewData = async () => {
            if (!id) return;

            setIsReviewsLoading(true);
            try {
                const numericId = parseInt(id, 10);
                if (isNaN(numericId)) return;

                const [reviewsData, metaData] = await Promise.all([
                    getReviews(numericId),
                    getReviewMeta(numericId)
                ]);

                setReviews(reviewsData);
                setReviewMeta(metaData);
            } catch (err) {
                console.error('Failed to fetch review data:', err);
                // Handle error gracefully (maybe show empty state or toast)
            } finally {
                setIsReviewsLoading(false);
            }
        };

        fetchReviewData();
    }, [id]);

    if (isChatLoading) {
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
                <button
                    onClick={() => window.history.back()}
                    className="text-violet-600 font-medium hover:underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 bg-[#F8FAFC] overflow-hidden">
            <GNB variant="search" />

            <div className="flex flex-1 w-full overflow-hidden">
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
                                    <button
                                        onClick={() => navigate('/inbox')}
                                        className="h-[48px] px-8 border border-violet-50 rounded-[8px] flex items-center gap-2 bg-white hover:bg-violet-50 transition-colors"
                                    >
                                        <img src={MessageIcon} alt="Message" className="w-5 h-5 [filter:invert(30%)_sepia(84%)_saturate(3451%)_hue-rotate(248deg)_brightness(92%)_contrast(96%)]" />
                                        <span className="text-violet-50 text-lg font-semibold">Message</span>
                                    </button>

                                    <button
                                        onClick={() => setIsFollowing(!isFollowing)}
                                        className={`h-[48px] px-8 border border-violet-50 rounded-[8px] flex items-center gap-2 transition-colors ${isFollowing
                                            ? 'bg-violet-50 text-white hover:bg-violet-600'
                                            : 'bg-white text-violet-50 hover:bg-violet-50'
                                            }`}
                                    >
                                        <img
                                            src={isFollowing ? PersonIcon : PersonPlusIcon}
                                            alt={isFollowing ? 'Following' : 'Follow'}
                                            className={`w-5 h-5 ${isFollowing ? 'brightness-0 invert' : '[filter:invert(30%)_sepia(84%)_saturate(3451%)_hue-rotate(248deg)_brightness(92%)_contrast(96%)]'}`}
                                        />
                                        <span className="text-lg font-semibold">{isFollowing ? 'Following' : 'Follow'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="flex gap-8">
                            {/* Left: Reviews */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Reviews ({reviewMeta ? reviewMeta.reviewCount : 0})
                                </h3>
                                <div className="h-[1px] bg-gray-200 mb-6" />

                                {/* Review List */}
                                {isReviewsLoading ? (
                                    <div className="text-center py-10 text-gray-500">Loading reviews...</div>
                                ) : reviews.length > 0 ? (
                                    <ReviewList reviews={reviews} />
                                ) : (
                                    <div className="text-center py-10 text-gray-500">No reviews yet.</div>
                                )}
                            </div>

                            {/* Right: Sidebar Info */}
                            <div className="w-[320px] flex flex-col gap-6">
                                {/* Average Rating */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">AVERAGE RATING</h4>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl font-bold text-violet-600">
                                            {reviewMeta ? reviewMeta.reviewAverage.toFixed(1) : '0.0'}
                                        </span>
                                        <div className="flex flex-col gap-1">
                                            <StarRating rating={reviewMeta ? Math.round(reviewMeta.reviewAverage) : 0} readonly size={24} gap={8} />
                                            <span className="text-xs text-gray-400">
                                                {reviewMeta ? reviewMeta.reviewCount : 0} Reviews
                                            </span>
                                        </div>
                                    </div>
                                    <LinearProgress
                                        value={reviewMeta ? 100 - reviewMeta.rankPercentage : 0} // Assuming lower rank is better, so higher percentage is better? No, usually "Top 5%" means 95th percentile. If rankPercentage is 5, then it's top 5%.
                                        size="small"
                                        fillGradient="point"
                                        className="mb-2"
                                    />
                                    <span className="text-[10px] text-gray-400 block">
                                        Top {reviewMeta ? reviewMeta.rankPercentage : 0}% Rated
                                    </span>
                                </div>

                                {/* Interests - Still hardcoded as API doesn't provide this yet */}
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

export default ProfilePage;
