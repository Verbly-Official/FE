import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WordCardProps {
    word: string;
    translation: string;
    itemId?: number;
}

export const WordCard: React.FC<WordCardProps> = ({ word, translation, itemId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (itemId) {
            navigate(`/library/${itemId}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white p-[24px] h-[112px] rounded-[12px] border border-line1 flex flex-col justify-center gap-[11.5px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
        >
            <div className="flex flex-col gap-0">
                <h4 className="text-[length:var(--fs-title1)] font-bold text-blue-5">{word}</h4>
            </div>
            <div className="flex flex-col gap-0">
                <p className="text-[length:var(--fs-body2)] font-semibold text-gray-6">{translation}</p>
            </div>
        </div>
    );
};
