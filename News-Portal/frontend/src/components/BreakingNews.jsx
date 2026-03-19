import { Link } from "react-router-dom";

const BreakingNews = ({ articles }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">

      <h3 className="text-lg font-bold mb-4 border-b pb-2 text-red-600">
        Breaking News
      </h3>

      <ul className="space-y-4">

        {articles.map((article) => (
          <li key={article._id}>

            <Link
              to={`/article/${article._id}`}
              className="text-sm hover:text-red-600"
            >
              🔴 {article.title}
            </Link>

          </li>
        ))}

      </ul>

    </div>
  );
};

export default BreakingNews;