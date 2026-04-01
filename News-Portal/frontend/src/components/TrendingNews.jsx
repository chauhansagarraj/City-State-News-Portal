import { Link } from "react-router-dom";

const TrendingNews = ({ articles }) => {

  // Sort by views (highest first)
  const sortedArticles = [...articles].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  );

  const getTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5">

      {/* Header */}
      <h3 className="text-xl font-bold mb-4 border-b pb-2 text-orange-600">
         Trending News
      </h3>

      <div className="space-y-4">

        {sortedArticles.map((article, index) => (
          <Link
            key={article._id}
            to={`/article/${article._id}`}
            className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >

            {/* Image */}
            <img
              src={article.image || "/default-news.jpg"}
              alt={article.title}
              className="w-16 h-16 object-cover rounded-md"
            />

            {/* Content */}
            <div className="flex flex-col flex-1">

              {/* Top row */}
              <div className="flex items-center gap-2 text-xs text-gray-500">

                {/* Trending Rank */}
                {index < 3 && (
                  <span className="text-orange-600 font-bold">
                    #{index + 1}
                  </span>
                )}

                {/* Category */}
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                  {article.category || "Trending"}
                </span>

                {/* Time */}
                <span>{getTime(article.createdAt)}</span>
              </div>

              {/* Title */}
              <h5 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-orange-600">
                {article.title}
              </h5>

              {/* Bottom row */}
              <div className="flex justify-between text-xs text-gray-400">

                {/* Author */}
                <span>
                  By {article.author?.name || "Admin"}
                </span>

                {/* Views */}
                <span>👁 {article.views || 0}</span>

              </div>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
};

export default TrendingNews;  