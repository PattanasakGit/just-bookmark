import { BookmarkType } from "@/interface/bookmarksType";
import {Theme} from "@/store/data/mockTheme";

const BookmarkCard = ({ bookmark, cardSize }: { bookmark: BookmarkType, cardSize: number }) => {
  return (
    <div
      className={`backdrop-blur-3xl p-4 rounded-xl shadow w-[${cardSize}]`}
      style={{ backgroundColor: Theme.colors.card_bg }}
    >
      {bookmark.imageCover && (
        <img src={bookmark.imageCover} alt={bookmark.title} className="mb-2" />
      )}
      <h3 className="font-bold">{bookmark.title}</h3>
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400"
      >
        {bookmark.url}
      </a>
    </div>
  );
};

export default BookmarkCard;
