import React from "react";
import { BookmarkType } from "@/interface/bookmarksType";
import { Theme } from "@/store/data/mockTheme";

const BookmarkCard = ({
  bookmark,
  cardSize,
  viewMode,
}: {
  bookmark: BookmarkType;
  cardSize: number;
  viewMode: "grid" | "list";
}) => {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const renderTags = (tags: string[]) => {
    return tags.map((tag, index) => (
      <span
        key={index}
        className="inline-block bg-orange-400  text-white text-xs px-2 py-1 rounded-full mr-1 mb-1"
      >
        {tag}
      </span>
    ));
  };

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        block relative overflow-hidden rounded-xl shadow-lg transition-all duration-300
        hover:shadow-xl hover:scale-105 backdrop-blur-[100px]
        ${viewMode === "list" ? "flex items-center" : "flex flex-col"}
        border-2 border-opacity-30 hover:border-opacity-50
      `}
      style={{
        width: viewMode === "list" ? "100%" : cardSize,
        height: viewMode === "list" ? "100px" : cardSize,
        backgroundColor: "#00000050",
        borderColor: Theme.colors.card_border,
      }}
    >
      {viewMode === "list" ? (
        <>
          {bookmark.imageCover && (
            <div className="w-[10%] h-full z-10">
              <img
                src={bookmark.imageCover}
                alt={bookmark.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="flex-grow p-4 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white z-50">
              {truncateTitle(bookmark.title, 50)}
            </h3>
          </div>
          <div className="absolute top-2 right-2">
            {renderTags(bookmark.tags || [])}
          </div>
        </>
      ) : bookmark.imageCover ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
          <div className="relative overflow-hidden w-full h-full">
            <img
              src={bookmark.imageCover}
              alt={bookmark.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-lg font-bold text-white">
              {truncateTitle(bookmark.title, 30)}
            </h3>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full p-4">
          <h3 className="text-lg font-bold text-white text-center">
            {bookmark.title}
          </h3>
        </div>
      )}
    </a>
  );
};

export default BookmarkCard;
