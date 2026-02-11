import { useState } from "react";
import Select from "../Select/Select";
import type { Option } from "../Select/Select";
import TextArea from "../TextArea/TextArea";
import { SolidButton } from "../Button";
import SendIcon from "../../assets/emoji/send-outlined.svg?react";
import Switch from "../Switch/Switch";
import Home_ChipBox from "./Home_ChipBox";
import { createPost } from "../../apis/post";

const MOCK_OPTIONS: Option[] = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];
type writeModalProp = {
  variant: "KOREAN" | "NATIVE";
  onClose?: () => void;
  onPostCreated?: () => void;
};

export default function Home_WriteModal({
  variant = "KOREAN",
  onClose,
  onPostCreated,
}: writeModalProp) {
  const [content, setContent] = useState("");
  const [publicSetting, setPublicSetting] = useState("public");
  const [tags, setTags] = useState<string[]>([]);
  const [helpNeeded, setHelpNeeded] = useState(true);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      const result = await createPost({
        content,
        publicSetting: publicSetting === "public",
        tags,
      });

      console.log("생성 완료:", result);

      onPostCreated?.(); // 홈 새로고침
    } catch (error) {
      console.error(error);
    } finally {
      onClose?.(); // 모달 닫기
    }
  };

  return (
    <div className="w-[956px] h-[462px] p-[24px] bg-white flex flex-row gap-[12px] rounded-[12px]">
      {/* 마크다운 에디터 */}
      <TextArea
        header="마크다운 에디터"
        className="w-full h-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {/* Side */}
      <div className="w-[258px] h-[414px] p-[12px] gap-[60px] rounded-[12px] flex flex-col bg-violet-110">
        {/* Settings */}
        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex flex-col gap-[4px] w-full">
            <div className="text-violet-20 font-semibold text-[length:var(--fs-subtitle2)] leading-[24px]">
              Public Setting
            </div>
            <Select
              options={MOCK_OPTIONS}
              onChange={(val) => setPublicSetting(val as string)}
              className="w-full h-[40px]"
            />
          </div>

          {/* 한국인의 경우에만 렌더링 */}
          {variant === "KOREAN" && (
            <div className="w-full p-[8px] flex flex-col gap-[5px] bg-violet-100 rounded-[8px]">
              <div className="text-violet-20 font-semibold text-[length:var(--fs-subtitle2)] leading-[24px]">
                Help Needed
              </div>
              <div className="text-violet-20 font-normal text-[length:var(--fs-button2)]">
                원어민의 Need correction 피드에 노출되어 빠른 교정을 받을 수
                있습니다.
              </div>
              <Switch
                size="small"
                active={helpNeeded}
                onChange={setHelpNeeded}
              />
            </div>
          )}

          {/* Chip (Tags) */}
          <div className="flex flex-col gap-[4px]">
            <div className="text-violet-20 font-semibold text-[length:var(--fs-subtitle2)] leading-[24px]">
              Tag
            </div>
            <Home_ChipBox tags={tags} setTags={setTags} />
          </div>
        </div>

        {/* Post Now */}
        <SolidButton
          label="Post Now"
          Icon={SendIcon}
          onClick={handleSubmit}
          disabled={!content.trim()}
        />
      </div>
    </div>
  );
}
