import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { removeDraftCorrection } from "../../../apis/correction";

import DocumentTable from "../components/DocumentTable";
import type { DocumentRow } from "../components/DocumentTable";
import { Pagination } from "../../../components/Pagination/Pagination";
import { getDraftCorrections } from "../../../apis/correction";
import { SolidButton } from "../../../components/Button";
import { OutlinedButton } from "../../../components/Button";
import TrashIcon from "../../../assets/emoji/delete.svg?react";
import EditIcon from "../../../assets/emoji/edit.svg?react";

const Correction_drafts = () => {
  const SERVER_PAGE_IS_ZERO_BASED = true;

  const [page, setPage] = useState(1); // UI는 1부터
  const [selectedTab, setSelectedTab] = useState(0);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

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

        const list = res?.result ?? [];
        const total = Array.isArray(list) ? list.length : 0;

        setTotalCount(total);
        setTotalPages(1);

        const rows: DocumentRow[] = list.map((item: any) => {
          const created = item.createdAt ? new Date(item.createdAt) : null;
          const dateText = created ? created.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-";

          return {
            id: item.postId,
            title: item.title ?? "(no title)",
            author: item.authorNickname ?? "-",
            date: dateText,
            status: "Draft",
            words: 0,
            isStarred: false,
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
  }, [page]);

  const handleDeleteDraft = async (postId: number) => {
    const ok = window.confirm("이 임시저장 글을 삭제할까요?");
    if (!ok) return;

    try {
      await removeDraftCorrection(postId);

      setDocuments((prev) => prev.filter((d) => d.id !== postId));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했어요.");
    }
  };
  return (
    <div className="min-h-screen">
      <div className="flex-1 min-w-0 py-9 min-h-[940px] rounded-r-[12px] border border-[#E5E7EB] bg-[#FBFBFB] items-center px-[clamp(48px,6vw,122px)]">
        <div className="w-full overflow-x-auto">
          <div className="text-black font-pretendard text-[24px] font-bold leading-[100%] mb-6">임시저장</div>
          <div className="min-w-[900px]">
            <DocumentTable
              documents={documents}
              showAuthor={false}
              showStar={false}
              showWords={false}
              renderStatusCell={(row) => (
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <OutlinedButton Icon={EditIcon} label="마저 작성하기" className="!h-[48px]" onClick={() => navigate(`/correction/write?draftId=${row.id}`)} />
                  <SolidButton Icon={TrashIcon} variant="secondary" className="!h-[48px]" onClick={() => handleDeleteDraft(row.id)} />
                </div>
              )}
            />
          </div>
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} shape="num" className="flex items-center justify-center pt-[8px]" />
      </div>
    </div>
  );
};

export default Correction_drafts;
