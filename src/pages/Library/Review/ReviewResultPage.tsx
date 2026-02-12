import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GNB from '../../../components/Nav/GNB';
import SideMenu from '../../../components/Nav/SideMenu';
import CircleProgress from '../../../components/ProgressIndicator/CircleProgress';
import LinearProgress from '../../../components/ProgressIndicator/LinearProgress';
import { ContentBadge } from './components/ContentBadge';
import { getQuizResult, retryMistakes, startQuizSession } from './api';
import type { QuizResultResponse } from './types';
import CloseIcon from '../../../assets/emoji/close.svg';
import Fire2Icon from '../../../assets/emoji/fire2.svg';
import ReloadIcon from '../../../assets/emoji/reload.svg';
import CautionIcon from '../../../assets/emoji/caution-outlined.svg';
import CheckIcon from '../../../assets/emoji/check-purple.svg';
import TrophyIcon from './emoji/trophy-3d.svg';

interface MistakeCardProps {
  mistake: {
    questionId: number;
    libraryItemId: number;
    phrase: string;
    prompt: string;
    userAnswerJson: Record<string, any>;
    correctAnswerKeyJson: Record<string, any>;
    explanation: string;
  };
  showExplanation?: boolean;
}

const MistakeCard = ({ mistake, showExplanation = false }: MistakeCardProps) => {
  const userAnswer = mistake.userAnswerJson?.answer || 'No answer';
  const correctAnswer = mistake.correctAnswerKeyJson?.answer || mistake.phrase;

  return (
    <div className="w-full bg-white border border-line1 rounded-[12px] p-[32px] flex flex-col gap-[24px] relative">
      {/* Red left border */}
      <div className="absolute left-0 top-0 bottom-0 w-[7px] bg-[#ef4444] rounded-l-[12px]" />

      {/* Question */}
      <div className="flex items-center gap-[4px] text-subtitle-semi20">
        <span>Q.</span>
        <span>{mistake.prompt}</span>
      </div>

      {/* Answer */}
      <div className="flex items-center gap-[4px]">
        <img src={CheckIcon} alt="check" className="w-[24px] h-[24px]" />
        <span className="text-subtitle-semi20 text-[#047857]">{correctAnswer}</span>
      </div>

      {/* Explanation */}
      {showExplanation && mistake.explanation && (
        <div className="border-t border-line1 pt-[20px] flex gap-[12px]">
          <img src={CautionIcon} alt="info" className="w-[24px] h-[24px] flex-shrink-0" />
          <p className="text-body1-medium16 text-gray-6">{mistake.explanation}</p>
        </div>
      )}
    </div>
  );
};

