import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DocumentTable from "./components/DocumentTable";
import type { DocumentRow } from "./components/DocumentTable";
import { Pagination } from "../../components/Pagination/Pagination";
import { getDraftCorrections } from "../../apis/correction";

const Correction_drafts = () => {
  const SERVER_PAGE_IS_ZERO_BASED = true;

  const [page, setPage] = useState(1); // UI는 1부터
  const [selectedTab, setSelectedTab] = useState(0);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();
  const handleNewPost = () => navigate("/correction/write");

  const statusQuery = useMemo(() => {
    // 서버 enum: COMPLETED, IN_PROGRESS, PENDING
    if (selectedTab === 1) return "COMPLETED";
    if (selectedTab === 2) return "IN_PROGRESS";
    if (selectedTab === 3) return "PENDING";
    return undefined; // All이면 undefined
  }, [selectedTab]);

  // 탭 변경 시 페이지 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  useEffect(() => {
    const run = async () => {
      try {
        const apiPage = SERVER_PAGE_IS_ZERO_BASED ? Math.max(page - 1, 0) : page;

        const params: any = { page: apiPage, size: 10, sort: true };
        const res = await getDraftCorrections(params);

        console.log("getCorrections normalized res:", res);

        setTotalPages(res.totalPages ?? 1);
        setTotalCount(res.totalElements ?? 0);

        const rows: DocumentRow[] = (res.items ?? []).map((item: any) => {
          const created = item.correctionCreatedAt ? new Date(item.correctionCreatedAt) : null;
          const dateText = created ? created.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-";

          const author = item.correctorName ?? (item.correctorType === "AI_ASSISTANT" ? "AI Assistant" : item.correctorType === "NATIVE_SPEAKER" ? "Native Speaker" : "Unknown");

          const statusText = item.status === "COMPLETED" ? "Completed" : item.status === "IN_PROGRESS" ? "In Progress" : item.status === "PENDING" ? "Pending" : String(item.status ?? "-");

          return {
            id: item.correctionId,
            title: item.title ?? "(no title)",
            author,
            date: dateText,
            status: statusText,
            words: item.wordCount ?? 0, // 서버에 없으면 0 처리
            isStarred: Boolean(item.bookmark),
          };
        });

        console.log("DocumentTable rows:", rows);

        setDocuments(rows);
      } catch (e) {
        console.error(e);
        setDocuments([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    };

    run();
  }, [page, statusQuery]);

  return (
    <div className="min-h-screen">
      <div className="flex-1 min-w-0 py-9 min-h-[940px] rounded-r-[12px] border border-[#E5E7EB] bg-[#FBFBFB] items-center px-[clamp(48px,6vw,122px)]">
        <div className="w-full overflow-x-auto">
          <div className="text-black font-pretendard text-[24px] font-bold leading-[100%] mb-6">임시저장</div>
          <div className="min-w-[900px]">
            <DocumentTable documents={documents} showAuthor={false} showStar={false} showWords={false} />
          </div>
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} shape="num" className="flex items-center justify-center pt-[8px]" />
      </div>
    </div>
  );
};

export default Correction_drafts;
