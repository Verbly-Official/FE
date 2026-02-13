import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tab from "../../../components/Tab/Tab";
import BtnTab_C from "../components/BtnTab_c";
import DocumentTable from "../components/DocumentTable";
import type { DocumentRow } from "../components/DocumentTable";
import { addCorrectionBookmark, removeCorrectionBookmark } from "../../../apis/correction";

import File from "../../../assets/emoji/file.svg?react";
import { Pagination } from "../../../components/Pagination/Pagination";
import { getCorrections } from "../../../apis/correction";
import { Toast } from "../../../components/Toast/Toast";

const Correction_Main = () => {
  const SERVER_PAGE_IS_ZERO_BASED = true;

  const [page, setPage] = useState(1); // UI는 1부터
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["All", "Completed", "In Progress", "Pending"];

  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 첨삭자 필터
  const [correctorKey, setCorrectorKey] = useState<"all" | "ai" | "native">("all");

  const correctorQuery = useMemo(() => {
    if (correctorKey === "ai") return "AI_ASSISTANT";
    if (correctorKey === "native") return "NATIVE_SPEAKER";
    return undefined;
  }, [correctorKey]);

  const statusQuery = useMemo(() => {
    // 서버 enum: COMPLETED, IN_PROGRESS, PENDING
    if (selectedTab === 1) return "COMPLETED";
    if (selectedTab === 2) return "IN_PROGRESS";
    if (selectedTab === 3) return "PENDING";
    return undefined; // All이면 undefined
  }, [selectedTab]);

  const handleToggleBookmark = async (id: number) => {
    const current = documents.find((d) => d.id === id);
    if (!current) return;

    // 낙관적 업데이트(바로 UI 반영)
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, isStarred: !d.isStarred } : d)));

    try {
      if (current.isStarred) {
        await removeCorrectionBookmark(id);
      } else {
        await addCorrectionBookmark(id);
      }
    } catch (e) {
      // 실패 시 롤백
      setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, isStarred: current.isStarred } : d)));
      console.error(e);
      alert("북마크 변경에 실패했어요.");
    }
  };

  // 탭 변경 시 페이지 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  // correctorKey 변경 시에도 페이지 1로 리셋(필터 바뀌면 UX 상 자연스러움)
  useEffect(() => {
    setPage(1);
  }, [correctorKey]);

  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);

      // state 초기화 (뒤로가기 눌렀을 때 또 안 뜨게)
      navigate(location.pathname, { replace: true, state: {} });

      // 3초 후 자동 제거
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const run = async () => {
      try {
        const apiPage = SERVER_PAGE_IS_ZERO_BASED ? Math.max(page - 1, 0) : page;

        const params: any = { page: apiPage, size: 10, sort: true };

        // All이면 안 보내기
        if (statusQuery) params.status = statusQuery;

        // corrector 필터 실제로 서버에 전달 (API 타입에서 corrector 키 사용)
        if (correctorQuery) params.corrector = correctorQuery;

        const res = await getCorrections(params);

        console.log("getCorrections normalized res:", res);

        setTotalPages(res.totalPages ?? 1);
        setTotalCount(res.totalElements ?? 0);

        const rows: DocumentRow[] = (res.items ?? []).map((item: any) => {
          const dateText = item.relativeTime ?? "-";

          const author = item.correctorName ?? (item.correctorType === "AI_ASSISTANT" ? "AI Assistant" : item.correctorType === "NATIVE_SPEAKER" ? "Native Speaker" : "부여받지 않음");
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
  }, [page, statusQuery, correctorQuery]);

  return (
    <div className="min-h-screen">
      {showToast && (
        <div className="fixed top-9 left-1/2 -translate-x-1/2 z-[9999]">
          <Toast variant="positive" message="Revision request sent!" />
        </div>
      )}
      <div className="flex min-w-0">
        <div className="flex-1 min-w-0 py-9 min-h-[940px] rounded-r-[12px] border border-[#E5E7EB] bg-[#FBFBFB] items-center px-[clamp(48px,6vw,122px)]">
          <div className="flex px-6 py-9 items-center gap-[20px] rounded-[12px] border border-[#D9D9D9] bg-white">
            <div className="flex items-center gap-[10px] p-2 rounded-[8px] bg-[var(--Point-Blue-90,#E0EBFF)]">
              <File className="w-[26.667px] h-[33.333px] text-[#353535]" />
            </div>
            <div>
              <div className="flex items-start text-[#9E9E9E] text-[17px] font-semibold leading-[100%] font-pretendard">Total Request</div>
              <div className="text-[#353535] font-pretendard text-4xl font-bold leading-none">{totalCount}</div>
            </div>
          </div>

          <div className="flex mt-8 overflow-x-auto whitespace-nowrap">
            {tabs.map((label, index) => (
              <Tab key={index} label={label} isSelected={index === selectedTab} onClick={() => setSelectedTab(index)} />
            ))}
            <span className="w-full border-b border-[var(--Strok-line2,#ADADAD)]" />
          </div>

          <div className="pt-7 pb-3">
            <BtnTab_C
              onChange={(key) => {
                setCorrectorKey(key as any);
                setPage(1);
              }}
            />
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[900px]">
              <DocumentTable documents={documents} onToggleBookmark={handleToggleBookmark} />
            </div>
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} shape="num" className="flex items-center justify-center pt-[8px]" />
        </div>
      </div>
    </div>
  );
};

export default Correction_Main;
