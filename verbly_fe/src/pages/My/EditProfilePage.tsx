import React, { useState, useRef } from 'react';
import { Header } from '../../components/Header/Header';
import SideMenu from '../../components/Nav/SideMenu';
import SolidButton from '../../components/Button/SolidButton';
import OutlinedButton from '../../components/Button/OutlinedButton';
import {TextField} from '../../components/TextArea/TextField';
import TextArea from '../../components/TextArea/TextArea';
import type { User } from '../../types/user';

// [테스트용 데이터] User 타입 에러를 방지하기 위해 필수 속성을 모두 포함했습니다.
const INITIAL_USER: User = {
  id: "user1",
  name: "Test User",
  profileImg: "https://via.placeholder.com/150",
  introduction: "Hello, I am using this app.",
  // 이전에 발생한 타입 에러 해결을 위한 속성 추가
  progress: 50,    
  stats: {}, // 만약 타입 정의가 'statsts'라면 'statsts: {}'로 수정해주세요.
};

const EditProfilePage = () => {
  // 1. 상태 관리
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [previewImg, setPreviewImg] = useState<string>(user.profileImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. 입력 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUser({ ...user, introduction: e.target.value });
  };

  // 3. 이미지 업로드 시뮬레이션 (미리보기)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImg(objectUrl);
      // 실제 구현 시: 여기서 파일을 서버로 전송하거나 FormData에 담습니다.
    }
  };

  // 4. 저장 및 취소 핸들러
  const handleSave = () => {
    // API 호출 로직이 들어갈 자리
    alert("프로필이 저장되었습니다. (테스트)");
    console.log("저장된 데이터:", { ...user, profileImg: previewImg });
  };

  const handleCancel = () => {
    if (window.confirm("수정을 취소하고 돌아가시겠습니까?")) {
      // 뒤로가기 로직 (예: navigate(-1))
      console.log("취소됨");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. 헤더 */}
      <div className="w-full max-w-[1920px] mx-auto">
        <Header />
      </div>

      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 2. 사이드 메뉴 */}
        <SideMenu variant="default" />

        {/* 3. 메인 컨텐츠 */}
        <main className="flex-1 p-[32px] overflow-x-hidden">
          <div className="max-w-[800px] mx-auto flex flex-col gap-8">
            
            {/* 페이지 타이틀 */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">프로필 수정</h1>
              <p className="text-gray-500 mt-1">나의 정보를 수정하고 관리할 수 있습니다.</p>
            </div>

            {/* 수정 폼 영역 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-8">
              
              {/* (1) 프로필 이미지 변경 */}
              <div className="flex items-center gap-6">
                <div className="relative w-[100px] h-[100px]">
                  <img
                    src={previewImg}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  {/* 숨겨진 input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-900">프로필 사진</h3>
                  <div className="flex gap-2">
                    <OutlinedButton 
                      label="이미지 변경" 
                      onClick={() => fileInputRef.current?.click()} 
                      size="small"
                      variant="secondary"
                    />
                    <button 
                      onClick={() => setPreviewImg("https://via.placeholder.com/150")}
                      className="text-sm text-gray-400 underline hover:text-red-500 transition-colors ml-1"
                    >
                      기본 이미지로 변경
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-100" />

              {/* (2) 텍스트 정보 입력 */}
              <div className="flex flex-col gap-6">
                {/* 이름 */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">이름 (닉네임)</label>
                  <TextField 
                    placeholder="이름을 입력해주세요"
                    value={user.name}
                    onChange={handleNameChange}
                  />
                </div>

                {/* 자기소개 */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">자기소개</label>
                  <TextArea
                    placeholder="자신을 자유롭게 소개해주세요."
                    value={user.introduction}
                    onChange={handleIntroChange}
                    className="h-[120px]"
                  />
                  <div className="text-right">
                    <span className="text-xs text-gray-400">
                      {user.introduction.length} / 200자
                    </span>
                  </div>
                </div>
              </div>

              {/* (3) 버튼 영역 */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <OutlinedButton 
                  label="취소" 
                  onClick={handleCancel}
                  size="medium"
                  variant="secondary"
                />
                <SolidButton 
                  label="저장하기" 
                  onClick={handleSave}
                  size="medium"
                  variant="primary"
                />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfilePage;