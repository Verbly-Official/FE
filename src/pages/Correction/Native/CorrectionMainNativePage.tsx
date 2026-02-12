import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../../components/Tab/Tab";

import DocumentTable, { type DocumentRow } from "../components/DocumentTable";
import File from "../../../assets/emoji/file.svg?react";
import { Pagination } from "../../../components/Pagination/Pagination";
import { getNativeCorrections } from "../../../apis/correctionNative";

const Correction_NMain = () => {
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["All", "Completed", "In Progress", "Pending"];

  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const statusQuery = useMemo(() => {
    if (selectedTab === 1) return "COMPLETED";
    if (selectedTab === 2) return "IN_PROGRESS";
    if (selectedTab === 3) return "PENDING";
    return undefined;
  }, [selectedTab]);

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  const PAGE_SIZE = 4;

  useEffect(() => {
    const run = async () => {
      try {
        const apiPage = page - 1;

        const params: any = {
          page: apiPage,
          size: PAGE_SIZE,
          status: statusQuery,
        };

        const res = await getNativeCorrections(params);
        const result = res?.result;

        const nextDocs = Array.isArray(result?.corrections) ? result.corrections : [];

        setTotalCount(Number(result?.totalElements ?? 0));
        setTotalPages(Number(result?.totalPages ?? 1));

        const rows: DocumentRow[] = nextDocs.map((item: any) => {
          const statusText = item.status === "COMPLETED" ? "Completed" : item.status === "IN_PROGRESS" ? "In Progress" : item.status === "PENDING" ? "Pending" : String(item.status ?? "-");

          return {
            id: Number(item.correctionId),
            title: item.title ?? "(no title)",
            author: item.correctorName ?? "Native Speaker",
            date: item.correctionCreatedAt ? new Date(item.correctionCreatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-",
            status: statusText,
            words: 0,
            isStarred: Boolean(item.bookmark),
          };
        });

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
              <DocumentTable documents={documents} onRowClick={(row) => navigate(`/correction/native/list?correctionId=${row.id}`)} />
            </div>
          </div>

          <Pagination currentPage={page - 1} totalPages={totalPages} onChange={(p) => setPage(p + 1)} shape="num" className="flex items-center justify-center pt-[8px]" />
        </div>
      </div>
    </div>
  );
};

export default Correction_NMain;
