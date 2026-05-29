/**
 * GitHub 用户套餐计划信息
 */
interface GitHubUserPlan {
  name: string;
  space: number;
  collaborators: number;
  private_repos: number;
}

/**
 * GitHub 用户详细信息
 */
interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string; // 例如: "User", "Organization"
  user_view_type: string;
  site_admin: boolean;
  
  // 以下字段可能为 null
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  notification_email: string | null;
  
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string; // ISO 8601 日期字符串
  updated_at: string; // ISO 8601 日期字符串
  
  // 以下字段通常只在获取当前认证用户信息(Authenticated User)时出现
  // 如果用于获取公开用户信息, 建议将这些字段设为可选 (?)
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: GitHubUserPlan;
}