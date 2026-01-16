import { useState } from "react";
import TextArea from "../components/TextArea/TextArea";
import { TextField } from "../components/TextArea/TextField";

const Test = () => {
  const [value, setValue] = useState("");

  return (
    <div className="p-8">
      <TextArea value={value} onChange={(e) => setValue(e.target.value)} placeholder="여기에 텍스트 입력..." />
      <TextField shape="square" showBtn={false} placeholder="질문을 적어주세요..." />
      <TextField shape="square" showBtn={true} />
      <TextField shape="round" showBtn={true} />
    </div>
  );
};

export default Test;
