import { useState } from "react";
import BtnTab from "./BtnTab";

interface BtnTabsProps {
  btnTabs: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export default function BtnTabs({
  btnTabs,
  defaultIndex = 0,
  onChange,
}: BtnTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className="flex">
      {btnTabs.map((label, index) => (
        <BtnTab
          key={label}
          label={label}
          isSelected={activeIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
