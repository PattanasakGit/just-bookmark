import { BookmarkType } from "@/interface/bookmarksType";
import { FolderType } from "@/interface/foldersType";
import { create } from "zustand";

interface BookmarkStore {
  bookmarks: BookmarkType[];
  folders: FolderType[];
  setBookmarks: (bookmark: Omit<BookmarkType, "id">) => void;
  setFolders: (folder: Omit<FolderType, "id">) => void;
  deleteBookmark: (id: number) => void;
}

const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  folders: [],
  setBookmarks: (bookmark: Omit<BookmarkType, "id">) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, { ...bookmark, id: Date.now() }],
    })),
  setFolders: (folder: Omit<FolderType, "id">) =>
    set((state) => ({
      folders: [...state.folders, { ...folder, id: Date.now() }],
    })),
  deleteBookmark: (id: number) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    })),
}));

export default useBookmarkStore;