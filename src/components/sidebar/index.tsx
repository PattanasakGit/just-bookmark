import { FolderOpen } from "iconsax-react";
import {Theme} from "@/store/data/mockTheme";

const Sidebar = ({
  handleAddFolder,
  selectedFolderId,
  setSelectedFolderId,
  renderFolders,
}: {
  handleAddFolder: () => void;
  selectedFolderId: number | null;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  renderFolders: (parentId?: number | null, depth?: number) => JSX.Element[];
}) => {
  return (
    <div className="w-64 p-4 overflow-y-auto" style={{ backgroundColor: Theme.colors.sidebar_bg}}>
      <h2 className="text-xl font-bold mb-4">Bookmarks</h2>
      <div className="mb-4">
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded transition duration-300"
          onClick={handleAddFolder}
        >
          Add Folder
        </button>
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