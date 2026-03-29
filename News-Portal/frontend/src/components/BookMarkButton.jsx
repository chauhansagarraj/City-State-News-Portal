import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggleBookmark  } from "../store/slices/bookmarkSlice";
import { updateSavedArticles } from "../store/slices/readerSlice";
const BookmarkButton = ({ articleId }) => {
  const dispatch = useDispatch();
const { savedArticles  } = useSelector((state) => state.reader);
const { user } = useSelector((state) => state.auth);
  // 🔥 Check saved
  const isSaved = savedArticles.some(
    (a) => a._id === articleId || a === articleId
  );

 const handleClick = () => {
    // 🔥 1. Instant UI update
    dispatch(updateSavedArticles(articleId));

    // 🔥 2. Backend call
    dispatch(toggleBookmark(articleId));
  };



  return (
    <>
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded ${
        isSaved ? "bg-green-500 text-white" : "bg-gray-200"
      }`}
    >

      {(user.role === "reader" && isSaved) ? "🔖 Saved" : "📑 Save"}
      {/* {isSaved ? "🔖 Saved" : "📑 Save"} */}
    </button>

</>


)}
 

export default BookmarkButton;