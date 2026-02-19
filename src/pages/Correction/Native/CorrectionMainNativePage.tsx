import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Tab from "../../../components/Tab/Tab";
import DocumentTable, { type DocumentRow } from "../components/DocumentTable";
import File from "../../../assets/emoji/file.svg?react";
import { Pagination } from "../../../components/Pagination/Pagination";
import { addNativeCorrectionBookmark, removeNativeCorrectionBookmark, getNativeCorrections } from "../../../apis/correctionNative";

type CorrectionStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type CorrectionListItem = {
  correctionId: number;
  title: string;
  status: CorrectionStatus;
  bookmark: boolean;
  correctorName?: string | null;
  wordCount?: number | null;
  correctionCreatedAt?: string | null;
};

type CorrectionsListResult = {
  corrections: CorrectionListItem[];
  total: number;
  totalPages: number;
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

const PAGE_SIZE = 4;

const toStatusLabel = (status: CorrectionStatus) => {
  if (status === "COMPLETED") return "Completed";
  if (status === "IN_PROGRESS") return "In Progress";
  return "Pending";
};

const toDateLabel = (iso?: string | null) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Correction_NMain = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const bookmark = searchParams.get("bookmark") === "true";
  const sort = searchParams.get("sort") === "true";

  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["All", "Completed", "In Progress", "Pending"];

  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const statusQuery = useMemo<CorrectionStatus | undefined>(() => {
    if (selectedTab === 1) return "COMPLETED";
    if (selectedTab === 2) return "IN_PROGRESS";
    if (selectedTab === 3) return "PENDING";
    return undefined;
  }, [selectedTab]);

  useEffect(() => {
    setPage(1);
  }, [selectedTab, bookmark, sort]);

  const handleToggleBookmark = async (id: number) => {
    const current = documents.find((d) => d.id === id);
    if (!current) return;

    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, isStarred: !d.isStarred } : d)));

    try {
      if (current.isStarred) await removeNativeCorrectionBookmark(id);
      else await addNativeCorrectionBookmark(id);
    } catch (e) {
      setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, isStarred: current.isStarred } : d)));
      console.error(e);
      alert("북마크 변경에 실패했어요.");
    }
  };

  useEffect(() => {
    const run = async () => {
      try {
        const params: {
          page: number;
          size: number;
          status?: CorrectionStatus;
          bookmark?: true;
          sort?: true;
          correctorType?: "NATIVE_SPEAKER" | "AI_ASSISTANT";
        } = {
          page,
          size: PAGE_SIZE,
          ...(statusQuery ? { status: statusQuery } : {}),
          ...(bookmark ? { bookmark: true } : {}),
          ...(sort ? { sort: true } : {}),
          correctorType: "NATIVE_SPEAKER",
        };

        const res = (await getNativeCorrections(params)) as ApiResponse<CorrectionsListResult>;
        const result = res?.result;

        const nextDocs = Array.isArray(result?.corrections) ? result.corrections : [];

        setTotalCount(Number(result?.total ?? 0));
        setTotalPages(Number(result?.totalPages ?? 1));

        const rows: DocumentRow[] = nextDocs.map((item) => ({
          id: Number(item.correctionId),
          title: item.title ?? "(no title)",
          author: item.correctorName ?? "Native Speaker",
          date: toDateLabel(item.correctionCreatedAt),
          status: toStatusLabel(item.status),
          words: Number(item.wordCount ?? 0),
          isStarred: Boolean(item.bookmark),
          correctorName: item.correctorName ?? null,
          rawStatus: item.status,
        })) as any;

        setDocuments(rows);
      } catch (e) {
        console.error(e);
        setDocuments([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    };

    run();
  }, [page, statusQuery, bookmark, sort]);

  return (
    <div className="min-h-screen">
      <div className="flex w-full max-w-[1920px] mx-auto">
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

          <div className="w-full overflow-x-auto">
            <div className="min-w-[900px] mt-7">
              <DocumentTable documents={documents} onToggleBookmark={handleToggleBookmark} onRowClick={(row) => navigate(`/correction/native/list?correctionId=${row.id}`)} />
            </div>
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onChange={(p) => setPage(Number(p))} shape="num" className="flex items-center justify-center pt-[8px]" />
        </div>
      </div>
    </div>
  );
};

export default Correction_NMain;
