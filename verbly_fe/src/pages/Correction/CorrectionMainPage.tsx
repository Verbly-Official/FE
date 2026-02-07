import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import Tab from "../../components/Tab/Tab";
import BtnTab_C from "./BtnTab_c";
import Sidebar from "./SideBar";
import DocumentTable from "./DocumentTable";
import type { DocumentRow } from "./DocumentTable";
import { addCorrectionBookmark, removeCorrectionBookmark } from "../../apis/correction";

import File from "../../assets/emoji/file.svg?react";
import { Pagination } from "../../components/Pagination/Pagination";
import { getCorrections } from "../../apis/correction";

const Correction_Main = () => {
  const SERVER_PAGE_IS_ZERO_BASED = true;

  const [page, setPage] = useState(1); // UI는 1부터
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["All", "Completed", "In Progress", "Pending"];

  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();
  const handleNewPost = () => navigate("/correction/write");

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
  }, [page, statusQuery, correctorQuery]);

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      <div className="flex w-full max-w-[1920px] mx-auto">
        <SideMenu variant="small" />

        <div className="flex-1 min-w-0 px-[28px] py-[30px] bg-[#F8FAFC]">
          <div className="flex min-w-0">
            <div className="w-[250px] h-[940px] px-[20px] py-9 bg-white rounded-l-[12px] border border-r-0 border-[#E5E7EB] flex-shrink-0">
              <SolidButton size="large" className="w-full mb-8" label="새 글 작성하기" onClick={handleNewPost} />
              <Sidebar locale="ko" />
            </div>

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
      </div>
    </div>
  );
};

export default Correction_Main;
