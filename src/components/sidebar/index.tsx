"use client";
import { useState, useRef, useEffect } from "react";
import { Add, ArchiveAdd, FolderAdd, FolderOpen, More } from "iconsax-react";
import { Theme } from "@/store/data/mockTheme";

const Sidebar = ({
  handleAddFolder,
  selectedFolderId,
  setSelectedFolderId,
  renderFolders,
  handleAddBookmark,
}: {
  handleAddFolder: (parentId?: number | null) => void;
  selectedFolderId: number | null;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  renderFolders: (parentId?: number | null, depth?: number) => JSX.Element[];
  handleAddBookmark: () => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // Add event listener to detect clicks outside of the menu
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-64 p-4 overflow-y-auto"
      style={{ backgroundColor: Theme.colors.sidebar_bg }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bookmarks</h2>
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-gray-600 rotate-90"
          >
           <More size="16" color="#ffffff50"/>
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 shadow-lg rounded-md z-10 backdrop-blur-xl border border-[#ffffff50] p-1"
              style={{ backgroundColor: "#00000010" }}
            >
              <button
                className="w-full text-left p-2 hover:bg-[#00000050] rounded-md flex justify-start items-center gap-3"
                onClick={() => {
                  handleAddFolder(null);
                  setIsMenuOpen(false);
                }}
              >
                <FolderAdd size="20" color="#ffffff" variant="Bulk"/>
                <span>New Folder</span>
              </button>
              <button
                className="w-full text-left p-2 hover:bg-[#00000050] rounded-md flex justify-start items-center gap-3"
                onClick={handleAddBookmark}
              >
                <ArchiveAdd size="20" color="#ffffff" variant="Bulk" />
                <span>New Bookmark</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex items-center mb-2 gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer ${
          selectedFolderId === null ? "bg-gray-700" : ""
        }`}
        onClick={() => setSelectedFolderId(null)}
      >
        <FolderOpen size="20" color="#FF8A65" variant="Bulk" />
        <span>All Bookmarks</span>
      </div>

      <div>{renderFolders()}</div>
    </div>
  );
};

export default Sidebar;
