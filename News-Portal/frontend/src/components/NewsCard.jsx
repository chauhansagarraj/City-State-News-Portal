import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  if (!article) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">

      {/* Article Image */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        {/* Category */}
        <p className="text-red-600 text-xs font-semibold uppercase">
          {article.category}
        </p>

        {/* Title */}
        <h2 className="text-lg font-bold mt-2 line-clamp-2">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Author + Date */}
        <div className="flex justify-between text-xs text-gray-500 mt-4">
          <span>{article.author || "Unknown"}</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-gray-500 mt-2">
          <span>👁 {article.views}</span>
          <span>❤️ {article.likesCount}</span>
          <span>⭐ {article.averageRating || 0}</span>
        </div>

        {/* Read More */}
        <Link
          to={`/article/${article._id}`}
          className="text-blue-600 text-sm mt-3 inline-block hover:underline"
        >
          Read More →
        </Link>

      </div>
    </div>
  );
};

export default NewsCard;