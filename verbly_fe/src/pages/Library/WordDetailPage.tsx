// import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import SideMenu from '../../components/Nav/SideMenu';
import InfoIcon from '../../assets/emoji/info.svg';
import { MOCK_WORD_DATA } from './mockData';

interface TextSegment {
  text: string;
  highlight?: boolean;
  isHighlight?: boolean;
}

// 문장을 파싱해서 하이라이트 부분과 일반 텍스트로 분리
const parseSentence = (sentence: string, highlightText: string): TextSegment[] => {
  const lowerSentence = sentence.toLowerCase();
  const lowerHighlight = highlightText.toLowerCase();
  const index = lowerSentence.indexOf(lowerHighlight);

  if (index === -1) {
    return [{ text: sentence, isHighlight: false }];
  }

  const segments: TextSegment[] = [];
  
  if (index > 0) {
    segments.push({ text: sentence.substring(0, index), isHighlight: false });
  }
  
  segments.push({ 
    text: sentence.substring(index, index + highlightText.length),
    isHighlight: true 
  });
  
  if (index + highlightText.length < sentence.length) {
    segments.push({ 
      text: sentence.substring(index + highlightText.length),
      isHighlight: false 
    });
  }

  return segments;
};

const ExampleSentence = ({ english, korean, highlight }: { english: string; korean: string; highlight: string }) => {
  // 하이라이트할 텍스트를 찾아서 세그먼트로 나누기
  const segments: TextSegment[] = [];
  const lowerEnglish = english.toLowerCase();
  const lowerHighlight = highlight.toLowerCase();
  const index = lowerEnglish.indexOf(lowerHighlight);

  if (index !== -1) {
    if (index > 0) {
      segments.push({ text: english.substring(0, index) });
    }
    segments.push({ 
      text: english.substring(index, index + highlight.length),
      highlight: true 
    });
    if (index + highlight.length < english.length) {
      segments.push({ text: english.substring(index + highlight.length) });
    }
  } else {
    segments.push({ text: english });
  }

  return (
    <div className="flex flex-col gap-[8px] border-b border-line1 py-[12px]">
      <div className="flex items-center gap-[4px] flex-wrap">
        {segments.map((segment, idx) => (
          <span
            key={idx}
            className={`text-[16px] font-semibold leading-[1.5] ${
              segment.highlight 
                ? 'bg-violet-90 px-[4px] py-[2px] text-gray-9' 
                : 'text-gray-9'
            }`}
          >
            {segment.text}
          </span>
        ))}
      </div>
      <p className="text-[16px] font-normal leading-[1.5] text-gray-10">
        {korean}
      </p>
    </div>
  );
};

export const WordDetailPage = () => {
  // const { word } = useParams(); // 나중에 API 연동 시 사용
  const data = MOCK_WORD_DATA;

  return (
    <div className="flex flex-col flex-1 bg-bg0 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content Wrapper */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden md:flex flex-shrink-0 w-[200px] lg:w-[250px] xl:w-[280px] [&>div]:w-full [&>div]:px-[16px] md:[&>div]:px-[20px] lg:[&>div]:px-[24px] [&>div]:py-[32px] md:[&>div]:py-[40px] [&>div]:gap-[16px] md:[&>div]:gap-[20px] [&_div[class*='w-[221px]']]:!w-full [&_div[class*='h-[56px]']]:!h-[48px] [&_div[class*='h-[60px]']]:!h-[48px] [&_div[class*='text-[24px]']]:!text-[16px] md:[&_div[class*='text-[24px]']]:!text-[18px] [&_div[class*='px-[32px]']]:!px-[12px] md:[&_div[class*='px-[32px]']]:!px-[14px] [&_div[class*='py-[20px]']]:!py-[12px] md:[&_div[class*='py-[20px]']]:!py-[14px] bg-white">
          <SideMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-[40px] py-[50px]">
          <div className="max-w-[1474px] mx-auto flex flex-col gap-[32px]">
            {/* Word Card */}
            <div className="bg-white border border-line1 rounded-[12px] h-[140px] flex items-center px-[32px] py-[4px]">
              <div className="flex flex-col gap-[16px]">
                <h1 className="text-[40px] font-bold leading-none bg-gradient-to-r from-violet-50 to-pink-40 bg-clip-text text-transparent">
                  {data.word}
                </h1>
                <p className="text-[20px] font-medium leading-none text-gray-7">
                  {data.meaning}
                </p>
              </div>
            </div>

            {/* Correction Details */}
            {data.corrections.map((correction) => (
              <div
                key={correction.id}
                className="bg-white border border-line1 rounded-[12px] p-[32px] flex flex-col gap-[24px]"
              >
                {/* Wrong and Correct Sentences */}
                <div className="flex flex-col gap-[18px]">
                  {/* Wrong Sentence */}
                  <div className="flex items-center gap-[4px] flex-wrap">
                    {parseSentence(correction.wrongSentence, correction.wrong).map((part, idx) => (
                      <span
                        key={idx}
                        className={
                          part.isHighlight
                            ? "text-[24px] font-bold leading-none text-[#ef1111] line-through bg-pink-80 px-[8px] py-[4px] rounded-[4px]"
                            : "text-[24px] font-semibold leading-none text-gray-9"
                        }
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>

                  {/* Correct Sentence */}
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[14px] font-semibold leading-none text-[#047857]">
                      CORRECTED
                    </span>
                    <div className="flex items-center gap-[4px] flex-wrap">
                      {parseSentence(correction.correctSentence, correction.correct).map((part, idx) => (
                        <span
                          key={idx}
                          className={
                            part.isHighlight
                              ? "text-[24px] font-bold leading-none text-[#047857] bg-[#d1fae5] px-[8px] py-[4px] rounded-[4px]"
                              : "text-[24px] font-semibold leading-none text-gray-9"
                          }
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explanation Box */}
                <div className="bg-blue-100 border-l-[6px] border-blue-60 p-[24px] flex flex-col gap-[15px]">
                  {/* Corrector Profile */}
                  <div className="flex items-center gap-[12px] h-[40px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-gray-3 flex items-center justify-center">
                      <span className="text-[16px] font-medium text-gray-7">
                        {correction.corrector.name[0]}
                      </span>
                    </div>
                    <div className="flex items-end gap-[4px]">
                      <span className="text-[20px] font-medium leading-none text-gray-10">
                        {correction.corrector.name}
                      </span>
                      {correction.corrector.isNative && (
                        <span className="text-[11px] font-medium leading-none text-gray-5">
                          _Native Speaker
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Explanation Text */}
                  <p className="text-[16px] font-normal leading-[1.5] text-gray-10">
                    {correction.explanation}
                  </p>
                </div>
              </div>
            ))}

            {/* More Examples Section */}
            <div className="flex flex-col gap-[8px]">
              {/* Section Header */}
              <div className="flex items-center gap-[8px] p-[8px] rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                <img src={InfoIcon} alt="info" className="w-[24px] h-[24px]" />
                <h2 className="text-[28px] font-bold leading-none text-gray-7">
                  More Example
                </h2>
              </div>

              {/* Examples List */}
              <div className="bg-white border border-line1 rounded-[12px] p-[32px] flex flex-col gap-[24px]">
                {data.examples.map((example) => (
                  <ExampleSentence
                    key={example.id}
                    english={example.english}
                    korean={example.korean}
                    highlight={example.highlight}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
