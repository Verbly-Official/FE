import React, { useState } from 'react';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { WordCard } from './WordCard';
import { TextButton } from '../../../components/Button/TextButton';
import FilterIcon from '../../../assets/emoji/filter.svg';

interface MyLibrarySectionProps {
    words: Array<{ word: string; translation: string }>;
}

export const MyLibrarySection: React.FC<MyLibrarySectionProps> = ({ words }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWords = words.filter(item =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translation.includes(searchTerm)
    );

    return (
        <div className="flex flex-col gap-[20px]">
            <div className="flex justify-between items-center gap-[16px]">
                <div className="flex flex-col gap-[2px]">
                    <h3 className="text-title3-bold24 text-gray-10">My Library</h3>
                    <p className="text-body1-medium16 text-gray-5">
                        You have saved <span className="text-violet-50 font-bold">{filteredWords.length}</span> items.
                    </p>
                </div>
                <div className="flex items-center gap-[8px]">
                    {/* SearchBar - 강제로 크기 조정 */}
                    <div style={{ width: '345px' }} className="[&>div]:!w-full [&>div>div]:!w-full [&>div>div]:!max-w-full [&_input]:!text-sm">
                        <SearchBar
                            shape="round"
                            placeholder="Search topics, users or keywords,,,"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* TextButton으로 교체 및 스타일 수정 */}
                    <TextButton
                        variant="primary"
                        size="medium"
                        className="!px-[20px] !py-[8px] !rounded-[20px] border border-[#D9D9D9] bg-[#FBFBFB] hover:!bg-gray-50 shadow-sm !gap-[10px]"
                    >
                        <div className="flex items-center gap-[10px]">
                            <img
                                src={FilterIcon}
                                alt="filter"
                                className="w-[14px] h-[14px] [filter:invert(30%)_sepia(84%)_saturate(3451%)_hue-rotate(248deg)_brightness(92%)_contrast(96%)]"
                            />
                            <span className="text-violet-50 font-semibold">Filter</span>
                        </div>
                    </TextButton>
                </div>
            </div>

            {/* Word Grid */}
            <div className="grid grid-cols-3 gap-[16px] pb-[20px]">
                {filteredWords.map((item, index) => (
                    <WordCard key={index} word={item.word} translation={item.translation} />
                ))}
            </div>
        </div>
    );
};
