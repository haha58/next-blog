export const columnKey = {
  getKey: (id: string) => `column:${id}`,
  getPrefix: () => 'column:',
}

export const columnByUserKey = {
  getKey: (user_id: string, col_id: string) => `col_by_user:${user_id}:${col_id}`,
  getPrefix: (user_id: string) => `col_by_user:${user_id}:`,
}

export const columnStatsKey = {
  getKey: (id: string) => `col_stats:${id}`,
  getPrefix: () => 'col_stats:',
}

export const articleKey = {
  getKey: (id: string) => `article:${id}`,
  getPrefix: 'article:'
}

export const articleByColumnKey = {
  getKey: (column_id: string, id: string) => `article_by_column:${column_id}:${id}`,
  getPrefix: (column_id: string) => `article_by_column:${column_id}:`,
}

export const articleByUserKey = {
  getKey: (user_id: string, id: string) => `article_by_user:${user_id}:${id}`,
  getPrefix: (user_id: string) => `article_by_user:${user_id}:`,
}

export const articleStatsKey = {
  getKey: (id: string) => `article_stats:${id}`,
  getPrefix: () => 'article_stats:',
}

export const articleLikeKey = {
  getKey: (user_id: string, article_id: string) => `article_like:${user_id}:${article_id}`,
  getPrefix: (user_id: string) => `article_like:${user_id}:`,
}


// 评论相关 
/**
 * @param pre_id 文章或者父评论 ID
 * @param id 当前评论 ID
 */
export const commentKey = {
  getKey: (pre_id: string, id: string) => `comment:${pre_id}:${id}`,
  getPrefix: (pre_id: string) => `comment:${pre_id}:`,
}

export const commentCountKey = {
  getKey: (id: string) => `comment_count:${id}`,
  getPrefix: () => 'comment_count:',
}

// 当前用户是否点赞了当前评论 用于前端显示
export const commentLikeKey = {
  getKey: (user_id: string, comment_id: string) => `comment_like:${user_id}:${comment_id}`,
  getPrefix: (user_id: string) => `comment_like:${user_id}:`,
}