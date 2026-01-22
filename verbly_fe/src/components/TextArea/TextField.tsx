import React from "react";
import Plus from "../../assets/emoji/plus.svg";
import Mic_On from "../../assets/emoji/mic-on.svg";
import Send from "../../assets/emoji/send-filled.svg";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  shape?: "square" | "round";
  showBtn?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ shape = "square", showBtn = false, className = "", placeholder = "Add a comment or correction", disabled, ...props }) => {
  const radius = shape === "round" ? "rounded-full w-[762px]" : "rounded-xl w-[534px]";

  const baseBorder = shape === "round" ? "border-violet-200" : "border-gray-200";

  const rightPadding = showBtn ? "pr-[92px]" : "pr-4";
  const leftPadding = showBtn ? "pl-10" : "pl-4";

  return (
    <div>
      <div
        className={`
          relative bg-white border
          ${baseBorder}
          ${radius}
          focus-within:border-black
        `}
      >
        {/* left plus */}
        {showBtn && <img src={Plus} alt="plus" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" draggable={false} />}

        <input
          {...props}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full h-12 bg-transparent outline-none
            text-sm placeholder:text-gray-400
            ${leftPadding} ${rightPadding}
            ${className}
          `}
        />

        {/* right buttons */}
        {showBtn && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button type="button" disabled={disabled} className="h-9 w-9 rounded-full grid place-items-center bg-violet-100 hover:bg-violet-200 transition disabled:opacity-40">
              <img src={Mic_On} alt="mic" className="w-4 h-4" />
            </button>

            <button type="button" disabled={disabled} className="h-9 w-9 rounded-full grid place-items-center bg-violet-100 hover:bg-violet-200 transition disabled:opacity-40">
              <img src={Send} alt="send" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
