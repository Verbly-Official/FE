import React from "react";

interface SwitchProps {
  active?: boolean;
  size?: "small" | "medium";
  onChange?: (active: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ active = true, size = "small", onChange }) => {
  const handleClick = () => {
    onChange?.(!active);
  };

  const sizeClasses = {
    small: "w-[39px] h-6",
    medium: "w-[52px] h-[32px]",
  }[size];

  const thumbSizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
  }[size];

  // 토글 이동 범위
  const translateClasses = {
    small: "translate-x-[15px]",
    medium: "translate-x-[20px]",
  }[size];

  const trackClasses = `flex items-center p-1 ${sizeClasses} rounded-full transition-colors duration-200 cursor-pointer shadow-inner ${active ? "bg-[#713DE3]" : "bg-gray-200"}`;

  const thumbClasses = ` bg-white ${thumbSizeClasses} rounded-full shadow-md transform transition-transform duration-200 pointer-events-none ${active ? translateClasses : ""}`;

  return (
    <div className={trackClasses} onClick={handleClick} role="switch" aria-checked={active}>
      <div className={thumbClasses} />
    </div>
  );
};

export default Switch;
