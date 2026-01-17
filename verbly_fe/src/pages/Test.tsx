import { useState } from "react";
import TextArea from "../components/TextArea/TextArea";
import { Badge } from "../components/Badge/Badge"; // 새로 구현한 Badge 컴포넌트 import
import { Text } from "../components/Text/Text";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Pagination } from "../components/Pagination/Pagination";

const Test = () => {
  const [page, setPage] = useState(1);
  const [textValue, setTextValue] = useState("");

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10 pb-20">
      <h1 className="text-3xl font-bold">Component Test Page</h1>

      {/* 1. Badge Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          Badge
        </h2>
        
        {/* Dot Style */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500">Dot (8x8)</h3>
          <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Badge content="dot" variant="primary" />
              <span className="text-xs text-gray-400">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge content="dot" variant="secondary" />
              <span className="text-xs text-gray-400">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge content="dot" variant="urgent" />
              <span className="text-xs text-gray-400">Urgent</span>
            </div>
          </div>
        </div>

        {/* New Style */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500">New (18x18)</h3>
          <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
             <div className="flex flex-col items-center gap-2">
              <Badge content="new" variant="primary" />
              <span className="text-xs text-gray-400">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge content="new" variant="secondary" />
              <span className="text-xs text-gray-400">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge content="new" variant="urgent" />
              <span className="text-xs text-gray-400">Urgent</span>
            </div>
          </div>
        </div>

        {/* Number Style */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500">Number (18x18)</h3>
          <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Badge content="number" count={1} variant="primary" />
              <span className="text-xs text-gray-400">Pri (1)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge content="number" count={5} variant="secondary" />
              <span className="text-xs text-gray-400">Sec (5)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge content="number" count={99} variant="urgent" />
              <span className="text-xs text-gray-400">Urg (99)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge content="number" count={120} variant="urgent" />
              <span className="text-xs text-gray-400">Urg (99+)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Text Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          Text
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-2">Small</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Text size="small">기본 텍스트</Text>
              <Text size="small" state="wrong">틀린 표현</Text>
              <Text size="small" state="right">정답 표현</Text>
              <Text size="small" state="suggestion">수정 제안</Text>
              <Text size="small" state="highlight">강조 키워드</Text>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-lg font-bold mb-2">Medium</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Text size="medium">본문 텍스트</Text>
              <Text size="medium" state="wrong">잘못된 문장</Text>
              <Text size="medium" state="right">올바른 문장</Text>
              <Text size="medium" state="suggestion">이렇게 바꿔보세요</Text>
              <Text size="medium" state="highlight">중요한 내용</Text>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TextArea Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          TextArea
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <TextArea 
            value={textValue} 
            onChange={(e) => setTextValue(e.target.value)} 
            placeholder="여기에 텍스트 입력..." 
          />
        </div>
      </section>

      {/* 4. SearchBar Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          SearchBar
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
           <SearchBar shape="round" />
        </div>
      </section>

      {/* 5. Pagination Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          Pagination
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <Pagination shape="dot" currentPage={page} totalPages={10} onChange={setPage} />
          <Pagination shape="num" currentPage={page} totalPages={10} onChange={setPage} />
        </div>
      </section>

    </div>
  );
};

export default Test;