import { BookmarkType } from "@/interface/bookmarksType";
import BookmarkCard from "../bookmarkCard";
import {
  AddSquare,
  ArchiveAdd,
  Grid2,
  MaskRight,
  RowVertical,
  SearchNormal1,
  Setting4,
} from "iconsax-react";
import CustomSlider from "../slider";
import Modal from "../modal";
import { useState } from "react";

const MainContent = ({
  filteredBookmarks,
  handleAddBookmark,
}: {
  filteredBookmarks: BookmarkType[];
  handleAddBookmark: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cardSize, setCardSize] = useState(190);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const handleOpenSetting = () => setIsSettingModalOpen(true);

  const searchedBookmarks = filteredBookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gridStyle =
    viewMode === "grid"
      ? {
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))`,
          gap: "16px",
          margin: "0px auto",
        }
      : {
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "100%",
          gap: "8px",
        };

  return (
    <div className="w-full h-screen">
      <header className="bg-[#00000020] backdrop-blur-sm py-2 px-4 flex justify-between items-center">
        <button
          className="p-1.5 rounded-2xl transition duration-300 flex justify-center items-center hover:scale-110 h-full"
          onClick={handleAddBookmark}
        >
          <ArchiveAdd size="32" color="#8EACCD" variant="Bulk" />
        </button>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchNormal1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            {viewMode === "grid" ? <Grid2 /> : <RowVertical />}
          </button>
          <div className="flex items-center space-x-2">
            <Setting4 onClick={handleOpenSetting} />
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 overflow-y-auto " style={{ height: "calc(100vh - 64px)" }}>
        <div style={gridStyle}>
          {searchedBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              cardSize={cardSize}
              viewMode={viewMode}
            />
          ))}
        </div>
        {isSettingModalOpen && (
          <Modal
            title="Siting Page"
            onClose={() => setIsSettingModalOpen(false)}
          >
            <div className="flex items-center border-t-2 p-4">
              <span className="mr-16">Card Size</span>
              <CustomSlider
                min={100}
                max={300}
                value={cardSize}
                onChange={setCardSize}
                step={10}
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MainContent;
