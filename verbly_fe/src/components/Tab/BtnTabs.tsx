import { useState } from "react";
import BtnTab from "./BtnTab";

interface BtnTabsProps {
  btnTabs: string[];
  iconSrcs: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export default function BtnTabs({
  btnTabs,
  iconSrcs,
  defaultIndex = 0,
  onChange,
}: BtnTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className="flex inline-flex bg-gray-2 p-[4px] rounded-[24px]">
      {btnTabs.map((label, index) => (
        <BtnTab
          key={label}
          label={label}
          iconSrc={iconSrcs[index] ?? ""}
          isSelected={activeIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
