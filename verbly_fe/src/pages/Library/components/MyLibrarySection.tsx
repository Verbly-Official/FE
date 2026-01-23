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
        <div className="flex flex-col gap-[18px] w-full">
            <div className="flex justify-between items-end gap-[16px]">
                <div className="flex flex-col gap-[2px]">
                    <h3 className="text-title3-bold24 text-gray-9">My Library</h3>
                    <p className="text-body-medium14 text-gray-7">
                        <span className="font-regular">You have saved </span>
                        <span className="text-btn1-semi14 text-violet-50">{filteredWords.length}</span>
                        <span className="font-regular"> items.</span>
                    </p>
                </div>
                <div className="flex items-center gap-[8px] flex-shrink-0">
                    {/* SearchBar */}
                    <SearchBar
                        shape="round"
                        placeholder="Search topics, users or keywords,,,"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filter Button */}
                    <TextButton
                        variant="primary"
                        size="medium"
                        className="!px-[4px] !py-[4px] !rounded-[4px] !border-none !bg-transparent !gap-[4px] flex-shrink-0 hover:!bg-transparent"
                    >
                        <div className="flex items-center gap-[4px]">
                            <img
                                src={FilterIcon}
                                alt="filter"
                                className="w-[20px] h-[20px]"
                            />
                            <span className="text-violet-50 font-semibold text-btn1-semi14">Filter</span>
                        </div>
                    </TextButton>
                </div>
            </div>

            {/* Word Grid - 반응형 */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[12px] w-full">
                {filteredWords.map((item, index) => (
                    <WordCard key={index} word={item.word} translation={item.translation} />
                ))}
            </div>
        </div>
    );
};
