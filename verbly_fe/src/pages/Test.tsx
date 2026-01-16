import { useState } from "react";
import TextArea from "../components/TextArea/TextArea";
import { UserProfile } from "../components/Profile/Profile";
import { Badge } from "../components/Badge/ContentBadge";
import basicProfile from "../components/Profile/img/basicProfile.svg";
import { type User } from "../types/user";

// 테스트용 더미 데이터
const DUMMY_USER: User = {
  id: 1,
  name: "테스트",
  profileUrl: basicProfile,
  introduction: "test",
  lastActive: "10 min",
  level: 10,
  badges: "test", // 프로필 내부에 표시될 뱃지 데이터
  isFollowing: false,
};

const Test = () => {
  const [value, setValue] = useState("");

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      {/* 1. TextArea */}
      <section>
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          TextArea
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <TextArea 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder="여기에 텍스트 입력..." 
          />
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* 2. UserProfile */}
      <section>
        <h2 className="text-xl font-bold mb-6 border-l-4 border-gray-800 pl-3">
          User Profile
        </h2>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Small</h3>
            <UserProfile data={DUMMY_USER} size="small" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Medium</h3>
            <UserProfile data={DUMMY_USER} size="medium" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Large (Badge Integrated)</h3>
            {/* 이제 UserProfile 내부에서 badges 데이터를 받아 small 뱃지를 렌더링합니다 */}
            <UserProfile data={DUMMY_USER} size="large" />
          </div>
        </div>
      </section>

      {/* 3. Badge Variations (참고용) */}
      <section>
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          Badge Variations
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 grid grid-cols-2 gap-6">
            <div>
                <h4 className="text-sm font-bold text-gray-500 mb-3">Small Size (22px)</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge content="Content" size="small" />
                </div>
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-500 mb-3">Medium Size (32px)</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge content="Content" size="medium" />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Test;