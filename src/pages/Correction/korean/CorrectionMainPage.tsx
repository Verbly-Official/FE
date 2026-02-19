import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Tab from "../../../components/Tab/Tab";
import BtnTab_C from "../components/BtnTab_c";
import DocumentTable from "../components/DocumentTable";
import type { DocumentRow } from "../components/DocumentTable";

import File from "../../../assets/emoji/file.svg?react";
import { Pagination } from "../../../components/Pagination/Pagination";
import { Toast } from "../../../components/Toast/Toast";

import { addCorrectionBookmark, removeCorrectionBookmark, getCorrections } from "../../../apis/correction";

const Correction_Main = () => {
  const [page, setPage] = useState(1); // UI는 1부터
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["All", "Completed", "In Progress", "Pending"];

  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [searchParams] = useSearchParams();
  const bookmark = searchParams.get("bookmark") === "true";
  const sort = searchParams.get("sort") === "true";

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

  // correctorKey 변경 시에도 페이지 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [correctorKey]);

  // bookmark/sort 변경 시 페이지 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [bookmark, sort]);

  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);

      // state 초기화 (뒤로가기 눌렀을 때 또 안 뜨게)
      navigate(location.pathname, { replace: true, state: {} });

      // 3초 후 자동 제거
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const run = async () => {
      try {
        const params: any = { page, size: 6 };

        if (sort) params.sort = true;
        if (bookmark) params.bookmark = true;
        if (statusQuery) params.status = statusQuery;
        if (correctorQuery) params.correctorType = correctorQuery;

        // 최신순(Recent)일 때만 sort=true 전달
        if (sort) params.sort = true;

        // 즐겨찾기일 때만 bookmark=true 전달
        if (bookmark) params.bookmark = true;

        // All이면 안 보내기
        if (statusQuery) params.status = statusQuery;

        // 첨삭자 필터 (all이면 안 보내기)
        if (correctorQuery) params.correctorType = correctorQuery;

        const res = await getCorrections(params);

        console.log("params(corrector/status/bookmark):", {
          corrector: params.corrector,
          status: params.status,
          bookmark: params.bookmark,
          sort: params.sort,
        });

        console.log("res.items length:", res?.items?.length);
        console.log("res.items[0] id/title/correctorType:", res?.items?.[0]?.correctionId, res?.items?.[0]?.title, res?.items?.[0]?.correctorType);

        setTotalPages(res.totalPages ?? 1);
        setTotalCount(res.totalElements ?? 0);

        const rows: DocumentRow[] = (res.items ?? []).map((item: any) => {
          const dateText = item.relativeTime ?? "-";

          const author = item.correctorName ?? (item.correctorType === "AI_ASSISTANT" ? "AI Assistant" : item.correctorType === "NATIVE_SPEAKER" ? "Native Speaker" : "부여받지 않음");

          const rawStatus = (item.status ?? "PENDING") as "PENDING" | "IN_PROGRESS" | "COMPLETED";

          const statusText = rawStatus === "COMPLETED" ? "Completed" : rawStatus === "IN_PROGRESS" ? "In Progress" : "Pending";

          return {
            id: Number(item.correctionId),
            title: item.title ?? "(no title)",
            author,
            date: dateText,
            status: statusText,
            rawStatus,
            words: Number(item.wordCount ?? 0),
            isStarred: Boolean(item.bookmark),
            correctorName: item.correctorName ?? null,
          };
        });

        setDocuments(rows);
      } catch (e: any) {
        console.error("getCorrections error:", e?.response?.data ?? e);
        setDocuments([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    };

    run();
  }, [page, statusQuery, correctorQuery, bookmark, sort]);

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
              value={correctorKey}
              onChange={(key) => {
                setCorrectorKey(key);
                setPage(1);
              }}
            />
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[900px]">
              <DocumentTable
                documents={documents}
                onToggleBookmark={handleToggleBookmark}
                onRowClick={(row) => {
                  if (row.rawStatus !== "COMPLETED") {
                    alert("첨삭이 완료된 글만 확인할 수 있어요.");
                    return;
                  }
                  navigate(`/correction/list/${row.id}`);
                }}
              />
            </div>
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onChange={(p: any) => setPage(Number(p))} shape="num" className="flex items-center justify-center pt-[8px]" />
        </div>
      </div>
    </div>
  );
};

export default Correction_Main;
