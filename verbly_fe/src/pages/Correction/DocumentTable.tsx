import { ContentBadge } from "../../components/Badge/ContentBadge";
import Star_t from "../../assets/emoji/star-true.svg";
import Star_f from "../../assets/emoji/star-false.svg";

const documents = [
  {
    id: 1,
    title: "Business Email Draft for Partner",
    author: "AI Assistant",
    date: "2 days ago",
    status: "Completed",
    words: 148,
    changes: 8,
    isStarred: false,
  },
  {
    id: 2,
    title: "Project Proposal v2",
    author: "Team Lead",
    date: "5 days ago",
    status: "Pending",
    words: 320,
    changes: 12,
    isStarred: true,
  },
  {
    id: 3,
    title: "Client Presentation",
    author: "Marketing Team",
    date: "3 days ago",
    status: "In Progress",
    words: 210,
    changes: 25,
    isStarred: true,
  },
];

export default function DocumentTable() {
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

    return <ContentBadge content={status} size="small" className={getVariantClass(status)} />;
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#E5E7EB] border-b bg-[#F1ECFC]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-[20px] py-4 text-left font-['Pretendard'] text-[20px] font-medium leading-none text-[var(--Gray-7,#585858)]">Document Name</th>
            <th className="px-[20px] py-4 text-left font-['Pretendard'] text-[20px] font-medium leading-none text-[var(--Gray-7,#585858)]">Author</th>
            <th className="px-[20px] py-4 text-left font-['Pretendard'] text-[20px] font-medium leading-none text-[var(--Gray-7,#585858)]">Date</th>
            <th className="px-[20px] py-4 text-left font-['Pretendard'] text-[20px] font-medium leading-none text-[var(--Gray-7,#585858)]">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-[20px] py-7">
                <div className="flex items-center">
                  {/* 즐겨찾기 유무 */}
                  <img src={doc.isStarred ? Star_t : Star_f} className="w-6 h-6 flex-shrink-0 pr-3 [filter:brightness(0)_saturate(100%)_invert(62%)]" alt="Star" />

                  {/* 제목 + 단어 수*/}
                  <div className="min-w-0 flex-1">
                    <p className="overflow-hidden text-[var(--Gray-10,#1F1F1F)] truncate font-['Pretendard'] text-[24px] font-bold leading-none">{doc.title}</p>
                    <div>
                      {/* 1. 불릿 포인트 (•) */}
                      <span className="text-gray-500 text-[14px] leading-none">•</span>

                      {/* 2. 숫자 + words (inline 스타일) */}
                      <span className="text-[var(--Gray-7,#585858)] font-['Pretendard'] text-[15px] font-semibold leading-[150%]">{doc.words} words</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-[var(--Gray-10,#1F1F1F)] font-['Pretendard'] text-[20px] font-medium leading-none">{doc.author}</td>
              <td className="text-[var(--Gray-10,#1F1F1F)] font-['Pretendard'] text-[20px] font-medium leading-none">{doc.date}</td>
              <td className="whitespace-nowrap px-6 py-7">
                <StatusBadge status={doc.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
