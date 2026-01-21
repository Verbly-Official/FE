import { useState } from "react";
interface TabProps {
  label: string /* 컴포넌트 이름 */;
}
export default function Tab({ label }: TabProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      onClick={() => setIsSelected((prev) => !prev)}
      className={`flex justify-center items-center px-[60px] py-[12px] w-[169px] h-[48px] border-b-[1px] border-gray-4"${isSelected ? "border-violet-50 text-violet-50" : "border-gray-4 text-gray-4"}`}
    >
      <div>{label}</div>
    </div>
  );
}
