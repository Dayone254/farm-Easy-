import { MessageSquare, User } from "lucide-react";

const CommunityForum = () => {
  const discussions = [
    {
      title: "Best practices for wheat irrigation",
      author: "John Doe",
      replies: 12,
      time: "2h ago",
    },
    {
      title: "Organic pest control methods",
      author: "Jane Smith",
      replies: 8,
      time: "4h ago",
    },
    {
      title: "Weather impact on crop yield",
      author: "Mike Johnson",
      replies: 15,
      time: "6h ago",
    },
  ];

  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Community Forum</h3>
        <MessageSquare className="w-8 h-8 text-accent" />
      </div>
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div key={discussion.title} className="p-4 bg-white bg-opacity-50 rounded-md space-y-2">
            <h4 className="font-medium">{discussion.title}</h4>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{discussion.author}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>{discussion.replies} replies</span>
                <span>{discussion.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;