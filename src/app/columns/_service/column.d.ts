// 创建时从表单中收集的数据
interface ColumnMeta {
  title: string;
  tag: string;
  desc: string;
}
//用于记录专栏的阅读量、点赞量等统计信息
interface ColumnStats {
  views: number;
  likes: number;
}

interface Column extends ColumnMeta {
  id: string;
  createdAt: number;
  updatedAt: number;
  user_id: string;
  user_name: string;
  user_avatar: string;
}

interface ColumnFull extends Column, ColumnStats {}