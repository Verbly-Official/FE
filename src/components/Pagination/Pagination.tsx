import React from "react";
import Chev_L from "../../assets/emoji/chev-left.svg";
import Chev_R from "../../assets/emoji/chev-right.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  shape?: "dot" | "num";
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onChange, shape = "dot", className = "" }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav className={`flex items-center gap-4 select-none ${className}`} aria-label="Pagination">
      {/* Prev */}
      <button type="button" onClick={() => canPrev && onChange(currentPage - 1)} disabled={!canPrev} className="p-1 disabled:opacity-30" aria-label="Previous page">
        <img src={Chev_L} alt="" className="w-4 h-4" draggable={false} />
      </button>

      {/* Pages */}
      <ul className="flex items-center gap-2">
        {pages.map((p) => {
          const isActive = p === currentPage;

          if (shape === "dot") {
            return (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => onChange(p)}
                  aria-current={isActive ? "page" : undefined}
                  className={["w-2 h-2 rounded-full transition", isActive ? "bg-[#D3C3F6]" : "bg-[#E6E6E6]"].join(" ")}
                />
              </li>
            );
          }

          return (
            <li key={p}>
              <button
                type="button"
                onClick={() => onChange(p)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex items-center justify-center text-sm font-semibold w-[25px] h-[25px] p-1 transition-colors",
                  isActive ? "text-[#1F1F1F] aspect-square rounded-[4px] bg-[var(--gray-4-nomal,#C3C3C3)]" : "text-[#585858]",
                ].join(" ")}
              >
                {p}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Next */}
      <button type="button" onClick={() => canNext && onChange(currentPage + 1)} disabled={!canNext} className="p-1 disabled:opacity-30" aria-label="Next page">
        <img src={Chev_R} alt="" className="w-4 h-4" draggable={false} />
      </button>
    </nav>
  );
};
