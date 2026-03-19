import { Link } from "react-router-dom";

const TrendingNews = ({ articles }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">

      <h3 className="text-lg font-bold mb-4 border-b pb-2">
        Trending News
      </h3>

      <ul className="space-y-4">

        {articles.map((article) => (
          <li key={article._id}>

            <Link
              to={`/article/${article._id}`}
              className="text-sm font-medium hover:text-red-600"
            >
              {article.title}
            </Link>

            <p className="text-xs text-gray-500">
              👁 {article.views}
            </p>

          </li>
        ))}

      </ul>

    </div>
  );
};

export default TrendingNews;