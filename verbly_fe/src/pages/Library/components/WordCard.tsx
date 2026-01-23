import React from 'react';

interface WordCardProps {
    word: string;
    translation: string;
}

export const WordCard: React.FC<WordCardProps> = ({ word, translation }) => {
    return (
        <div className="bg-white p-[24px] h-[112px] rounded-[12px] border border-line1 flex flex-col justify-center gap-[11.5px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="flex flex-col gap-0">
                <h4 className="text-title3-bold24 text-blue-5">{word}</h4>
            </div>
            <div className="flex flex-col gap-0">
                <p className="text-btn1-semi14 text-gray-6">{translation}</p>
            </div>
        </div>
    );
};
