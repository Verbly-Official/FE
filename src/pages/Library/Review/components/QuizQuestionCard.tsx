import React from 'react';
import type { QuizQuestion } from '../types';

interface QuizQuestionCardProps {
  question: QuizQuestion;
  onSelectAnswer: (optionId: string) => void;
  selectedAnswer?: string;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  onSelectAnswer,
  selectedAnswer,
}) => {
  const options = question.options || [];
  
  return (
    <div className="bg-white border border-line1 rounded-[12px] p-[32px] flex flex-col gap-[48px] w-full h-[404px]">
      {/* Header - Question Type */}
      <div className="flex flex-col gap-[12px]">
        <div className="bg-blue-90 rounded-[4px] px-[8px] py-[4px] inline-flex w-fit">
          <span className="text-btn1-semi14 text-blue-50">FILL IN THE BLANK</span>
        </div>

        {/* Question Sentence */}
        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-[4px] items-center flex-wrap">
            <span className="text-title3-bold24 text-gray-9">I</span>
            
            {/* Answer Input */}
            <div className="border-b-[3px] border-violet-50 px-[9px] py-[5px]">
              <span className="text-title3-bold24 text-violet-50">
                {question.answer}
              </span>
            </div>

            <span className="text-title3-bold24 text-gray-9">
              the Han River with my friends last weekend.
            </span>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex flex-col gap-[24px]">
        {options.length > 0 ? (
          <>
            {/* Row 1 */}
            <div className="flex gap-[24px]">
                {options.slice(0, 2).map((option, idx) => (
                  <button
                    key={option.id}
                    onClick={() => onSelectAnswer(option.id)}
                    className={`flex-1 h-[84px] px-[24px] py-[16px] rounded-[8px] border-[2px] transition-all cursor-pointer flex gap-[15px] items-center ${
                    selectedAnswer === option.id
                      ? 'bg-violet-90 border-violet-50'
                      : 'bg-white border-gray-4 hover:bg-violet-90 hover:border-violet-50'
                  }`}
                >
                  {/* Number Circle */}
                  <div
                    className={`w-[28px] h-[28px] rounded-[8px] border-[2px] flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedAnswer === option.id
                        ? 'bg-white border-violet-50'
                        : 'bg-white border-gray-4'
                    }`}
                  >
                    <span
                      className={`text-btn1-semi14 ${
                        selectedAnswer === option.id
                          ? 'text-violet-50'
                          : 'text-gray-7'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  
                  {/* Option Text */}
                  <span
                    className={`text-subtitle6-semi18 ${
                      selectedAnswer === option.id
                        ? 'text-violet-50'
                        : 'text-gray-7'
                    }`}
                  >
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-[24px]">
              {options.slice(2, 4).map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => onSelectAnswer(option.id)}
                  className={`flex-1 h-[84px] px-[24px] py-[16px] rounded-[8px] border-[2px] transition-all cursor-pointer flex gap-[15px] items-center ${
                    selectedAnswer === option.id
                      ? 'bg-violet-90 border-violet-50'
                      : 'bg-white border-gray-4 hover:bg-violet-90 hover:border-violet-50'
                  }`}
                >
                  {/* Number Circle */}
                  <div
                    className={`w-[28px] h-[28px] rounded-[8px] border-[2px] flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedAnswer === option.id
                        ? 'bg-white border-violet-50'
                        : 'bg-white border-gray-4'
                    }`}
                  >
                    <span
                      className={`text-btn1-semi14 ${
                        selectedAnswer === option.id
                          ? 'text-violet-50'
                          : 'text-gray-7'
                      }`}
                    >
                      {idx + 3}
                    </span>
                  </div>
                  
                  {/* Option Text */}
                  <span
                    className={`text-subtitle6-semi18 ${
                      selectedAnswer === option.id
                        ? 'text-violet-50'
                        : 'text-gray-7'
                    }`}
                  >
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
