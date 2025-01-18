import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ForumPost as ForumPostType } from "../types/forum";
import ForumPost from "./ForumPost";
import CreatePostDialog from "./CreatePostDialog";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "forum_posts";

const CommunityForum = () => {
  const [posts, setPosts] = useState<ForumPostType[]>([]);
  const { toast } = useToast();

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
      author: "Current User", // In a real app, this would come from auth
      createdAt: new Date().toISOString(),
      comments: [],
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
              author: "Current User", // In a real app, this would come from auth
              createdAt: new Date().toISOString(),
            },
          ],
        };
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