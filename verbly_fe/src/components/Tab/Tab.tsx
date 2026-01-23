interface TabProps {
  label: string /* 컴포넌트 이름 */;
  isSelected: boolean;
  onClick: () => void;
}
export default function Tab({ label, isSelected, onClick }: TabProps) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center px-[60px] py-[12px] w-auto h-[48px] border-b-[1px] border-gray-4"${isSelected ? "border-violet-50 text-violet-50" : "border-gray-4 text-gray-4"}`}
    >
      <div>{label}</div>
    </div>
  );
}
