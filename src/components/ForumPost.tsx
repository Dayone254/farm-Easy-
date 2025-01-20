import { useState } from "react";
import { ForumPost as ForumPostType, Comment } from "../types/forum";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { MessageSquare, User, ChevronDown, ChevronUp, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ForumPostProps {
  post: ForumPostType;
  onAddComment: (postId: string, content: string) => void;
  onToggleLike: (postId: string) => void;
  onToggleCommentLike: (postId: string, commentId: string) => void;
}

const ForumPost = ({ post, onAddComment, onToggleLike, onToggleCommentLike }: ForumPostProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const { userProfile } = useUser();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please write a comment",
        variant: "destructive",
      });
      return;
    }
    onAddComment(post.id, comment);
    setComment("");
    toast({
      title: "Success",
      description: "Comment added successfully",
    });
  };

  const isPostLiked = userProfile?.id ? post.likes.includes(userProfile.id) : false;

  return (
    <div className="p-4 bg-white bg-opacity-50 rounded-md space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium text-lg">{post.title}</h4>
        <p className="text-gray-600">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onToggleLike(post.id)}
          >
            <Heart
              className={`w-4 h-4 ${isPostLiked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span>{post.likes.length}</span>
          </Button>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-gray-600">
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments.length} comments</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          {post.comments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="pl-4 border-l-2 border-gray-200 space-y-1"
            >
              <p className="text-gray-700">{comment.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-3 h-3" />
                  <span>{comment.author}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onToggleCommentLike(post.id, comment.id)}
                >
                  <Heart
                    className={`w-3 h-3 ${
                      userProfile?.id && comment.likes.includes(userProfile.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />
                  <span className="text-xs">{comment.likes.length}</span>
                </Button>
              </div>
            </div>
          ))}

          <form onSubmit={handleAddComment} className="space-y-2">
            <Textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
            />
            <Button type="submit" size="sm">
              Add Comment
            </Button>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ForumPost;