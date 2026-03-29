import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  if (!article) return null;

  const getDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  return (
   <div className="bg-white rounded-2xl shadow-md overflow-hidden 
                hover:shadow-2xl transition duration-300 group 
                flex flex-col h-full">

      {/* Image Section */}
      <div className="relative overflow-hidden">

        <div className="relative h-52 overflow-hidden">
  <img
    src={article.image || "/default-news.jpg"}
    alt={article.title}
    className="w-full h-full object-cover 
               group-hover:scale-105 transition duration-300"
  />
  </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t 
                        from-black/70 via-black/20 to-transparent"></div>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 
                         bg-red-600 text-white text-xs px-3 py-1 
                         rounded-full shadow">
          {article.category || "News"}
        </span>

        {/* Views */}
        <span className="absolute top-3 right-3 
                         bg-black/60 text-white text-xs px-2 py-1 
                         rounded flex items-center gap-1">
          👁 {article.views || 0}
        </span>

        {/* Title on Image */}
        <h2 className="absolute bottom-3 left-3 right-3 
                       text-white text-lg font-bold line-clamp-2">
          {article.title}
        </h2>
      </div>

      {/* Content */}
     <div className="p-4 flex flex-col flex-grow">

        {/* Excerpt */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {article.excerpt}
        </p>

        {/* Author + Date */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center gap-2">

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
              {article.author?.name?.[0] || "A"}
            </div>

            <div className="text-xs">
              <p className="text-gray-800 font-medium">
                {article.author || "Admin"}
              </p>
              <p className="text-gray-400">
                {getDate(article.createdAt)}
              </p>
            </div>

          </div>

          {/* Ratings */}
          <div className="text-xs text-yellow-500 font-semibold">
            ⭐ {article.averageRating || 0}
          </div>

        </div>

        {/* Bottom Stats */}
        <div className="flex justify-between items-center mt-4">

          <div className="flex gap-4 text-xs text-gray-500">
            <span>❤️ {article.likesCount || 0}</span>
          </div>

          {/* Read More Button */}
          <Link
            to={`/article/${article._id}`}
            className="text-sm font-medium text-red-600 
                       hover:underline"
          >
            Read More →
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NewsCard;