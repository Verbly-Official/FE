type SideMenuProps = {
  label: string;
  isSelected: boolean;
  icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function SideMenu_Tab({
  label,
  isSelected = false,
  icon,
  className,
  ...props
}: SideMenuProps) {
  return (
    <div
      {...props}
      className={`h-[56px] flex items-center gap-[20px] p-[16px] rounded-[4px] text-[length:var(--fs-title3)] cursor-pointer ${
        isSelected
          ? "bg-violet-100 text-violet-50 border-[1px] border-violet-50"
          : "bg-white"
      }
      ${className ?? ""}
      `}
    >
      {icon && <div className="w-[20px] h-[20px]">{icon}</div>}
      <span>{label}</span>
    </div>
  );
}
