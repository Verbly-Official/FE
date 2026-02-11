interface ContentBadgeProps {
  content: string;
  className?: string;
}

export const ContentBadge = ({ content, className = '' }: ContentBadgeProps) => {
  return (
    <div
      className={`bg-blue-90 px-[8px] py-[4px] rounded-[4px] flex items-center justify-center ${className}`}
    >
      <span className="text-btn-medium14 text-blue-60">{content}</span>
    </div>
  );
};
