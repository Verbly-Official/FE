import { useState } from "react";
import { UserProfile } from "../components/Profile/Profile";
import { Badge } from "../components/Badge/ContentBadge";
import basicProfile from "../components/Profile/img/basicProfile.svg";
import { type User } from "../types/user";
import SolidButton from "../components/Button/SolidButton";
import OutlinedButton from "../components/Button/OutlinedButton";
import FollowButton from "../components/Button/FollowButton";

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
  const [page, setPage] = useState(1);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      {/* 2. Buttons (New) */}
      <section>
        <h2 className="text-xl font-bold mb-4 border-l-4 border-gray-800 pl-3">
          Buttons
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
          
          {/* Solid Buttons */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Solid Button</h3>
            <div className="flex flex-wrap gap-3">
              <SolidButton label="Primary" variant="primary" />
              <SolidButton label="Secondary" variant="secondary" />
              <SolidButton label="Assistive" variant="assistive" />
              <SolidButton label="Destructive" variant="destructive" />
              <SolidButton label="Disabled" disabled />
            </div>
          </div>

          {/* Outlined Buttons */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Outlined Button</h3>
            <div className="flex flex-wrap gap-3">
              <OutlinedButton label="Primary" variant="primary" />
              <OutlinedButton label="Secondary" variant="secondary" />
              <OutlinedButton label="Assistive" variant="assistive" />
              <OutlinedButton label="Destructive" variant="destructive" />
              <OutlinedButton label="Disabled" disabled />
            </div>
          </div>
              <FollowButton />
              <FollowButton size="large" />
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* 3. UserProfile */}
      <section>
        <h2 className="text-xl font-bold mb-6 border-l-4 border-gray-800 pl-3">
          User Profile
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 w-20">Small</span>
            <UserProfile data={DUMMY_USER} size="small" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 w-20">Medium</span>
            <UserProfile data={DUMMY_USER} size="medium" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 w-20">Large</span>
            <UserProfile data={DUMMY_USER} size="large" />
          </div>
        </div>
      </section>

      {/* 4. Badge Variations */}
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
