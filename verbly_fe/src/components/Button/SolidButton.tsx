type ButtonVariant = "primary" | "secondary" | "assistive" | "destructive";

interface SolidButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconSrc?: string;
  variant?: ButtonVariant;
}

export default function SolidButton({
  label,
  onClick,
  disabled = false,
  className = "",
  iconSrc,
  variant = "primary",
}: SolidButtonProps) {
  
  // Variant별 스타일 매핑
  const getVariantStyle = (variant: ButtonVariant) => {
    switch (variant) {
      case "secondary":
        // Secondary
        return "bg-violet-100 hover:bg-violet-90 active:bg-violet-80 text-white";
      
      case "assistive":
        // Assistive
        return "bg-gray-1 hover:bg-gray-2 active:bg-gray-3 text-white";

      case "destructive":
        // Error 
        return "bg-gray-1 text-red-1";
      
      case "primary":
      default:
        // Primary
        return "bg-violet-50 hover:bg-violet-40 active:bg-violet-30 text-white";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex justify-center items-center px-[24px] py-[12px] rounded-[8px] gap-[8px]
        text-[16px] font-medium transition-colors duration-200
        ${
          disabled
            ? "bg-gray-3 cursor-not-allowed text-gray-5" // Disabled 상태
            : `${getVariantStyle(variant)} cursor-pointer`
        }
        ${className}
      `}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt="icon"
          className="w-[20px] h-[20px] object-contain"
        />
      )}
      <span>{label}</span>
    </button>
  );
}