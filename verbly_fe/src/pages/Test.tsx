import { useState } from "react";
import { Text } from "../components/Text/Text";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Pagination } from "../components/Pagination/Pagination";

const Test = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="p-8 space-y-8">
      {/* Small size */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Small</h2>

        <div className="flex flex-wrap gap-4 items-center">
          <Text size="small">기본 텍스트</Text>
          <Text size="small" state="wrong">
            틀린 표현
          </Text>
          <Text size="small" state="right">
            정답 표현
          </Text>
          <Text size="small" state="suggestion">
            수정 제안
          </Text>
          <Text size="small" state="highlight">
            강조 키워드
          </Text>
        </div>
      </section>

      {/* Medium size */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Medium</h2>

        <div className="flex flex-wrap gap-4 items-center">
          <Text size="medium">본문 텍스트</Text>
          <Text size="medium" state="wrong">
            잘못된 문장
          </Text>
          <Text size="medium" state="right">
            올바른 문장
          </Text>
          <Text size="medium" state="suggestion">
            이렇게 바꿔보세요
          </Text>
          <Text size="medium" state="highlight">
            중요한 내용
          </Text>
        </div>
      </section>

      {/* Search */}
      <SearchBar shape="round" />

      {/* Pagination */}
      <Pagination shape="dot" currentPage={page} totalPages={10} onChange={setPage} />
      <Pagination shape="num" currentPage={page} totalPages={10} onChange={setPage} />
    </div>
  );
};

export default Test;
