type ButtonVariant = "primary" | "secondary" | "assistive" | "destructive";

interface OutlinedButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconSrc?: string;
  variant?: ButtonVariant;
}

export default function OutlinedButton({
  label,
  onClick,
  disabled = false,
  className = "",
  iconSrc,
  variant = "primary",
}: OutlinedButtonProps) {

  // Variant별 스타일 매핑 (Outlined 스타일)
  const getVariantStyle = (variant: ButtonVariant) => {
    switch (variant) {
      case "secondary":
        // Secondary
        return "border-gray-4 text-violet-50 hover:bg-gray-1 active:bg-gray-2";

      case "assistive":
        // Assistive
        return "border-gray-4 text-black hover:bg-gray-1 active:bg-gray-2";

      case "destructive":
        // Error
        return "border-red-1 text-red-1 bg-gray-1";

      case "primary":
      default:
        // Primary
        return "border-violet-50 text-violet-50 hover:bg-violet-100 active:bg-violet-90";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex justify-center items-center px-[24px] py-[12px] rounded-[8px] gap-[8px]
        text-[16px] font-medium transition-colors duration-200 border-[1px] bg-white
        ${
          disabled
            ? "border-gray-4 bg-gray-2 text-gray-4 cursor-not-allowed" // Disabled 상태
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