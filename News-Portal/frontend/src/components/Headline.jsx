
import { useSelector } from "react-redux";
import "../index.css"
import { Link } from "react-router-dom";

const HeadlineTicker = () => {
  const articles = useSelector((state) => state.articles.allArticles); // adjust according to your slice

  if (!articles || articles.length === 0) return null;

  return (
    <div className="overflow-hidden bg-blue-50 border-t border-b border-blue-200 py-2">
      <div className="flex animate-scroll whitespace-nowrap">
        {articles.map((article, idx) => (
          <Link
            to={`/article/${article._id}`}
            key={idx}
            className="mx-8 font-medium text-blue-700"
          >
            {article.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeadlineTicker;