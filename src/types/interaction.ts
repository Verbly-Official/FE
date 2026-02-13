export type InteractionType = "checkbox" | "star" | "bookmark" | "heart";

export interface InteractionIconProps {
  /** 아이콘 종류 */
  type: InteractionType;
  /** 선택 여부 */
  selected: boolean;
  /** 토글 이벤트 핸들러 */
  onToggle?: (next: boolean) => void;
  /** 추가 스타일 클래스 */
  className?: string;
  /* 아이콘 */
  IconTrue: React.FC<React.SVGProps<SVGSVGElement>>;
  IconFalse: React.FC<React.SVGProps<SVGSVGElement>>;
}
