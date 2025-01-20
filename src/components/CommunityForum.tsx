import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ForumPost as ForumPostType } from "../types/forum";
import ForumPost from "./ForumPost";
import CreatePostDialog from "./CreatePostDialog";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

const STORAGE_KEY = "forum_posts";

const CommunityForum = () => {
  const [posts, setPosts] = useState<ForumPostType[]>([]);
  const { toast } = useToast();
  const { userProfile } = useUser();

  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const savePosts = (newPosts: ForumPostType[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const handleCreatePost = (title: string, content: string) => {
    const newPost: ForumPostType = {
      id: Date.now().toString(),
      title,
      content,
      author: userProfile?.name || "Anonymous",
      createdAt: new Date().toISOString(),
      comments: [],
      likes: [],
    };
    savePosts([newPost, ...posts]);
    toast({
      title: "Success",
      description: "Your post has been created successfully!",
    });
  };

  const handleAddComment = (postId: string, content: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              content,
              author: userProfile?.name || "Anonymous",
              createdAt: new Date().toISOString(),
              likes: [],
            },
          ],
        };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const handleToggleLike = (postId: string) => {
    if (!userProfile?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to like posts",
        variant: "destructive",
      });
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const likes = post.likes.includes(userProfile.id)
          ? post.likes.filter((id) => id !== userProfile.id)
          : [...post.likes, userProfile.id];
        return { ...post, likes };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const handleToggleCommentLike = (postId: string, commentId: string) => {
    if (!userProfile?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to like comments",
        variant: "destructive",
      });
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === commentId) {
            const likes = comment.likes.includes(userProfile.id)
              ? comment.likes.filter((id) => id !== userProfile.id)
              : [...comment.likes, userProfile.id];
            return { ...comment, likes };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Community Forum</h3>
        <MessageSquare className="w-8 h-8 text-accent" />
      </div>

      <CreatePostDialog onPostCreated={handleCreatePost} />

      <div className="space-y-4">
        {posts.map((post) => (
          <ForumPost
            key={post.id}
            post={post}
            onAddComment={handleAddComment}
            onToggleLike={handleToggleLike}
            onToggleCommentLike={handleToggleCommentLike}
          />
        ))}
        {posts.length === 0 && (
          <p className="text-center text-gray-500">
            No posts yet. Be the first to share something!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommunityForum;