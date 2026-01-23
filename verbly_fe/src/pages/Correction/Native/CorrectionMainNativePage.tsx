import React from "react";
import GNB from "../../../components/Nav/GNB";
import SideMenu from "../../../components/Nav/SideMenu";
import { Badge } from "../../../components/Badge/ContentBadge";
import { SolidButton } from "../../../components/Button";
import L_SentenceItem from "../components_n/L_SentenceItem";
import R_SentenceItem from "../components_n/R_SentenceItem";
import { TextField } from "../../../components/TextArea/TextField";

const sentences = [
  "I missed the bus because I was looking at my...",
  "It is called 'Chim' in Korea. Strongly recommended...",
  "Some people prefer work late night when everything...",
  "The movie was more emotional than I expected.",
  "If I have more time, I would learn how to play piano.",
];

const Correction_NMain = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      <div className="flex w-full max-w-[1920px] mx-auto h-[calc(100vh-64px)]">
        <SideMenu variant="small" />

        <div className="flex-1 bg-[#F8FAFC]">
          <div className="flex w-[474px] h-full flex-col items-start border border-[#D9D9D9] bg-white overflow-y-auto">
            <div className="flex p-[24px_30px] flex-col items-start gap-4 w-full border border-[#D9D9D9] bg-white">
              <span className="text-[#585858] font-pretendard text-base font-semibold leading-[150%]">SENTENCES (5)</span>
            </div>
            {sentences.map((text, index) => (
              <L_SentenceItem key={index} text={text} index={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-2 px-10 py-3 bg-[#F8FAFC] gap-[13px] h-full overflow-y-auto">
          {sentences.map((text, index) => (
            <R_SentenceItem key={index} text={text} index={index} />
          ))}
        </div>

        <div className="flex flex-col flex-1 bg-[#F8FAFC] h-full">
          <div className="bg-[#F1ECFC] flex p-6 justify-center items-center gap-[10px] w-full">
            <span className="text-black font-pretendard text-2xl font-semibold leading-none">Comments & Feedback</span>
          </div>

          <div className="flex p-6 justify-between items-center w-full border-b border-[#D9D9D9] bg-white">
            <SolidButton label="Submit Correction" />
          </div>

          <div className="flex flex-1 w-[544px] flex-col items-center gap-8 border-l border-[#D9D9D9] bg-[#FBFBFB] overflow-y-auto"></div>

          <div className="flex p-6 flex-col items-start gap-[10px] w-full border-t border-[#D9D9D9] bg-white">
            <TextField showBtn={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_NMain;
