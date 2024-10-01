import { BookmarkType } from "@/interface/bookmarksType";
import { AddSquare } from "iconsax-react";
import BookmarkCard from "@/components/bookmarkCard";
import { useEffect } from "react";

// Main Content Component
const MainContent = ({
    filteredBookmarks,
    handleAddBookmark,
    viewMode,
    cardSize,
  }: {
    filteredBookmarks: BookmarkType[];
    handleAddBookmark: () => void;
    viewMode: "grid" | "list",
    cardSize: number
  }) => {
    
    useEffect(() => {
      console.log("cardSize ==> ", cardSize); 
    }, [cardSize]);

    return (
      <div className="flex-1 p-8 overflow-y-auto">
        <div className={`grid ${viewMode === "grid" ? "grid-cols-3 gap-4" : "grid-cols-1 gap-2"}`}>
          {filteredBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} cardSize={cardSize} />
          ))}
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 p-2 rounded transition duration-300"
          onClick={handleAddBookmark}
        >
          <AddSquare size="20" color="#fff" />
        </button>
      </div>
    );
  };
  
export default MainContent;
