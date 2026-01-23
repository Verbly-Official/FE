import React from 'react';

interface WordCardProps {
    word: string;
    translation: string;
}

export const WordCard: React.FC<WordCardProps> = ({ word, translation }) => {
    return (
        <div className="bg-white p-[24px] h-[112px] rounded-[12px] border border-gray-100 flex flex-col justify-center gap-[16px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <h4 className="text-subtitle6-semi18 text-gray-10">{word}</h4>
            <p className="text-body1-medium16 text-gray-5">{translation}</p>
        </div>
    );
};
