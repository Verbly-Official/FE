import { useState } from "react";
import { Badge } from "../Badge/ContentBadge";
import { UserProfile } from "../Profile/Profile";
import { CommentItem } from "../Comment/CommentItem";
import { TextField } from "../TextArea/TextField";
import { IconButton } from "../Button";
import type { User } from "../../types/user";

type HomeCardProps = {
  isCorrected: boolean;
};

const MOCK_USER: User = {
  id: "1",
  name: "김철수",
  role: "KOREAN",
  profileImg: "https://via.placeholder.com/150",
  introduction: "안녕하세요! 프론트엔드 개발자입니다.",
  lastActive: "방금 전",
  level: 12,
  badges: "Expert", // Badge 컴포넌트 타입에 맞춰 수정 필요
};

export default function Home_Card({ isCorrected = true }: HomeCardProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  return (
    <div className="flex flex-col bg-white w-full my-auto p-[24px] border-[1px] border-line1 rounded-[20px] gap-[12px]">
      <div className="flex flex-row items-center justify-between">
        {/* Profile */}
        <UserProfile data={MOCK_USER} size="medium" />
        {!isCorrected && <Badge content="Request Correction" size="medium" />}
      </div>
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
        <div
          onClick={() => setIsCommentOpen((prev) => !prev)}
          className="flex flex-row gap-[4px]"
        >
          <img src="../../src/assets/emoji/message1.svg" />
          <div>12</div>
        </div>
      </div>

      {isCommentOpen && (
        <>
          <div className="w-full h-auto px-[12px] py-[24px] rounded-[8px] flex flex-col gap-[12px] bg-bg0">
            <div className="flex flex-row text-blue-60 text-[16px] gap-[4px] font-medium">
              <img
                src="../../src/assets/emoji/message1.svg"
                className="w-[20px] h-[20px]"
              />
              <div>COMMENTS</div>
              <div>(12)</div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <CommentItem
                author="Mark"
                time="30min"
                content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                avatarUrl=""
              />
              <CommentItem
                author="Mark"
                time="30min"
                content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                avatarUrl=""
              />
              <CommentItem
                author="Mark"
                time="30min"
                content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                avatarUrl=""
              />
            </div>
          </div>
          <div className="flex flex-row items-center w-full gap-[12px]">
            <div className="w-[40px] h-[40px] bg-gray-200"></div>
            <div className="flex-1 min-w-[720px]">
              <TextField shape="round" showBtn={false} />
            </div>
            <div>
              <IconButton
                ariaLabel="전송"
                size="medium"
                iconSrc={"../../src/assets/emoji/send-filled.svg"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
