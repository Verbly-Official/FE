import { ChatList } from "../components/Chat";
import type { ChatMessage } from "../types/chat";

const dummyMessages: ChatMessage[] = [
    {
        id: "1",
        from: "me",
        text: "안녕하세요! 같은 시간 연속 메시지 테스트입니다. (오후 3:00)",
        time: "오후 3:00",
    },
    {
        id: "2",
        from: "me",
        text: "이 메시지는 8px 간격이어야 합니다. (오후 3:00)",
        time: "오후 3:00",
    },
    {
        id: "3",
        from: "me",
        text: "시간이 달라지면 20px 간격이 됩니다. (오후 3:01)",
        time: "오후 3:01",
    },
    {
        id: "4",
        from: "other",
        text: "상대방 메시지 테스트입니다. (오후 3:05)",
        time: "오후 3:05",
    },
    {
        id: "5",
        from: "other",
        text: "같은 시간 연속 메시지 (8px 간격). (오후 3:05)",
        time: "오후 3:05",
    },
    {
        id: "6",
        from: "other",
        text: "시간이 달라지면 다시 20px 간격.아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
        time: "오후 3:06",
    },
];

const ChatTestPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-[898px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

                <ChatList messages={dummyMessages} />
            </div>
        </div>
    );
};

export default ChatTestPage;
