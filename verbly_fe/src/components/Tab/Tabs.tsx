import { useState } from "react";
import Tab from "./Tab";

interface TabsProps {
  tabs: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export default function Tabs({ tabs, defaultIndex = 0, onChange }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className="flex">
      {tabs.map((label, index) => (
        <Tab
          key={label}
          label={label}
          isSelected={activeIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
