import { useState } from "react";
import Select from "../Select/Select";
import type { Option } from "../Select/Select";
import TextArea from "../TextArea/TextArea";
import { SolidButton } from "../Button";
import { ReactComponent as SendIcon } from "../../assets/emoji/send-outlined.svg";
import Switch from "../Switch/Switch";
import Home_ChipBox from "./Home_ChipBox";

const MOCK_OPTIONS: Option[] = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];
type writeModalProp = {
  variant: "KOREAN" | "NATIVE";
};

export default function Home_WriteModal({
  variant = "KOREAN",
}: writeModalProp) {
  const [singleValue, setSingleValue] = useState<string | number>("");
  const [multiValue, setMultiValue] = useState<(string | number)[]>([]);

  return (
    <div className="w-[956px] h-[462px] p-[24px] bg-white flex flex-row gap-[12px] rounded-[12px]">
      {/* 마크다운 에디터 */}
      <TextArea header="마크다운 에디터" className="w-full h-full" />
      {/* Side */}
      <div className="w-[258px] h-[414px] p-[12px] gap-[60px] rounded-[12px] flex flex-col bg-violet-110">
        {/* Settings */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex flex-col gap-[4px] w-full">
            <div className="text-violet-20 font-semibold text-[16px] leading-[24px]">
              Public Setting
            </div>
            <Select
              options={MOCK_OPTIONS}
              onChange={setSingleValue}
              className="w-full h-[40px]"
            />
          </div>

          {/* 한국인의 경우에만 렌더링 */}
          {variant === "KOREAN" && (
            <div className="w-full p-[8px] flex flex-col gap-[5px] bg-violet-100 rounded-[8px]">
              <div className="text-violet-20 font-semibold text-[16px] leading-[24px]">
                Help Needed
              </div>
              <div className="text-violet-20 font-normal text-[12px]">
                원어민의 Need correction 피드에 노출되어 빠른 교정을 받을 수
                있습니다.
              </div>
              <Switch size="small" active={true} />
            </div>
          )}

          {/* Chip (Tags) */}
          <div className="flex flex-col gap-[4px]">
            <div className="text-violet-20 font-semibold text-[16px] leading-[24px]">
              Tag
            </div>
            <Home_ChipBox />
          </div>
        </div>

        {/* Post Now */}
        <SolidButton label="Post Now" iconSrc={SendIcon} />
      </div>
    </div>
  );
}
