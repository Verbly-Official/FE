import React, { useState } from "react";
import Switch from "../components/Switch/Switch";

const SwitchTestPage: React.FC = () => {
  const [active1, setActive1] = useState(true);
  const [size1, setSize1] = useState<"small" | "medium">("small");

  const [active2, setActive2] = useState(true);
  const [size2, setSize2] = useState<"small" | "medium">("medium");

  const [active3, setActive3] = useState(false);
  const [size3, setSize3] = useState<"small" | "medium">("small");

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Switch 컴포넌트 테스트</h1>

      <div className="space-y-6">
        {/* 기본 small true */}
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
          <Switch active={active1} size={size1} onChange={setActive1} />
          <div>
            <p>Small / Active: {active1.toString()}</p>
            <button className="mt-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" onClick={() => setSize1(size1 === "small" ? "medium" : "small")}>
              Size Toggle
            </button>
          </div>
        </div>

        {/* medium true */}
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
          <Switch active={active2} size={size2} onChange={setActive2} />
          <div>
            <p>Medium / Active: {active2.toString()}</p>
            <button className="mt-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" onClick={() => setSize2(size2 === "small" ? "medium" : "small")}>
              Size Toggle
            </button>
          </div>
        </div>

        {/* small false */}
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
          <Switch active={active3} size={size3} onChange={setActive3} />
          <div>
            <p>Small / Active: {active3.toString()}</p>
            <button className="mt-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" onClick={() => setSize3(size3 === "small" ? "medium" : "small")}>
              Size Toggle
            </button>
          </div>
        </div>

        {/* 기본값 테스트 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="mb-4 font-medium">기본값 테스트 (active=true, size=small)</p>
          <Switch />
          <p className="mt-2 text-sm text-gray-500">클릭해서 토글 확인</p>
        </div>
      </div>
    </div>
  );
};

export default SwitchTestPage;