export const ReviewResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState<QuizResultResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = location.state?.sessionId as number;
    if (!sessionId) {
      navigate('/library');
      return;
    }

    fetchResult(sessionId);
  }, [location, navigate]);

  const fetchResult = async (sessionId: number) => {
    setIsLoading(true);
    try {
      const data = await getQuizResult(sessionId);
      setResult(data);
    } catch (error) {
      console.error('Failed to fetch quiz result:', error);
      alert('Failed to load quiz result');
      navigate('/library');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuit = () => {
    navigate('/library');
  };

  const handleRetryMistakes = async () => {
    if (!result) return;

    try {
      const newSession = await retryMistakes(result.sessionId);
      navigate('/review', { state: { session: newSession } });
    } catch (error) {
      console.error('Failed to retry mistakes:', error);
      alert('Failed to start retry session');
    }
  };

  const handleNewSession = async () => {
    try {
      const newSession = await startQuizSession();
      navigate('/review', { state: { session: newSession } });
    } catch (error) {
      console.error('Failed to start new session:', error);
      alert('Failed to start new session');
    }
  };

  if (isLoading || !result) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading results...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-bg0 overflow-hidden">
      {/* Header */}
      <GNB variant="search" />

      {/* Main Content Wrapper */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden md:flex flex-shrink-0 w-[200px] lg:w-[250px] xl:w-[280px] [&>div]:w-full [&>div]:px-[16px] md:[&>div]:px-[20px] lg:[&>div]:px-[24px] [&>div]:py-[32px] md:[&>div]:py-[40px] [&>div]:gap-[16px] md:[&>div]:gap-[20px] [&_div[class*='w-[221px]']]:!w-full [&_div[class*='h-[56px]']]:!h-[48px] [&_div[class*='h-[60px]']]:!h-[48px] [&_div[class*='text-[24px]']]:!text-[16px] md:[&_div[class*='text-[24px]']]:!text-[18px] [&_div[class*='px-[32px]']]:!px-[12px] md:[&_div[class*='px-[32px]']]:!px-[14px] [&_div[class*='py-[20px]']]:!py-[12px] md:[&_div[class*='py-[20px]']]:!py-[14px] bg-white">
          <SideMenu />
        </div>

        {/* Center Content - Mistakes List */}
        <div className="flex-1 overflow-y-auto px-[40px] py-[50px]">
          <div className="max-w-[984px] mx-auto flex flex-col gap-[92px]">
            {/* Header with Quit Button */}
            <div className="flex items-center gap-[12px]">
              <button
                onClick={handleQuit}
                className="flex items-center justify-center w-[40px] h-[40px] bg-violet-100 rounded-[8px] p-[8px] cursor-pointer"
              >
                <img src={CloseIcon} alt="close" className="w-[16px] h-[16px]" />
              </button>
              <span className="text-subtitle-semi20 text-gray-5">Quit</span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-[28px]">
              {/* Achievement Card */}
              <div className="bg-white border border-line1 rounded-[12px] p-[32px] flex items-center justify-between">
                <div className="flex flex-col gap-[24px] w-[362px]">
                  <div className="flex flex-col gap-[8px]">
                    <h1 className="text-[40px] font-bold leading-none bg-gradient-to-r from-violet-50 to-pink-40 bg-clip-text text-transparent">
                      Great Job!
                    </h1>
                    <p className="text-[14px] font-medium leading-none text-violet-20">
                      You completed today's review session.
                    </p>
                  </div>

                  <div className="bg-violet-100 rounded-[12px] p-[8px]">
                    <div className="flex gap-[12px] items-center">
                      <div className="flex items-center gap-[4px]">
                        <img src={Fire2Icon} alt="streak" className="w-[24px] h-[24px]" />
                        <span className="text-body2-semi15 text-violet-20">
                          {result.correctCount} / {result.totalQuestions} Correct
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Circle Progress */}
                <div className="relative w-[114px] h-[114px]">
                  <CircleProgress value={result.accuracyPercent} size="small" />
                </div>
              </div>

              {/* Mistakes Section */}
              {result.mistakes.length > 0 && (
                <div className="flex flex-col gap-[14px]">
                  <div className="flex items-center gap-[8px] p-[8px] rounded-[10px]">
                    <img src={CautionIcon} alt="mistakes" className="w-[24px] h-[24px]" />
                    <h2 className="text-title3-bold24 text-gray-7">
                      Review Mistakes ({result.mistakes.length})
                    </h2>
                  </div>

                  {/* Mistakes List */}
                  <div className="flex flex-col gap-[14px] max-h-[492px] overflow-y-auto">
                    {result.mistakes.map((mistake, index) => (
                      <MistakeCard
                        key={mistake.questionId}
                        mistake={mistake}
                        showExplanation={index === 0}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[445px] bg-white overflow-y-auto flex-shrink-0">
          <div className="p-[31px_31px_62px_31px] flex flex-col gap-[21px] items-center">
            {/* Achievement Banner */}
            <div className="w-full bg-bg1 border border-line1 rounded-[12px] p-[24px_20px] flex flex-col gap-[16px]">
              <div className="flex items-center gap-[16px]">
                <div className="p-[8px]">
                  <img src={Fire2Icon} alt="fire" className="w-[24px] h-[24px]" />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <span className="text-subtitle-semi20 text-blue-10">
                    {result.accuracyPercent}% Accuracy
                  </span>
                  <span className="text-body2-semi15 bg-gradient-4 bg-clip-text text-transparent">
                    {result.correctCount} out of {result.totalQuestions} correct!
                  </span>
                </div>
              </div>
              {/* Progress Bar */}
              <LinearProgress value={result.accuracyPercent} size="small" fillGradient="point" />
            </div>

            {/* Trophy Image */}
            <img src={TrophyIcon} alt="trophy" className="w-[225px] h-[225px]" />

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-[16px]">
              {result.mistakes.length > 0 && (
                <button
                  onClick={handleRetryMistakes}
                  className="w-full h-[60px] bg-violet-50 rounded-[8px] flex items-center justify-center gap-[6px] text-subtitle-semi18 text-white cursor-pointer hover:bg-violet-40"
                >
                  <img src={ReloadIcon} alt="reload" className="w-[18px] h-[18px] brightness-0 invert" />
                  Try Mistakes Again
                </button>
              )}

              <button
                onClick={handleNewSession}
                className="w-full h-[60px] border border-violet-80 rounded-[8px] flex items-center justify-center text-subtitle-semi18 text-violet-50 cursor-pointer hover:bg-violet-100"
              >
                Start New Session
              </button>

              <button
                onClick={handleQuit}
                className="text-btn1-semi14 text-gray-6 p-[4px] rounded-[4px] cursor-pointer"
              >
                Back to Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
