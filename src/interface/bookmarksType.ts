export interface BookmarkType {
  id: number;
  title: string;
  url: string;
  imageCover: string | null;
  folderId: number | null;
  tags?: string[];
}
