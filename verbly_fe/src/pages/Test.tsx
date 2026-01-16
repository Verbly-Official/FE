import { useState } from "react";
import TextArea from "../components/TextArea/TextArea";

const Test = () => {
  const [value, setValue] = useState("");

  return (
    <div className="p-8">
      <TextArea value={value} onChange={(e) => setValue(e.target.value)} placeholder="여기에 텍스트 입력..." />
    </div>
  );
};

export default Test;
