import { UserProfile } from "../Profile/Profile";

type HomeCardProps = {
  isCorrected: boolean;
};

const MOCK_USER = {
  id: 1,
  name: "김철수",
  profileUrl: "https://via.placeholder.com/150",
  introduction: "안녕하세요! 프론트엔드 개발자입니다.",
  lastActive: "방금 전",
  level: 12,
  badges: "Expert", // Badge 컴포넌트 타입에 맞춰 수정 필요
};

export default function Home_Card() {
  return (
    <div className="flex flex-col bg-white w-[1072px] my-auto p-[24px] border-[1px] border-line1 rounded-[20px] gap-[12px]">
      {/* Profile */}
      <UserProfile data={MOCK_USER} size="medium" />
      {/* Content */}
      <div>
        I worked all day and when I came home, I didn’t want to do anything. Is
        this sentence natural? I worked all day and when I came home, I didn’t
        want to do anything. Is this sentence natural?
      </div>
      {/* Tags */}
      <div className="flex flex-row gap-[10px] text-blue-60">
        <div>#Grammer</div>
        <div>Daily</div>
        <div>#English</div>
      </div>
      {/* Like&Comment */}
      <div className="border-t-[1px] border-line2 py-[12px] gap-[12px] flex flex-row text-blue-60">
        <div className="flex flex-row gap-[4px]">
          <img src="../../src/assets/emoji/heart-false.svg" />
          <div>12</div>
        </div>
        <div className="flex flex-row gap-[4px]">
          <img src="../../src/assets/emoji/message1.svg" />
          <div>12</div>
        </div>
      </div>
    </div>
  );
}
