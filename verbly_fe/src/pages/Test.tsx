import React, { useState } from "react";
import Select from "../components/Select/Select"; // Select 컴포넌트 경로 확인 필요

const Test = () => {
  // 각 Select의 상태 관리
  const [valueLarge, setValueLarge] = useState<string | number>("");
  const [valueMedium, setValueMedium] = useState<string | number>("");
  const [valueSmall, setValueSmall] = useState<string | number>("");
  const [valueChip, setValueChip] = useState<string | number>("");
  const [valueError, setValueError] = useState<string | number>("");
  const [valueDisabled, setValueDisabled] = useState<string | number>("option1");

  // 테스트용 옵션 데이터
  const options = [
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "긴 텍스트 옵션 테스트입니다" },
    { value: "option4", label: "옵션 4" },
    { value: "option5", label: "옵션 5" },
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Component Test</h1>

      {/* 1. Sizes Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">1. Sizes</h2>
        
        <div className="grid gap-6">
          {/* Large (Default) */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Large (Default) - 48px</h3>
            <Select
              label="Large Select"
              options={options}
              value={valueLarge}
              onChange={setValueLarge}
              placeholder="사이즈: Large"
              size="large"
            />
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Medium - 40px</h3>
            <Select
              label="Medium Select"
              options={options}
              value={valueMedium}
              onChange={setValueMedium}
              placeholder="사이즈: Medium"
              size="medium"
            />
          </div>

          {/* Small */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Small - 32px</h3>
            <Select
              label="Small Select"
              options={options}
              value={valueSmall}
              onChange={setValueSmall}
              placeholder="사이즈: Small"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* 2. Chip Mode Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">2. Chip Mode</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">
            선택 시 텍스트 대신 Chip 컴포넌트가 렌더링됩니다.
          </p>
          <div className="w-48"> {/* 너비 제한 테스트 */}
            <Select
              label="Chip Select"
              options={options}
              value={valueChip}
              onChange={setValueChip}
              placeholder="필터 선택"
              size="chip"
            />
          </div>
        </div>
      </section>

      {/* 3. States Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">3. States</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Error State */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Error State</h3>
            <Select
              label="Error Case"
              options={options}
              value={valueError}
              onChange={setValueError}
              placeholder="에러 발생"
              error={true}
              errorMessage="필수 항목입니다."
            />
          </div>

          {/* Disabled State */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Disabled State</h3>
            <Select
              label="Disabled Case"
              options={options}
              value={valueDisabled}
              onChange={setValueDisabled}
              disabled={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Test;