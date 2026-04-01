import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  toggleLikeArticle,
  viewArticle,
  fetchArticleDetails,
} from "../store/slices/articleSlice";

import CommentSection from "../components/commentSection";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/RatingsSection";
import BookmarkButton from "../components/BookMarkButton";

const ArticleDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { article, loading, error } = useSelector(
    (state) => state.articles
  );

  const loggedInUser = useSelector((state) => state.auth.user);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!id) return;

    const viewed = sessionStorage.getItem(`viewed-${id}`);

    if (!viewed) {
      dispatch(viewArticle(id));
      sessionStorage.setItem(`viewed-${id}`, "true");
    }

    dispatch(fetchArticleDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Loading article...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!article) return null;

  const handleLike = () => {
    dispatch(toggleLikeArticle(article._id));
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

          {/* Category */}
          <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
            {article.title}
          </h1>

          {/* Author + Date */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
            <span>By <b>{article.author?.name}</b></span>
            <span>•</span>
            <span>
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>

          {article.images?.length > 0 && (
            <div className="mt-6 overflow-hidden rounded-lg">
              <img
                src={article.images[0]}
                alt={article.title}
                className="w-full h-[400px] object-cover hover:scale-105 transition duration-300"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-6 border-b pb-4">
            <span>👁 {article.views} Views</span>
            <span>❤️ {article.likesCount} Likes</span>
            <span>⭐ {article.averageRating || 0} Rating</span>
          </div>

          <div className="mt-6 text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {article.content}
          </div>

          <div className="mt-8">
            <Rating
              articleId={article._id}
              userRating={article.userRating || 0}
            />
          </div>
        </div>

        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-full px-6 py-3 flex items-center gap-6 z-50">

          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-red-600 font-medium hover:scale-105 transition"
          >
            ❤️ {article.likesCount || 0}
          </button>

          
          <button
            onClick={() => setShowComments(true)}
            className="flex items-center gap-2 text-gray-700 hover:text-black"
          >
            💬 Comments
          </button>

          <BookmarkButton
            articleId={article._id}
            user={loggedInUser}
          />
        </div>

    {showComments && (
  <CommentSection
    articleId={article._id}
    currentUser={loggedInUser}
    close={() => setShowComments(false)}
  />
)}
      </div>

      <Footer />
    </>
  );
};

export default ArticleDetails;