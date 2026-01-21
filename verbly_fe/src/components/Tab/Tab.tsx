interface TabProps {
  text: string /* 컴포넌트 이름 */;
  isSelected: boolean /* 선택 여부 */;
}
export default function Tab({ text, isSelected }: TabProps) {
  return (
    <div className={`flex justify-center items-center px-[60px] py-[12px] w-[169px] h-[48px] border-b-[1px] border-gray-4"${isSelected ? "border-violet-50 text-violet-50" : ""}`}>
      <div>{text}</div>
    </div>
  );
}
