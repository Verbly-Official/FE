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
      className={`w-full h-[53px] flex items-center gap-5 pl-4 py-4 rounded-[4px] text-[length:var(--fs-title3)] cursor-pointer ${
        isSelected
          ? "bg-violet-100 text-violet-50 border-1 border-violet-50"
          : "bg-white text-black"
      }
      ${className ?? ""}
      `}
    >
      {icon && <div className="w-5 h-5">{icon}</div>}
      <span>{label}</span>
    </div>
  );
}
