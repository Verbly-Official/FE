import { Badge } from "../../../components/Badge/ContentBadge";
import Star_t from "../../../assets/emoji/star-true.svg";
import Star_f from "../../../assets/emoji/star-false.svg";

export type DocumentRow = {
  id: number;
  title: string;
  author: string;
  date: string;
  status: string;
  words: number;
  isStarred: boolean;
  correctorName?: string | null;
  rawStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED";
};

type DocumentTableProps = {
  documents: DocumentRow[];
  onToggleBookmark?: (id: number) => void;
  onRowClick?: (row: DocumentRow) => void;

  /** 옵션 (기본 true) */
  showAuthor?: boolean;
  showStar?: boolean;
  showWords?: boolean;
  renderStatusCell?: (row: DocumentRow) => React.ReactNode;
};

export default function DocumentTable({ documents, onToggleBookmark, onRowClick, showAuthor = true, showStar = true, showWords = true, renderStatusCell }: DocumentTableProps) {
  const StatusBadge = ({ status }: { status: string }) => {
    const getVariantClass = (status: string) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "!bg-[var(--System-Orange-2,#FFECD4)] !text-[var(--System-Orange-1,#FFA938)]";
        case "completed":
          return "!bg-[var(--System-Green-2,#D1FAE5)] !text-[var(--System-Green-1,#047857)]";
        case "in progress":
          return "!bg-[var(--Point-Blue-90,#E0EBFF)] !text-[var(--point-blue-60-normal,#4F46DD)]";
        default:
          return "!bg-gray-100 !text-gray-800";
      }
    };

    return <Badge content={status} size="small" className={getVariantClass(status)} />;
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F1ECFC]">
      <table className="min-w-full table-fixed divide-y divide-gray-200">
        {/* ===== Header ===== */}
        <thead>
          <tr>
            <th className="w-[340px] px-[20px] py-4 text-left font-pretendard text-[18px] font-medium text-[var(--Gray-7,#585858)]">Document Name</th>

            {showAuthor && <th className="w-[200px] px-[20px] py-4 text-left font-pretendard text-[18px] font-medium text-[var(--Gray-7,#585858)]">Corrector</th>}

            <th className="w-[200px] px-[20px] py-4 text-left font-pretendard text-[18px] font-medium text-[var(--Gray-7,#585858)]">Date</th>

            <th className="w-[200px] px-[20px] py-4 text-left font-pretendard text-[18px] font-medium text-[var(--Gray-7,#585858)]">Status</th>
          </tr>
        </thead>

        {/* ===== Body ===== */}
        <tbody className="divide-y divide-gray-100 bg-white">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick?.(doc)}>
              {/* Title column */}
              <td className="px-[20px] py-5">
                <div className="flex items-center">
                  {showStar && (
                    <img
                      src={doc.isStarred ? Star_t : Star_f}
                      className="w-7 h-7 flex-shrink-0 pr-3 cursor-pointer [filter:brightness(0)_saturate(100%)_invert(62%)]"
                      alt="Star"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark?.(doc.id);
                      }}
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="p-1 truncate font-pretendard text-[20px] font-bold text-[var(--Gray-10,#1F1F1F)] leading-none">{doc.title}</p>

                    {showWords && (
                      <div>
                        <span className="text-gray-500 text-[14px] leading-none">•</span>
                        <span className="ml-1 font-pretendard text-[15px] font-semibold text-[var(--Gray-7,#585858)] leading-[150%]">{doc.words} words</span>
                      </div>
                    )}
                  </div>
                </div>
              </td>

              {/* Author */}
              {showAuthor && <td className="px-4 font-pretendard text-[16px] font-medium text-[var(--Gray-10,#1F1F1F)]">{doc.author}</td>}

              {/* Date */}
              <td className="px-4 font-pretendard text-[16px] font-medium text-[var(--Gray-10,#1F1F1F)]">{doc.date}</td>

              {/* Status */}
              <td className="px-4 whitespace-nowrap py-7">{renderStatusCell ? renderStatusCell(doc) : <StatusBadge status={doc.status} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
