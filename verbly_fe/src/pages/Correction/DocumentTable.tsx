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
  // ... 더 추가 (api 연동시 수정 예정)
];

export default function DocumentTable() {
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
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Business Email Draft for Partner</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">AI Assistant</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">2 days ago</td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Completed</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
