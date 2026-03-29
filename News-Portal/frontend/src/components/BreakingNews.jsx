import { Link } from "react-router-dom";
import dayjs from "dayjs";

const BreakingNews = ({ articles }) => {

  // 🧠 Group articles by date (Today, Yesterday, Older)
  const groupArticlesByDate = () => {
    const groups = {};

    articles.forEach((article) => {
      const date = dayjs(article.createdAt);

      let label = date.format("DD MMM YYYY");

      if (date.isSame(dayjs(), "day")) {
        label = "Today";
      } else if (date.isSame(dayjs().subtract(1, "day"), "day")) {
        label = "Yesterday";
      }

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(article);
    });

    return groups;
  };

  const groupedArticles = groupArticlesByDate();

  return (
    <div className="bg-white shadow-lg rounded-xl p-5">

      {/* Header */}
      <h3 className="text-xl font-bold mb-4 border-b pb-2 text-red-600">
        🔴 Breaking News
      </h3>

      {/* Date-wise sections */}
      {Object.keys(groupedArticles).map((dateLabel) => (
        <div key={dateLabel} className="mb-5">

          {/* Date Heading */}
          <h4 className="text-sm font-semibold text-gray-500 mb-3">
            {dateLabel}
          </h4>

          <div className="space-y-3">

            {groupedArticles[dateLabel].map((article) => (
              <Link
                key={article._id}
                to={`/article/${article._id}`}
                className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
              >
                {/* Thumbnail */}
                <img
                  src={article.image || "/default-news.jpg"}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded-md"
                />

                {/* Content */}
                <div className="flex flex-col flex-1">

                  {/* Category + Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded">
                      {article.category || "General"}
                    </span>
                    <span>
                      {dayjs(article.createdAt).format("hh:mm A")}
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-red-600">
                    {article.title}
                  </h5>

                  {/* Author */}
                  <p className="text-xs text-gray-400">
                    By {article.author?.name || "Admin"}
                  </p>

                </div>
              </Link>
            ))}

          </div>
        </div>
      ))}

    </div>
  );
};

export default BreakingNews;