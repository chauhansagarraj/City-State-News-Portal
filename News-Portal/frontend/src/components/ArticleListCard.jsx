import React from "react";

const ArticleListCard = ({ article }) => {
  return (
    <div className="border-b border-gray-200 py-3 hover:bg-gray-50 cursor-pointer transition">
      <h3 className="font-semibold text-gray-800">{article.title}</h3>
      <div className="flex justify-between text-sm text-gray-500 mt-1">
        <span>{article.author}</span>
        <span>{new Date(article.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ArticleListCard;