import { useState } from "react";
const TABS = [
  {
    label: "Button",
    iconActive: "../../src/assets/emoji/checkbox-dashed-white.svg",
    iconInactive: "../../src/assets/emoji/checkbox-dashed-gray.svg",
  },
  {
    label: "Button",
    iconActive: "../../src/assets/emoji/checkbox-dashed-white.svg",
    iconInactive: "../../src/assets/emoji/checkbox-dashed-gray.svg",
  },
];

export default function BtnTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="inline-flex px-[4px] py-[4px] rounded-[24px] bg-gray-2">
      {TABS.map((tab, index) => {
        const isSelected = selectedIndex === index;

        return (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`inline-flex items-center gap-[4px] px-[12px] py-[8px] rounded-[24px] cursor-pointer ${
              isSelected
                ? "bg-violet-50 text-white"
                : "bg-transparent text-gray-6"
            }`}
          >
            <img
              src={isSelected ? tab.iconActive : tab.iconInactive}
              className="w-[24px] h-[24px]"
            />
            <span>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}
