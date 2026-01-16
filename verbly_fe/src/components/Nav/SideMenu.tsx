/*
 1/14 이후 아이콘과 폰트 정리 끝나는 대로 수정 필요
 (수정 후 해당 주석 삭제)
*/
export default function SideMenu({ variant = "default" }) {
  switch (variant) {
    case "default":
      return (
        <div className="w-[300px] min-h-screen px-[40px] py-[50px] flex flex-col gap-[28px]">
          <div className="w-[221px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/home.svg" />
            <div>Home</div>
          </div>
          <div className="w-[221px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/folder.svg" />
            <div>Library</div>
          </div>
          <div className="w-[221px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/edit.svg" />
            <div>Correction</div>
          </div>
          <div className="w-[221px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/message1.svg" />
            <div>Inbox</div>
          </div>
          <div className="w-[221px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/person.svg" />
            <div>Profile</div>
          </div>
          <div className="w-[221px] h-[60px] px-[32px] py-[20px] rounded-[8px] flex items-center justify-center gap-[8px] bg-gradient-to-r from-[#713DE3] to-[#4F46DD]">
            <img src="../../src/assets/emoji/feather-white.svg" />
            <div className="text-white text-[24px] w-[125px] h-[24px] leading-none">
              Write Post!
            </div>
          </div>
        </div>
      );
    case "small":
      return (
        <div className="w-[96px] min-h-screen px-[20px] py-[50px] flex flex-col gap-[28px]">
          <div className="w-[56px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/home.svg" />
          </div>
          <div className="w-[56px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/folder.svg" />
          </div>
          <div className="w-[56px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/edit.svg" />
          </div>
          <div className="w-[56px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/message1.svg" />
          </div>
          <div className="w-[56px] h-[56px] px-[16px] py-[16px] flex flex-row gap-[20px]">
            <img src="../../src/assets/emoji/person.svg" />
          </div>
        </div>
      );
  }
}
