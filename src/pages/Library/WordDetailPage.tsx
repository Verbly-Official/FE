import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import SideMenu from '../../components/Nav/SideMenu';
import InfoIcon from '../../assets/emoji/info.svg';
import { getLibraryItemDetail } from '../../apis/library';
import type { LibraryItemDetail } from '../../types/library';

interface TextSegment {
  text: string;
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
  const segments = parseSentence(english, highlight);

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex gap-[4px] items-center flex-wrap">
        {segments.map((segment, index) => (
          <span
            key={index}
            className={
              segment.isHighlight
                ? 'text-subtitle6-semi18 text-violet-50'
                : 'text-subtitle6-semi18 text-gray-9'
            }
          >
            {segment.text}
          </span>
        ))}
      </div>
      <p className="text-body1-medium16 text-gray-6">{korean}</p>
    </div>
  );
};

export const WordDetailPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<LibraryItemDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) {
      navigate('/library');
      return;
    }

    fetchItemDetail(parseInt(itemId));
  }, [itemId, navigate]);

  const fetchItemDetail = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const detail = await getLibraryItemDetail(id);
      setData(detail);
    } catch (err) {
      console.error('Failed to fetch library item detail:', err);
      setError('Failed to load item details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Item not found'}</p>
          <button
            onClick={() => navigate('/library')}
            className="px-4 py-2 bg-violet-600 text-white rounded-md"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

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
                  {data.phrase}
                </h1>
                <p className="text-[20px] font-medium leading-none text-gray-7">
                  {data.meaningKo || data.meaningEn}
                </p>
              </div>
            </div>

            {/* Correction Details (Sources) */}
            {data.sources && data.sources.length > 0 && (
              <div className="bg-white border border-line1 rounded-[12px] p-[32px] flex flex-col gap-[32px]">
                <h2 className="text-title3-bold24 text-gray-9">Corrections</h2>
                {data.sources.map((source) => (
                  <div key={source.id} className="flex flex-col gap-[24px] border-b border-line1 pb-[32px] last:border-b-0 last:pb-0">
                    {/* Original vs Corrected */}
                    <div className="flex gap-[24px]">
                      {/* Wrong */}
                      <div className="flex-1 bg-red-50 border border-red-200 rounded-[8px] p-[16px]">
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <span className="text-btn1-semi14 text-red-600">WRONG</span>
                        </div>
                        <p className="text-body1-medium16 text-gray-9 line-through">
                          {source.originalSegment}
                        </p>
                      </div>

                      {/* Correct */}
                      <div className="flex-1 bg-green-50 border border-green-200 rounded-[8px] p-[16px]">
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <span className="text-btn1-semi14 text-green-600">CORRECT</span>
                        </div>
                        <p className="text-body1-medium16 text-gray-9">
                          {source.suggestionSegment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Examples Section */}
            {data.examples && data.examples.length > 0 && (
              <div className="bg-white border border-line1 rounded-[12px] p-[32px] flex flex-col gap-[32px]">
                <div className="flex items-center gap-[8px]">
                  <img src={InfoIcon} alt="info" className="w-[24px] h-[24px]" />
                  <h2 className="text-title3-bold24 text-gray-9">Examples</h2>
                </div>

                <div className="flex flex-col gap-[24px]">
                  {data.examples.map((example) => (
                    <div
                      key={example.id}
                      className="border-b border-line1 pb-[24px] last:border-b-0 last:pb-0"
                    >
                      <ExampleSentence
                        english={example.exampleEn}
                        korean={example.exampleKo}
                        highlight={data.phrase}
                      />
                      <div className="mt-[8px]">
                        <span className="text-cap-medium11 text-gray-5">
                          Source: {example.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back Button */}
            <button
              onClick={() => navigate('/library')}
              className="self-start px-6 py-3 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
            >
              Back to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordDetailPage;
