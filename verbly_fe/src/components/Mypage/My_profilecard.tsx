import type { User } from '../../types/user'; 
import OutlinedButton from '../../components/Button/OutlinedButton'; // 경로 수정 확인
import basicProfile from '../../components/Profile/img/basicProfile.svg';

// [수정] 외부에서 사용할 수 있도록 export 추가
export const mockUser = {
  id: '1',
  name: 'Alice',
  role: 'KOREAN' as const,
  profileImg: '',
  introduction: '',
  level: 3,
  stats: {
    follow: 24,
    streak: 42,
    point: 150
  },
  progress: 50,
  badges: ['출석왕200', '출석왕200', '출석왕200', '출석왕200', '출석왕200', '출석왕200', '출석왕200', '출석왕4']
};

// [수정] 외부 export 추가
export const mockExpertRequests = [
  { id: 1, name: 'Sarah Jenkins', location: 'New york, USA', profileImg: '' },
  { id: 2, name: 'Sarah Jenkins', location: 'New york, USA', profileImg: '' },
  { id: 3, name: 'Sarah Jenkins', location: 'New york, USA', profileImg: '' }
];

// [수정] 외부 export 추가
export const mockCorrectionHistory = [
  { id: 1, title: 'Travel Diary - Day 1', date: 'Yesterday', status: 'Completed' },
  { id: 2, title: 'Travel Diary - Day 1', date: 'Yesterday', status: 'Completed' },
  { id: 3, title: 'Travel Diary - Day 1', date: 'Yesterday', status: 'Completed' }
];

interface UserStats {
  follow: number;
  streak: number;
  point: number;
}
interface ProfileUser extends Omit<User, 'badges' | 'level'> {
  level: number;
  stats: UserStats;
  progress: number;
  badges: string[];
}

// [수정] export 추가
export const ProfileCard = ({ user }: { user: ProfileUser }) => (
  <div className="bg-white rounded-xl border border-line1 p-8 h-auto max-h-[547px] w-full max-w-[615px]">
    <div className="flex justify-end mb-6">
      <OutlinedButton 
        variant='assistive'
        size="small"
        label='프로필 수정'
        className="text-violet-50 text-sm font-semibold hover:text-violet-40 transition-colors"
      />
    </div>
    
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <div className="w-[180px] h-[180px] rounded-full bg-gray-300 relative overflow-hidden">
           {/* absolute 위치 조정 제거하여 중앙 정렬 단순화 */}
          {user.profileImg ? (
            <img 
              src={user.profileImg} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img src={basicProfile} alt="default" className="w-1/2 opacity-50" />
            </div>
          )}
        </div>
      </div>
    </div>
      
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-10 mb-2">{user.name}</h2>
    </div>
    
    <div className="flex items-center justify-center gap-6 mb-8">
      <span className="text-gray-9 font-medium">{user.stats.follow} Follow</span>
      <span className="text-gray-9 font-medium">{user.stats.streak} Streak</span>
      <span className="text-gray-9 font-medium">{user.stats.point} Point</span>
    </div>

    <div className="w-full mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-6 font-semibold">Level</span>
        <span className="text-gray-9 font-semibold">Lv.{user.level} ({user.progress}%)</span>
      </div>
    </div>
    
    <div className="w-full bg-gray-2 h-4 rounded-full mb-6">
      <div 
        className="h-full bg-gradient-to-r from-violet-50 to-blue-60 rounded-full transition-all"
        style={{ width: `${user.progress}%` }}
      ></div>
    </div>
  </div>
);