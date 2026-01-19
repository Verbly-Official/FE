// Variant: 스타일 테마 ('destructive' 제거됨)
type ButtonVariant = "primary" | "secondary" | "assistive";
// Size: 버튼 크기
type ButtonSize = "small" | "medium" | "large";

interface SolidButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  error?: boolean; // error prop 추가
  className?: string;
  iconSrc?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function SolidButton({
  label,
  onClick,
  disabled = false,
  error = false, // 기본값 false
  className = "",
  iconSrc,
  variant = "primary",
  size = "large",
}: SolidButtonProps) {

  // Variant별 스타일 매핑
  const getVariantStyle = (variant: ButtonVariant) => {
    switch (variant) {
      case "secondary":
        // Secondary
        return "bg-violet-100 hover:bg-violet-90 active:bg-violet-80 text-gray-9";
      case "assistive":
        // Assistive
        return "bg-gray-1 hover:bg-gray-2 active:bg-gray-3 text-white";
      case "primary":
      default:
        // Primary
        return "bg-violet-50 hover:bg-violet-40 active:bg-violet-30 text-white";
    }
  };

  // Size별 크기 스타일
  const getSizeStyle = (size: ButtonSize) => {
    switch (size) {
      case "small":
        return "h-[40px] w-auto px-[8px] py-[20px] text-[14px]";
      case "large":
        return "h-[60px] w-auto px-[20px] py-[32px] text-[18px]"; 
      case "medium":
      default:
        return "h-[48px] w-auto px-[12px] py-[24px] text-[16px]";
    }
  };

  // 배경 및 텍스트 색상 결정 로직 (우선순위: Disabled > Error > Variant)
  const getColorStyle = () => {
    if (disabled) {
      return "bg-gray-2 cursor-not-allowed text-gray-9";
    }
    if (error) {
      return "bg-gray-1 text-[#EF1111]";
    }
    return `${getVariantStyle(variant)} cursor-pointer`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex justify-center items-center rounded-[8px] gap-[8px]
        font-medium transition-colors duration-200 border
        ${getSizeStyle(size)}
        ${getColorStyle()}
        ${className}
      `}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt="icon"
          className="w-[24px] h-[24px] object-contain"
        />
      )}
      <span>{label}</span>
    </button>
  );
}