import { ContentBadge } from "../../components/Badge/ContentBadge";

const documents = [
  {
    id: 1,
    title: "Business Email Draft for Partner",
    author: "AI Assistant",
    date: "2 days ago",
    status: "Completed",
    words: 148,
    changes: 8,
  },
  {
    id: 2,
    title: "Project Proposal v2",
    author: "Team Lead",
    date: "5 days ago",
    status: "Pending",
    words: 320,
    changes: 12,
  },
  {
    id: 3,
    title: "Client Presentation",
    author: "Marketing Team",
    date: "3 days ago",
    status: "In Progress",
    words: 210,
    changes: 25,
  },
];

export default function DocumentTable() {
  const StatusBadge = ({ status }: { status: string }) => {
    const getVariantClass = (status: string) => {
      switch (status.toLowerCase()) {
        case "completed":
          return "bg-[var(--System-Green-2)] text-[var(--System-Green-1)]"; // ✅ 오타 수정
        case "pending":
          return "bg-[var(--System-Orange-2)] text-[var(--System-Orange-1)]";
        case "in progress":
          return "bg-[var(--System-Blue-2)] text-[var(--System-Blue-1)]";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return <ContentBadge content={status} size="small" className={getVariantClass(status)} />;
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#E5E7EB] border-b bg-[#F1ECFC]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700">Document Name</th>
            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700">Author</th>
            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700">Date</th>
            <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{doc.title}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{doc.author}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{doc.date}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <StatusBadge status={doc.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
