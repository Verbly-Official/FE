import React, { type TextareaHTMLAttributes, useRef, useEffect, useCallback } from "react";

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  header?: string;
  maxRows?: number;
  maxWidth?: string; // 새로운 prop: 최대 너비 제어 (Tailwind 클래스나 CSS 값)
}

const TextArea: React.FC<TextAreaProps> = ({
  value = "",
  onChange,
  placeholder = "텍스트를 입력하세요...",
  header,
  maxRows = 10,
  maxWidth = "max-w-2xl", // 기본 최대 너비 (672px), 필요시 변경
  className = "",
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    const cs = window.getComputedStyle(el);
    const lineHeight = parseFloat(cs.lineHeight);
    const paddingTop = parseFloat(cs.paddingTop);
    const paddingBottom = parseFloat(cs.paddingBottom);

    const minHeight = lineHeight + paddingTop + paddingBottom;
    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;

    el.style.height = "auto";

    const next = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
    el.style.height = `${next}px`;
  }, [maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    requestAnimationFrame(adjustHeight);
  };

  return (
    <div className={`w-full ${maxWidth} bg-[var(--color-bg1)] rounded-xl border-2 border-[var(--color-line1)] overflow-hidden`}>
      {header && (
        <div className="p-4 bg-[var(--color-bg2)] border-b border-[var(--color-line1)]">
          <h3 className="text-[22px] leading-[22px] font-semibold text-[var(--Gray-10)] font-['Pretendard'] tracking-tight">{header}</h3>
        </div>
      )}

      <textarea
        ref={textareaRef}
        rows={1}
        className={`
          w-full p-4 text-base leading-6 
          bg-transparent border-0 resize-none
          focus:outline-none
          transition-all duration-200
          placeholder:text-gray-400 placeholder:font-medium
          ${className}
        `}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default TextArea;
