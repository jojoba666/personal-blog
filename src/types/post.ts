/** 文章 Frontmatter 原始字段 */
export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];

  category?: string;
  updated?: string;
  cover?: string;
  draft?: boolean;
  lang?: string;
  author?: string;
  canonical?: string;
  series?: string;
  toc?: boolean;
  math?: boolean;
}

/** 经过处理的完整文章对象 */
export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;

  content: string;
  readingTime: number;
  wordCount: number;
  year: number;

  prevPost: PostNav | null;
  nextPost: PostNav | null;
}

/** 简化版导航 */
export interface PostNav {
  slug: string;
  title: string;
  date: string;
}

/** 标签统计 */
export interface TagWithCount {
  tag: string;
  count: number;
}

/** 文章列表查询参数 */
export interface PostQuery {
  tag?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}
