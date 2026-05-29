interface ArticleMeta {
  column_id: string;
  title: string;
  content: string;
}

interface ArticleStats {
  views: number;
  likes: number;
}

interface Profile {
  user_id: string;
  user_name: string;
  user_avatar: string;
}

interface Article extends ArticleMeta, Profile {
  id: string;
  createdAt: number;
  updatedAt: number;
  isLiked: boolean;
}

interface ArticleFull extends Article, ArticleStats {}

interface CommentMeta {
  pre_id: string;
  content: string;
}

interface CommentX extends CommentMeta, Profile {
  id: string;
  createdAt: number;
  updatedAt: number;
  isLiked: boolean;
}