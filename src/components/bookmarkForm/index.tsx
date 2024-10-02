import { BookmarkType } from "@/interface/bookmarksType";

// Bookmark Form Component
const BookmarkForm = ({
    newBookmark,
    handleBookmarkInputChange,
    handleBookmarkSubmit,
    renderFolderOptions,
  }: {
    newBookmark: Omit<BookmarkType, "id">;
    handleBookmarkInputChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    handleBookmarkSubmit: (e: React.FormEvent) => void;
    renderFolderOptions: (parentId?: number | null, depth?: number) => JSX.Element[];
  }) => {
    return (
      <form onSubmit={handleBookmarkSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={newBookmark.title}
            onChange={handleBookmarkInputChange}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">URL</label>
          <input
            type="url"
            name="url"
            value={newBookmark.url}
            onChange={handleBookmarkInputChange}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Folder</label>
          <select
            name="folderId"
            value={newBookmark.folderId || ""}
            onChange={handleBookmarkInputChange}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value="">None</option>
            {renderFolderOptions()}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tags</label>
          <input
            type="tags"
            name="tags"
            value={newBookmark.tags || ""}
            onChange={handleBookmarkInputChange}
            required
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded transition duration-300"
        >
          Add Bookmark
        </button>
      </form>
    );
  };

  export default BookmarkForm;