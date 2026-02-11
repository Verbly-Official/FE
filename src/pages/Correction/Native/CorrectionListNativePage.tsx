import React, { useState } from "react";
import { SolidButton } from "../../../components/Button";
import L_SentenceItem from "../components/L_SentenceItem";
import R_SentenceItem from "../components/R_SentenceItem";
import { TextField } from "../../../components/TextArea/TextField";
import DetailSentence from "../components/DetailSentence";
import File from "../../../assets/emoji/file.svg?react";

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
    <div className="w-full h-full">
      <div className="flex w-full h-[calc(100vh-64px)] bg-[#F8FAFC]">
        {/* LEFT: Sentence list (고정폭) */}
        <aside className="w-[370px] flex-shrink-0 h-full bg-white border border-[#D9D9D9] overflow-y-auto scrollbar-hide">
          <div className="flex p-[24px_30px] flex-col items-start gap-4 w-full border-b border-[#D9D9D9] bg-white">
            <span className="text-[#585858] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">SENTENCES ({sentences.length})</span>
          </div>

          {sentences.map((text, index) => (
            <L_SentenceItem key={index} text={text} index={index} active={activeIndex === index} onClick={() => setActiveIndex((prev) => (prev === index ? null : index))} />
          ))}
        </aside>

        {/* CENTER: Preview / Detail (남는 공간 전부) */}
        <main className={`flex flex-col min-w-0 h-full overflow-y-auto scrollbar-hide px-10 py-3 gap-[13px] ${activeIndex === null ? "flex-1" : "flex-1"} relative`}>
          {activeIndex === null ? (
            sentences.map((text, index) => <R_SentenceItem key={index} text={text} index={index} />)
          ) : (
            <>
              <DetailSentence index={activeIndex} text={sentences[activeIndex]} />
              <div className="absolute bottom-5 right-5 z-10">
                <SolidButton label="Correction List" Icon={File} />
              </div>
            </>
          )}
        </main>

        {/* RIGHT: Chat (고정폭, activeIndex null일 때만) */}
        {activeIndex === null && (
          <aside className="w-[410px] flex-shrink-0 h-full bg-[#F8FAFC] border-l border-[#D9D9D9] flex flex-col">
            <div className="bg-[#F1ECFC] flex p-5 justify-center items-center gap-[10px] w-full">
              <span className="text-black font-pretendard text-[length:var(--fs-title2)] font-semibold leading-none">Comments & Feedback</span>
            </div>

            <div className="flex p-4 justify-between items-center w-full border-b border-[#D9D9D9] bg-white">
              <div className="flex flex-col items-start px-2 py-1 rounded bg-[#D1FAE5]">
                <span className="text-[var(--System-Green-1,#047857)] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">In Progress</span>
              </div>
              <SolidButton label="Submit Correction" className="!h-[50px] !p-4" />
            </div>

            <div className="flex-1 w-full flex flex-col items-center gap-8 bg-[#FBFBFB] overflow-y-auto">{/* <ChatList /> */}</div>

            <div className="flex p-6 flex-col items-start gap-[10px] w-full border-t border-[#D9D9D9] bg-white">
              <TextField showBtn={true} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Correction_NList;
