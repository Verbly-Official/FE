import React, { type TextareaHTMLAttributes, useRef, useEffect, useCallback } from "react";

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  header?: string;
  maxRows?: number;
  /** true면 내용에 따라 높이 자동 조절, false면 부모/스타일에 맡김 */
  autoResize?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  value = "",
  onChange,
  placeholder = "텍스트를 입력하세요...",
  header,
  maxRows = 10,
  className = "",
  autoResize = false, // 기본: 자동 리사이즈 끔 (부모 높이 채우기 용이)
  style,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    if (!autoResize) return;

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
  }, [autoResize, maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    if (autoResize) {
      requestAnimationFrame(adjustHeight);
    }
  };

  return (
    <div className="relative bg-[var(--color-bg1)] rounded-xl border-2 border-[var(--color-line1)] overflow-hidden">
      {header && (
        <div className="p-4 bg-[var(--color-bg2)] border-b border-[var(--color-line1)]">
          <h3 className="text-[22px] leading-[22px] font-semibold text-[var(--Gray-10)] font-['Pretendard'] tracking-tight">{header}</h3>
        </div>
      )}

      <textarea
        ref={textareaRef}
        // autoResize=false일 때는 rows/height를 부모에서 제어 가능
        rows={autoResize ? 1 : props.rows}
        className={`
          w-full p-4 text-base leading-6 
          bg-transparent border-0 resize-none
          focus:outline-none
          transition-all duration-200
          placeholder:text-gray-400 placeholder:font-medium
          ${className}
        `}
        style={style}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default TextArea;
