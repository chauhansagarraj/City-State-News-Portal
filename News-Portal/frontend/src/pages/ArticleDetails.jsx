import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleLikeArticle } from "../store/slices/articleSlice";
import { fetchArticleDetails } from "../store/slices/articleSlice";
import CommentSection from "../components/commentSection";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/RatingsSection";
import { current } from "@reduxjs/toolkit";

const ArticleDetails = () => {  

  const { id } = useParams();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.user);

  const [showComments, setShowComments] = useState(false);
const [selectedArticle, setSelectedArticle] = useState(null);

  const { article, loading, error  } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    dispatch(fetchArticleDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-center mt-10">Loading article...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!article) return null;

  const handleLike = () => {
  dispatch(toggleLikeArticle(article._id));
};
// console.log("loggedInUser", loggedInUser);


  return (
    <>
      <Header />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Category */}
        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl font-bold mt-4 mb-4">
          {article.title}
        </h1>

        {/* Author + Date */}
        <div className="flex gap-4 text-sm text-gray-500 mb-6">
          <span>By {article.author?.name}</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Image */}
        {article.images && article.images.length > 0 && (
          <img
            src={article.images[0]}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded mb-6"
          />
        )}

        {/* Stats */}
        <div className="flex gap-6 text-sm text-gray-600 mb-6">
          <span>👁 Views: {article.views}</span>
          <span>❤️ Likes: {article.likesCount}</span>
          <span>⭐ Rating: {article.averageRating}</span>
        </div>

        {/* Content */}
        <p className="text-lg text-gray-700 leading-relaxed">
          {article.content}
        </p>

        {/* Like Section */}

<div className="flex items-center gap-4 border-t pt-6 mt-8">

  <button
    onClick={handleLike}
    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    ❤️ Like
  </button>

  <span className="text-gray-600">
    {article.likesCount || 0} people liked this
  </span>

<button
  onClick={() => {
    setSelectedArticle(article._id);
    setShowComments(true);
  }}
  className=" px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
>
  Read & Post Comments
</button>

</div>

{showComments && (
  <CommentSection
  articleId={selectedArticle}
  close={() => setShowComments(false)}
  currentUser={loggedInUser} 
  />
)}  <Rating articleId={article._id} userRating={article.userRating || 0} />


      </div>

      <Footer />
    </>
  );
};

export default ArticleDetails;