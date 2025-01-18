export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
}