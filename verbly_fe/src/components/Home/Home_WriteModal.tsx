import { useState } from "react";
import Select from "../Select/Select";
import type { Option } from "../Select/Select";
import TextArea from "../TextArea/TextArea";

const MOCK_OPTIONS: Option[] = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

export default function Home_WriteModal() {
  const [singleValue, setSingleValue] = useState<string | number>("");
  const [multiValue, setMultiValue] = useState<(string | number)[]>([]);

  return (
    <div>
      <TextArea />
      <div>
        <div>
          <div>Public Setting</div>
          <Select options={MOCK_OPTIONS} onChange={setSingleValue} />
        </div>
        <div>
          <div>Help Needed</div>
          <div>
            원어민의 Need correction 피드에 노출되어 빠른 교정을 받을 수
            있습니다.
          </div>
          <div></div>
        </div>
        <div>
          <div>Tag</div>
          <Select
            size="chip"
            options={MOCK_OPTIONS}
            onChange={setMultiValue}
            placeholder="#tag"
          />
        </div>
      </div>
    </div>
  );
}
