import React, { useState } from "react";
import GNB from "../../../components/Nav/GNB";
import SideMenu from "../../../components/Nav/SideMenu";
import { SolidButton } from "../../../components/Button";
import L_SentenceItem from "../components/L_SentenceItem";
import R_SentenceItem from "../components/R_SentenceItem";
import { TextField } from "../../../components/TextArea/TextField";
import DetailSentence from "../components/DetailSentence";
import File from "../../../assets/emoji/file.svg";

const sentences = [
  "I missed the bus because I was looking at my...",
  "It is called 'Chim' in Korea. Strongly recommended...",
  "Some people prefer work late night when everything...",
  "The movie was more emotional than I expected.",
  "If I have more time, I would learn how to play piano.",
];

const Correction_NList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      <div className="flex w-full max-w-[1920px] mx-auto h-[calc(100vh-64px)]">
        <SideMenu variant="small" />

        {/* 좌측: 문서 리스트 */}
        <div className="flex-1 bg-[#F8FAFC]">
          <div className="flex w-[474px] h-full flex-col items-start border border-[#D9D9D9] bg-white overflow-y-auto">
            <div className="flex p-[24px_30px] flex-col items-start gap-4 w-full border border-[#D9D9D9] bg-white">
              <span className="text-[#585858] font-pretendard text-base font-semibold leading-[150%]">SENTENCES (5)</span>
            </div>
            {sentences.map((text, index) => (
              <L_SentenceItem key={index} text={text} index={index} active={activeIndex === index} onClick={() => setActiveIndex((prev) => (prev === index ? null : index))} />
            ))}
          </div>
        </div>

        {/* 우측 상단: 문장 미리보기 / 상세 */}
        <div className={`flex flex-col px-10 py-3 bg-[#F8FAFC] gap-[13px] h-full overflow-y-auto relative ${activeIndex === null ? "flex-2" : "flex-[3]"}`}>
          {activeIndex === null ? (
            sentences.map((text, index) => <R_SentenceItem key={index} text={text} index={index} />)
          ) : (
            <>
              <DetailSentence index={activeIndex} text={sentences[activeIndex]} />
              {/* 패널 내부 우측 하단 고정 */}
              <div className="absolute bottom-6 right-6 z-10">
                <SolidButton label="Correction List" iconSrc={File} />
              </div>
            </>
          )}
        </div>

        {/* 우측 하단: 채팅 영역 */}
        {activeIndex === null && (
          <div className="flex flex-col flex-1 bg-[#F8FAFC] h-full">
            <div className="bg-[#F1ECFC] flex p-6 justify-center items-center gap-[10px] w-full">
              <span className="text-black font-pretendard text-2xl font-semibold leading-none">Comments & Feedback</span>
            </div>

            <div className="flex p-6 justify-between items-center w-full border-b border-[#D9D9D9] bg-white">
              <div className="flex flex-col items-start px-2 py-1 rounded bg-[#D1FAE5]">
                <span className="text-[var(--System-Green-1,#047857)] font-pretendard text-base font-semibold leading-[150%]">In Progress</span>
              </div>
              <SolidButton label="Submit Correction" />
            </div>

            <div className="flex flex-1 w-[544px] flex-col items-center gap-8 border-l border-[#D9D9D9] bg-[#FBFBFB] overflow-y-auto">{/* <ChatList /> */}</div>

            <div className="flex p-6 flex-col items-start gap-[10px] w-full border-t border-[#D9D9D9] bg-white">
              <TextField showBtn={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Correction_NList;
