import { FolderType } from "@/interface/foldersType";
import * as Icons from "iconsax-react";

// Folder Form Component
const FolderForm = ({
  newFolder,
  handleFolderInputChange,
  handleFolderSubmit,
  renderFolderOptions,
  parentIdForNewSubfolder,
}: {
  newFolder: Omit<FolderType, "id">;
  handleFolderInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleFolderSubmit: (e: React.FormEvent) => void;
  renderFolderOptions: (
    parentId?: number | null,
    depth?: number
  ) => JSX.Element[];
  parentIdForNewSubfolder?: number | null | undefined;
}) => {
  return (
    <form onSubmit={handleFolderSubmit}>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={newFolder.name}
          onChange={handleFolderInputChange}
          required
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Icon</label>
        <select
          name="icon"
          value={newFolder.icon}
          onChange={handleFolderInputChange}
          className="w-full p-2 bg-gray-700 rounded"
        >
          {Object.keys(Icons).map((iconKey) => (
            <option key={iconKey} value={iconKey}>
              {iconKey}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Parent Folder</label>
        <select
          disabled={parentIdForNewSubfolder ? true : false}
          name="parentId"
          value={(parentIdForNewSubfolder ?? newFolder.parentId) || ""}
          onChange={handleFolderInputChange}
          className="w-full p-2 bg-gray-700 rounded"
        >
          <option value="">None</option>
          {renderFolderOptions()}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 p-2 rounded transition duration-300"
      >
        Add Folder
      </button>
    </form>
  );
};

export default FolderForm;
