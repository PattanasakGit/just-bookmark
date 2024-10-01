import React, { useState } from 'react';
import * as Icons from "iconsax-react";
import { ArrowRight2, ArrowDown2, SearchNormal1, GridView, RowVertical, Setting4 } from "iconsax-react";
import initialBookmarks from "@/store/data/bomarks.json";
import initialFolders from "@/store/data/folders.json";
import Sidebar from "../sidebar";
import MainContent from "../mainContent/indext";
import Modal from "../modal";
import BookmarkForm from "../bookmarkForm";
import FolderForm from "../folderForm";
import { Theme } from "@/store/data/mockTheme";
import CustomSlider from '../slider';


interface Bookmark {
  id: number;
  title: string;
  url: string;
  imageCover: string | null;
  folderId: number | null;
}

interface Folder {
  id: number;
  name: string;
  icon: string;
  color: string;
  parentId: number | null;
}

const BookmarkApp = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newBookmark, setNewBookmark] = useState<Omit<Bookmark, "id">>({
    title: "",
    url: "",
    imageCover: null,
    folderId: null,
  });
  const [newFolder, setNewFolder] = useState<Omit<Folder, "id">>({
    name: "",
    icon: "Folder",
    color: "#FF8A65",
    parentId: null,
  });
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cardSize, setCardSize] = useState(200);

  const filteredBookmarks = selectedFolderId
    ? bookmarks.filter((b) => b.folderId === selectedFolderId)
    : bookmarks;

  const searchedBookmarks = filteredBookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBookmark = () => setIsBookmarkModalOpen(true);
  const handleAddFolder = () => setIsFolderModalOpen(true);

  const handleCloseModal = () => {
    setIsBookmarkModalOpen(false);
    setIsFolderModalOpen(false);
    resetNewBookmark();
    resetNewFolder();
  };

  const resetNewBookmark = () => {
    setNewBookmark({
      title: "",
      url: "",
      imageCover: null,
      folderId: null,
    });
  };

  const resetNewFolder = () => {
    setNewFolder({
      name: "",
      icon: "Folder",
      color: "#FF8A65",
      parentId: null,
    });
  };

  const handleBookmarkInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewBookmark((prev) => ({
      ...prev,
      [name]: name === "folderId" ? (value ? parseInt(value) : null) : value,
    }));
  };

  const handleFolderInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewFolder((prev) => ({
      ...prev,
      [name]: name === "parentId" ? (value ? parseInt(value) : null) : value,
    }));
  };

  const handleBookmarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...bookmarks.map((b) => b.id), 0) + 1;
    const bookmarkToAdd = { ...newBookmark, id: newId };
    setBookmarks((prev) => [...prev, bookmarkToAdd as Bookmark]);
    handleCloseModal();
  };

  const handleFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...folders.map((f) => f.id), 0) + 1;
    const folderToAdd = { ...newFolder, id: newId };
    setFolders((prev) => [...prev, folderToAdd as Folder]);
    handleCloseModal();
  };

  const toggleFolder = (folderId: number) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      newSet.has(folderId) ? newSet.delete(folderId) : newSet.add(folderId);
      return newSet;
    });
  };

  const renderFolders = (
    parentId: number | null = null,
    depth = 0
  ): JSX.Element[] => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => {
        const IconComponent = Icons[folder.icon as keyof typeof Icons];
        const hasSubfolders = folders.some((f) => f.parentId === folder.id);
        const isExpanded = expandedFolders.has(folder.id);

        return (
          <div key={folder.id} style={{ marginLeft: `${depth * 16}px` }}>
            <div
              className={`flex items-center mb-2 gap-1 hover:bg-gray-700 p-2 rounded cursor-pointer ${
                selectedFolderId === folder.id ? "bg-gray-700" : ""
              }`}
            >
              {hasSubfolders && (
                <div
                  onClick={() => toggleFolder(folder.id)}
                  className="pl-[px]"
                >
                  {isExpanded ? (
                    <ArrowDown2 size="12" />
                  ) : (
                    <ArrowRight2 size="12" />
                  )}
                </div>
              )}
              <div
                className="flex-1 flex items-center"
                onClick={() => setSelectedFolderId(folder.id)}
              >
                <IconComponent size="20" color={folder.color} variant="Bulk" />
                <span className="ml-2">{folder.name}</span>
              </div>
            </div>
            {isExpanded && renderFolders(folder.id, depth + 1)}
          </div>
        );
      });
  };

  const renderFolderOptions = (
    parentId: number | null = null,
    depth = 0
  ): JSX.Element[] => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => (
        <React.Fragment key={folder.id}>
          <option value={folder.id}>{"  ".repeat(depth) + folder.name}</option>
          {renderFolderOptions(folder.id, depth + 1)}
        </React.Fragment>
      ));
  };

  return (
    <div className="flex flex-col h-screen text-white" style={{ backgroundColor: Theme.colors.background }}>
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bookmark Manager</h1>
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
            {viewMode === "grid" ? <RowVertical /> : <GridView />}
          </button>
          <div className="flex items-center space-x-2">
            <Setting4 />
            <div style={{ width: '150px' }}>
            <CustomSlider
              min={100}
              max={300}
              value={cardSize}
              onChange={setCardSize}
              step={10}
            />
          </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          handleAddFolder={handleAddFolder}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
          renderFolders={renderFolders}
        />
        <MainContent
          filteredBookmarks={searchedBookmarks}
          handleAddBookmark={handleAddBookmark}
          viewMode={viewMode}
          cardSize={cardSize}
        />
      </div>

      {isBookmarkModalOpen && (
        <Modal title="Add New Bookmark" onClose={handleCloseModal}>
          <BookmarkForm
            newBookmark={newBookmark}
            handleBookmarkInputChange={handleBookmarkInputChange}
            handleBookmarkSubmit={handleBookmarkSubmit}
            renderFolderOptions={renderFolderOptions}
          />
        </Modal>
      )}

      {isFolderModalOpen && (
        <Modal title="Add New Folder" onClose={handleCloseModal}>
          <FolderForm
            newFolder={newFolder}
            handleFolderInputChange={handleFolderInputChange}
            handleFolderSubmit={handleFolderSubmit}
            renderFolderOptions={renderFolderOptions}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookmarkApp;