import React from "react";
import Plus from "../../assets/emoji/plus.svg";
import Mic_On from "../../assets/emoji/mic-on.svg";
import Send from "../../assets/emoji/send-filled.svg";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  shape?: "square" | "round";
  showBtn?: boolean;
  onSendClick?: () => void;
  onMicClick?: () => void;
  onPlusClick?: () => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  shape = "square",
  showBtn = false,
  className = "",
  placeholder = "Add a comment or correction",
  disabled,
  onSendClick,
  onMicClick,
  onPlusClick,
  ...props
}) => {
  const radius = shape === "round" ? "rounded-full" : "rounded-xl";
  const baseBorder = shape === "round" ? "border-violet-200" : "border-gray-200";

  const rightPadding = showBtn ? "pr-[92px]" : "pr-4";
  const leftPadding = showBtn ? "pl-10" : "pl-4";

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative bg-white border w-full
          ${baseBorder}
          ${radius}
          focus-within:border-black
        `}
      >
        {/* left plus */}
        <button type="button" disabled={disabled} onClick={onPlusClick} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 hover:opacity-70 transition disabled:opacity-40">
          <img src={Plus} alt="plus" className="w-full h-full" draggable={false} />
        </button>

        <input
          {...props}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full h-12 bg-transparent outline-none
            text-sm placeholder:text-gray-400
            ${leftPadding} ${rightPadding}
          `}
        />

        {/* right buttons */}
        {showBtn && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button type="button" disabled={disabled} onClick={onMicClick} className="h-9 w-9 rounded-full grid place-items-center bg-violet-100 hover:bg-violet-200 transition disabled:opacity-40">
              <img src={Mic_On} alt="mic" className="w-4 h-4" />
            </button>

            <button type="button" disabled={disabled} onClick={onSendClick} className="h-9 w-9 rounded-full grid place-items-center bg-violet-100 hover:bg-violet-200 transition disabled:opacity-40">
              <img src={Send} alt="send" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
