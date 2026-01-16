import React from "react";
import Search from "../../assets/search.svg";
import Close from "../../assets/close.svg";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  shape?: "square" | "round";
  showBtn?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ shape = "square", showBtn = false, className = "", placeholder = "Add a comment or correction", disabled, ...props }) => {
  const radius = shape === "round" ? "rounded-full w-[762px]" : "rounded-xl w-[534px]";
  const baseBorder = "border-gray-200";

  const leftPadding = "pl-10";
  const rightPadding = showBtn ? "pr-[92px]" : "pr-4";

  return (
    <div>
      <div
        className={`
          group relative border ${baseBorder} ${radius}
          bg-white
          transition-colors
          focus-within:border-black
          focus-within:bg-gray-50
        `}
      >
        <img
          src={Search}
          alt="plus"
          className="
            absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6
            opacity-70
            transition
            group-focus-within:opacity-100
            group-focus-within:brightness-0
          "
          draggable={false}
        />

        <input
          {...props}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full h-12 mx-4 bg-transparent outline-none
            text-sm placeholder:text-gray-400
            ${leftPadding} ${rightPadding}
            ${className}
          `}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 items-center gap-2 hidden group-focus-within:flex">
          <img
            src={Close}
            alt="close"
            className="
                  w-6 h-6 opacity-80 transition
                  group-focus-within:opacity-100
                  group-focus-within:brightness-0
                "
          />
        </div>
      </div>
    </div>
  );
};
