import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/Header/Header';
import SideMenu from '../../../components/Nav/SideMenu';
import LinearProgress from '../../../components/ProgressIndicator/LinearProgress';
import { QuizQuestionCard } from './components/QuizQuestionCard';
import { MOCK_QUIZ_QUESTIONS, MOCK_DAILY_REVIEW_STATS } from './mockData';
import CloseIcon from '../../../assets/emoji/close.svg';
import ArrowIcon from '../../../assets/emoji/arrow-front.svg';
import FireIcon from '../../../assets/emoji/fire1.svg';

export const ReviewPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const stats = MOCK_DAILY_REVIEW_STATS;

  const currentQuestion = MOCK_QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = currentQuestionIndex + 1;

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
    if (currentQuestionIndex < MOCK_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(undefined);
    } else {
      // 퀴즈 완료 - 결과 페이지로 이동
      navigate('/review/result');
    }
  };

  const handleQuit = () => {
    navigate('/library');
  };

  const progressPercentage = (progress / MOCK_QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col flex-1 bg-bg0 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content Wrapper */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden md:flex flex-shrink-0 w-[200px] lg:w-[250px] xl:w-[280px] [&>div]:w-full [&>div]:px-[16px] md:[&>div]:px-[20px] lg:[&>div]:px-[24px] [&>div]:py-[32px] md:[&>div]:py-[40px] [&>div]:gap-[16px] md:[&>div]:gap-[20px] [&_div[class*='w-[221px]']]:!w-full [&_div[class*='h-[56px]']]:!h-[48px] [&_div[class*='h-[60px]']]:!h-[48px] [&_div[class*='text-[24px]']]:!text-[16px] md:[&_div[class*='text-[24px]']]:!text-[18px] [&_div[class*='px-[32px]']]:!px-[12px] md:[&_div[class*='px-[32px]']]:!px-[14px] [&_div[class*='py-[20px]']]:!py-[12px] md:[&_div[class*='py-[20px]']]:!py-[14px] bg-white">
          <SideMenu />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-[8px] lg:gap-[12px] px-[16px] md:px-[16px] lg:px-[20px] py-[20px] md:py-[24px] lg:py-[28px] overflow-y-auto overflow-hidden">
          {/* Main Content (centered) */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[980px] flex-1 flex flex-col gap-[20px] md:gap-[24px] lg:gap-[28px] min-w-0 overflow-hidden">
            {/* Header with Quit Button */}
            <div className="flex gap-[12px] items-center">
              <button
                onClick={handleQuit}
                className="bg-violet-100 p-[8px] rounded-[8px] cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center w-[40px] h-[40px]"
              >
                <img src={CloseIcon} alt="Close" className="w-[16px] h-[16px]" style={{ filter: 'invert(30%) sepia(45%) saturate(1500%) hue-rotate(260deg)' }} />
              </button>
              <span className="text-subtitle6-semi18 text-gray-5">Quit</span>
            </div>

            {/* Quiz Container */}
            <div className="flex flex-col gap-[34px] overflow-y-auto">
              {/* Title */}
              <div className="bg-gradient-to-r from-violet-50 to-pink-40 bg-clip-text text-transparent">
                <h1 className="text-[40px] font-bold leading-none">Today's Review</h1>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-[36px] items-center">
                <div className="flex-1 max-w-[870px]">
                  <LinearProgress value={progressPercentage} size="small" fillGradient="main" className="max-w-full" />
                </div>

                {/* Progress Text */}
                <div className="flex gap-[8px] items-center text-title3-bold24 text-gray-9 flex-shrink-0">
                  <span>{progress}</span>
                  <span>/</span>
                  <span>{MOCK_QUIZ_QUESTIONS.length}</span>
                </div>
              </div>

              {/* Quiz Question Card */}
              <QuizQuestionCard
                question={currentQuestion}
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={selectedAnswer}
              />

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="px-[32px] py-[20px] rounded-[8px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex gap-[6px] items-center justify-center h-[60px]"
                  style={{ backgroundColor: '#713DE3' }}
                >
                  <img src={ArrowIcon} alt="Arrow" className="w-[18px] h-[18px]" style={{ filter: 'brightness(0) invert(1)' }} />
                  <span className="text-white font-semibold text-[18px]">Next</span>
                </button>
              </div>
            </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:flex w-[260px] xl:w-[280px] flex-shrink-0 flex-col gap-[16px] overflow-y-auto">
            {/* Daily Goal Card */}
            <div className="bg-white border border-line1 rounded-[12px] p-[24px] flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <span className="text-btn1-semi14 text-gray-5 uppercase">Daily Goal</span>

                {/* Progress Circle */}
                <div className="relative w-[245px] h-[244px] flex items-center justify-center">
                  <svg
                    className="transform -rotate-90"
                    width="245"
                    height="244"
                    viewBox="0 0 245 244"
                    fill="none"
                  >
                    <circle
                      cx="122.5"
                      cy="122"
                      r="110"
                      stroke="#E6E6E6"
                      strokeWidth="3"
                    />
                    <circle
                      cx="122.5"
                      cy="122"
                      r="110"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeDasharray={`${(stats.accuracy / 100) * 690} 690`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#713DE3" />
                        <stop offset="100%" stopColor="#FF7395" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Text */}
                  <div className="absolute flex flex-col items-center gap-[5px]">
                    <span className="bg-gradient-to-r from-violet-50 to-pink-40 bg-clip-text text-transparent text-[24px] font-bold">
                      {stats.accuracy}
                    </span>
                    <span className="text-gray-5 text-btn1-semi14">/100 words</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Streak Card */}
            <div className="bg-white border border-line1 rounded-[12px] p-[24px] flex flex-col gap-[12px]">
              <span className="text-btn1-semi14 text-gray-5 uppercase">Current Streak</span>

              <div className="bg-violet-100 border border-bg2 rounded-[12px] p-[16px] flex items-center justify-between">
                <div className="flex gap-[12px] items-center">
                  <div className="w-[30px] h-[34px] flex items-center justify-center">
                    <img src={FireIcon} alt="Fire" className="w-[26px] h-[26px]" />
                  </div>

                  <div className="flex flex-col gap-[4px]">
                    <div className="bg-gradient-to-r from-violet-50 to-blue-50 bg-clip-text text-transparent text-[20px] font-semibold">
                      {stats.streak} in a row!
                    </div>
                    <div className="text-blue-50 text-body2-semi15">
                      Keep it up! {stats.streakBonus}
                    </div>
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
