export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  likes: string[]; // Array of user IDs who liked the comment
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
  likes: string[]; // Array of user IDs who liked the post
}