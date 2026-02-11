import React, { useState, useRef, useEffect } from "react";
import Chip from "../Chip/Chip";
import ChevDown from "../../assets/emoji/chev-down.svg";
import ChevUp from "../../assets/emoji/chev-up.svg";

export interface Option {
  value: string | number;
  label: string;
}

type SelectSize = "small" | "medium" | "large" | "chip";

interface SelectProps {
  options: Option[];
  value?: string | number | (string | number)[];
  onChange: (value: any) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  size?: SelectSize;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Text",
  error = false,
  errorMessage,
  disabled = false,
  className = "",
  size = "large",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isChipMode = size === "chip";
  const isMultiSelect = isChipMode;

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const selectedSingleValue = Array.isArray(value) ? value[0] : value;
  const selectedOption = options.find(
    (opt) => opt.value === selectedSingleValue,
  );

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (optionValue: string | number) => {
    if (disabled) return;

    if (isMultiSelect) {
      if (!selectedValues.includes(optionValue)) {
        const newValues = [...selectedValues, optionValue];
        onChange(newValues);
      }
      setIsOpen(false);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleRemoveChip = (
    e: React.MouseEvent,
    valToRemove: string | number,
  ) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== valToRemove);
    onChange(newValues);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "h-[40px] px-3 text-[length:var(--fs-body2)] rounded-xl";
      case "medium":
        return "h-[48px] px-4 text-[length:var(--fs-subtitle2)] rounded-xl";
      case "chip":
        return "h-[36px] px-2 text-[length:var(--fs-body2)] rounded-xl";
      case "large":
      default:
        return "h-[60px] px-4 text-[length:var(--fs-subtitle1)] rounded-xl";
    }
  };

  const getDropdownItemClass = () => {
    switch (size) {
      case "small":
        return "py-2 px-3 text-[length:var(--fs-body2)]";
      case "chip":
      case "medium":
        return "py-2.5 px-4 text-[length:var(--fs-subtitle2)]";
      case "large":
      default:
        return "py-3 px-4 text-[length:var(--fs-subtitle1)]";
    }
  };

  const getBorderClass = () => {
    if (disabled)
      return "bg-gray-1 cursor-not-allowed opacity-70 border-gray-2";
    if (error) return "border-pink-20"; 
    if (isOpen) return "border-blue-40";
    return "border-gray-3 hover:border-gray-9";
  };

  return (
    <div
      className={`relative flex flex-col gap-2 w-[280px] outline-none ${className}`}
      ref={containerRef}
    >
      <div
        onClick={handleToggle}
        className={`
          flex items-center justify-between
          border transition-all duration-200 cursor-pointer
          w-full 
          bg-[var(--color-white)]
          ${getSizeClass()}
          ${getBorderClass()}
        `}
      >
        <div className="flex items-center flex-1 overflow-hidden h-full">
          {isChipMode && selectedValues.length > 0 ? (
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full h-full">
              {selectedValues.map((val) => {
                const opt = options.find((o) => o.value === val);
                if (!opt) return null;
                return (
                  <div
                    key={val}
                    onClick={(e) => handleRemoveChip(e, val)}
                    className="shrink-0"
                  >
                    <Chip label={opt.label} />
                  </div>
                );
              })}
            </div>
          ) : (
            <span
              className={`truncate ${
                (isChipMode ? selectedValues.length > 0 : selectedOption)
                  ? "text-gray-9"
                  : "text-gray-5"
              }`}
            >
              {isChipMode && selectedValues.length > 0
                ? ""
                : selectedOption
                  ? selectedOption.label
                  : placeholder}
            </span>
          )}
        </div>

        <img
          src={isOpen ? ChevUp : ChevDown}
          alt="toggle"
          className="w-4 h-4 ml-2 shrink-0"
        />
      </div>

      {isOpen && !disabled && (
        <ul className="absolute top-full left-0 w-full mt-1 bg-[var(--color-white)] border border-gray-3 rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = isMultiSelect
              ? selectedValues.includes(option.value)
              : option.value === value;

            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  cursor-pointer
                  transition-colors duration-150
                  ${getDropdownItemClass()}
                  ${isSelected ? "bg-blue-100 text-gray-9" : "text-gray-9"}
                  ${!isSelected && "hover:bg-gray-1 active:bg-gray-2"}
                `}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}

      {error && errorMessage && (
        <span className="text-xs text-pink-20 mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;