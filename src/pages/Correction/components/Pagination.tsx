import React, { useState } from "react";
import { Pagination } from "../../../components/Pagination/Pagination";

type Suggestion = {
  original: string;
  revised: string;
  reasonKo: string;
};

export default function SuggestionSlider({ suggestions }: { suggestions: Suggestion[] }) {
  const [page, setPage] = useState(1);

  const totalPages = suggestions.length;
  if (!totalPages) return null;

  return (
    <div className="p-4 rounded-[12px] border border-[#D9D9D9] bg-white">
      {/* title4: 18px */}
      <div className="font-semibold mb-4 text-[length:var(--fs-title4)]">수정 제안 ({totalPages})</div>

      {/* 슬라이드 영역 */}
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${(page - 1) * 100}%)` }}>
          {suggestions.map((item, idx) => (
            <div key={idx} className="min-w-full flex flex-col gap-3">
              {/* 원문: body1 (15px) */}
              <div className="text-[#EF1111] font-semibold text-[length:var(--fs-body1)] leading-[150%]">{item.original}</div>

              {/* 수정문: body1 (15px) */}
              <div className="p-2 rounded-[4px] bg-[#D1FAE5] text-[#047857] font-semibold text-[length:var(--fs-body1)] leading-[150%]">{item.revised}</div>

              {/* 이유: body1 (15px) */}
              <div className="text-[#1F1F1F] font-semibold text-[length:var(--fs-body1)] leading-[150%]">{item.reasonKo}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 도트 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} shape="dot" />
        </div>
      )}
    </div>
  );
}
