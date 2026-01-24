import React from "react";
import { ChatList } from "../../../components/Chat";
import type { ChatMessage } from "../../../types/chat";

const messages: ChatMessage[] = [
  { id: "1", from: "other", text: "Hey! Did you finish the correction?", time: "10:32", avatarUrl: "/avatars/user1.png" },
  { id: "2", from: "other", text: "I left some feedback on sentence 3.", time: "10:32", avatarUrl: "/avatars/user1.png" },
  { id: "3", from: "me", text: "Yes! I just checked it.", time: "10:34" },
  { id: "4", from: "me", text: "Thanks a lot 🙌", time: "10:34" },
  { id: "5", from: "other", text: "No problem 😊", time: "10:36", avatarUrl: "/avatars/user1.png" },
];

export const ChatSection = () => {
  return (
    <div className="w-full h-full">
      <ChatList messages={messages} className="h-full overflow-y-auto" />
    </div>
  );
};
