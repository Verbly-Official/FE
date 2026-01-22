// AISection.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AIHelperMenu, { type AIToolKey } from "./AIMenu";
import AIResultPanel from "./AIResult";

type ViewMode = "menu" | "result";

type Props = {
  /** 에디터 텍스트 (AI 프롬프트에 넣거나 결과 생성에 활용) */
  text: string;

  /** 선택: 결과를 실제로 적용하고 싶으면 부모에서 구현해서 넘겨 */
  onApplyResult?: (result: string) => void;

  /** 선택: 원어민 첨삭 이동 경로 커스텀 */
  nativeRoute?: string; // default: "/correction"
};

const AISection: React.FC<Props> = ({ text, onApplyResult, nativeRoute = "/correction" }) => {
  const navigate = useNavigate();

  const [view, setView] = useState<ViewMode>("menu");
  const [tool, setTool] = useState<AIToolKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const goNative = () => navigate(nativeRoute);

  const runAI = () => {
    setView("result");
    setLoading(true);

    // TODO: 여기서 실제 API 호출로 교체
    window.setTimeout(() => {
      setLoading(false);
      setResult(`(${tool ?? "default"}) 첨삭 결과 예시입니다.\n\n원문:\n${text}`);
    }, 2000);
  };

  const backToMenu = () => {
    setView("menu");
    setLoading(false);
    setResult(null);
  };

  const apply = () => {
    if (!result) return;
    onApplyResult?.(result);
  };

  const content = useMemo(() => {
    if (view === "menu") {
      return <AIHelperMenu aiLoading={loading} onSelectTool={(t) => setTool(t)} onRunAI={runAI} onGoNative={goNative} />;
    }

    return <AIResultPanel loading={loading} tool={tool} result={result} onBack={backToMenu} onApply={onApplyResult ? apply : undefined} />;
  }, [view, loading, tool, result, text, onApplyResult]);

  return <div className="flex flex-col w-full h-full">{content}</div>;
};

export default AISection;
