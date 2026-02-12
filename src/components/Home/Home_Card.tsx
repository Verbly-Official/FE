import { useEffect, useState } from "react";
import { Badge } from "../Badge/ContentBadge";
import { UserProfile } from "../Profile/Profile";
import { CommentItem } from "../Comment/CommentItem";
import { TextField } from "../TextArea/TextField";
import { IconButton } from "../Button";
import HeartIcon from "../../assets/emoji/heart-false.svg";
import CommentIcon from "../../assets/emoji/message1.svg";
import SendIcon from "../../assets/emoji/send-filled.svg";

import type { PostItem } from "../../types/post";
import type { CommentItemType } from "../../types/comment";
import { createComment, getComments } from "../../apis/comment";
import { useNavigate } from "react-router-dom";

type HomeCardProps = {
  varient: "default" | "mini";
  isCorrected: boolean;
  post: PostItem;
};

export default function Home_Card({
  varient = "default",
  isCorrected = true,
  post,
}: HomeCardProps) {
  const navigate = useNavigate();

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<CommentItemType[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentPage, setCommentPage] = useState(0);
  const [commentLast, setCommentLast] = useState(false);

  useEffect(() => {
    if (isCommentOpen) {
      fetchComments(0);
    }
  }, [isCommentOpen]);

  const fetchComments = async (pageNumber: number) => {
    try {
      const data = await getComments(post.postId, pageNumber);

      setComments((prev) =>
        pageNumber === 0 ? data.content : [...prev, ...data.content],
      );

      setCommentLast(data.last);
      setCommentPage(data.number);

      console.log("posts data:", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handelCreateComment = async () => {
    if (!commentInput.trim()) return;
    try {
      const newComment = await createComment(post.postId, {
        content: commentInput,
      });

      setComments((prev) => [newComment, ...prev]);
      setCommentInput("");
    } catch (err) {
      console.error(err);
    }
  };

  switch (varient) {
    case "default":
      return (
        <div className="flex flex-col bg-white w-full my-auto p-[24px] border-[1px] border-line1 rounded-[20px] gap-[12px]">
          <div className="flex flex-row items-center justify-between">
            {/* Profile */}
            <UserProfile
              size="medium"
              data={{
                id: post.uuid,
                name: post.nickname,
                profileImg: post.userImageUrl,
                bio: "",
              }}
            />
            {!isCorrected && (
              <Badge content="Request Correction" size="medium" />
            )}
          </div>
          {/* Content */}
          <div>{post.content}</div>
          {/* Tags */}
          <div className="flex flex-row gap-[10px] text-blue-60">
            {post.tags.map((tag) => (
              <div key={tag}>#{tag}</div>
            ))}
          </div>
          {/* Like&Comment */}
          <div className="border-t-[1px] border-line2 py-[12px] gap-[12px] flex flex-row text-blue-60">
            <div className="flex flex-row gap-[4px]">
              <img src={HeartIcon} />
              <div className="text-[length:var(--fs-subtitle2)]">
                {post.likesCount}
              </div>
            </div>
            <div
              onClick={() => setIsCommentOpen((prev) => !prev)}
              className="flex flex-row gap-[4px]"
            >
              <img src={CommentIcon} />
              <div className="text-[length:var(--fs-subtitle2)]">
                {post.commentsCount}
              </div>
            </div>
          </div>

          {isCommentOpen && (
            <>
              <div className="w-full h-auto px-[12px] py-[24px] rounded-[8px] flex flex-col gap-[12px] bg-bg0">
                <div className="flex flex-row text-blue-60 text-[16px] gap-[4px] font-medium">
                  <img src={CommentIcon} className="w-[20px] h-[20px]" />
                  <div>COMMENTS</div>
                  <div>({post.commentsCount})</div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment.uuid + comment.createdAt}
                      author={comment.nickname}
                      time={comment.createdAt}
                      content={comment.content}
                      avatarUrl={comment.userImageUrl}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row items-center w-full gap-[12px]">
                <img
                  src={post.userImageUrl}
                  className="w-[40px] h-[40px] rounded-[40px]"
                />
                <div className="flex-1 min-w-[720px]">
                  <TextField
                    shape="round"
                    showBtn={false}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                </div>
                <div>
                  <IconButton
                    ariaLabel="전송"
                    size="medium"
                    iconSrc={SendIcon}
                    onClick={handelCreateComment}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      );
    case "mini":
      return (
        <div className="flex flex-col bg-white w-[340px] h-auto my-auto p-[24px] border-[1px] border-line1 rounded-[20px] gap-[12px]">
          <div className="flex flex-row items-center justify-between">
            {/* Profile */}
            <UserProfile
              size="medium"
              data={{
                id: post.uuid,
                name: post.nickname,
                profileImg: post.userImageUrl,
                bio: "",
              }}
            />
            {!isCorrected && (
              <Badge content="Request Correction" size="medium" />
            )}
          </div>
          {/* Content */}
          <div>{post.content}</div>
          {/* Tags */}
          <div className="flex flex-row gap-[10px] text-blue-60">
            {post.tags.map((tag) => (
              <div key={tag}>#{tag}</div>
            ))}
          </div>
          {/* Like&Comment */}
          <div className="border-t-[1px] border-line2 py-[12px] gap-[12px] flex flex-row text-blue-60">
            <div className="flex flex-row gap-[4px]">
              <img src={HeartIcon} />
              <div>{post.likesCount}</div>
            </div>
            <div
              onClick={() => setIsCommentOpen((prev) => !prev)}
              className="flex flex-row gap-[4px]"
            >
              <img src={CommentIcon} />
              <div>{post.commentsCount}</div>
            </div>
          </div>

          {isCommentOpen && (
            <>
              <div className="w-full h-auto px-[12px] py-[24px] rounded-[8px] flex flex-col gap-[12px] bg-bg0">
                <div className="flex flex-row text-blue-60 text-[length:var(--fs-subtitle2)] gap-[4px] font-medium">
                  <img
                    src="../../src/assets/emoji/message1.svg"
                    className="w-[20px] h-[20px]"
                  />
                  <div>COMMENTS</div>
                  <div>({post.commentsCount})</div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment.uuid + comment.createdAt}
                      author={comment.nickname}
                      time={comment.createdAt}
                      content={comment.content}
                      avatarUrl={comment.userImageUrl}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row items-center w-full gap-[12px]">
                <img src={post.userImageUrl} className="w-[40px] h-[40px]" />
                <div className="flex-1 min-w-[720px]">
                  <TextField
                    shape="round"
                    showBtn={false}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                </div>
                <div>
                  <IconButton
                    ariaLabel="전송"
                    size="medium"
                    iconSrc={SendIcon}
                    onClick={handelCreateComment}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      );
  }
}
