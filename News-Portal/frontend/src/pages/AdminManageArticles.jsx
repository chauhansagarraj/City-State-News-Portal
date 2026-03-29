import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllArticles,
  fetchPendingArticles,
  approveArticle,
  rejectArticle,
  publishArticle,
} from "../store/slices/adminArticleSlice";

import ArticleReviewModal from "../components/ArticleReviewModal";
import { showToast } from "../store/slices/uiMessageSlice";

const AdminManageArticles = () => {
  const dispatch = useDispatch();

  const { articles, pending } = useSelector(
    (state) => state.adminArticles
  );

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    dispatch(fetchAllArticles());
    dispatch(fetchPendingArticles());
  }, [dispatch]);

  console.log("Articles" , fetchAllArticles());
  

  return (
    <div className="space-y-6">

      {/* 🔹 Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setTab("all")}
          className={`px-4 py-2 rounded-lg ${
            tab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Articles
        </button>

        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-2 rounded-lg ${
            tab === "pending"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pending Articles
        </button>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-2xl gap-4 shadow p-8 overflow-x-auto">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="border-b">
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

         <tbody>
  {(tab === "all" ? articles : pending).map((article) => (
    <tr key={article._id} className="border-b hover:bg-gray-50">

      <td className="max-w-[200px] truncate">{article.title}</td>
      <td className="max-w-[120px] truncate">{article.author?.name}</td>

      <td>
        <span
          className={`px-2 py-1 rounded text-sm
          ${
            article.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : article.status === "approved"
              ? "bg-blue-100 text-blue-600"
              : article.status === "published"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {article.status}
        </span>
      </td>

      <td className="py-2">
        <div className="flex flex-wrap gap-2">

        {/* ✅ SAME AS USERS → VIEW ALWAYS */}
        <button
          onClick={() => setSelectedArticle(article)}
          className="bg-gray-800 text-white px-2 py-1 rounded"
        >
          View
        </button>

        {/* ✅ Pending Actions (same as users) */}
        {tab === "pending" && (
          <>
            <button
              onClick={() => {
                dispatch(approveArticle(article._id))
                  .unwrap()
                  .then(() => {
                    dispatch(showToast({ message: "Article approved" }));
                        dispatch(fetchPendingArticles());
                    dispatch(fetchAllArticles());
                  })
                  .catch(() => {
                    dispatch(showToast({ message: "Approval failed", type: "error" }));
                  });
              }}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => {
                dispatch(rejectArticle({ id: article._id, reason: "Not valid" }))
                  .unwrap()
                  .then(() => {
                    dispatch(showToast({ message: "Article rejected" }));
                                            dispatch(fetchPendingArticles());

                    dispatch(fetchAllArticles());
                  })
                  .catch(() => {
                    dispatch(showToast({ message: "Rejection failed", type: "error" }));
                  });
              }}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Reject
            </button>
          </>
        )}

        {/* ✅ Approved → Publish */}
        {article.status === "approved" && (
          <button
            onClick={() => {
              dispatch(publishArticle(article._id))
                .unwrap()
                .then(() => {
                  dispatch(showToast({ message: "Article published" }));
                  dispatch(fetchAllArticles());
                })
                .catch(() => {
                  dispatch(showToast({ message: "Publish failed", type: "error" }));
                });
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Publish
          </button>
        )}
</div>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* 🔥 Modal */}
      <ArticleReviewModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        dispatch={dispatch}
        actions={{
          approve: approveArticle,
          reject: rejectArticle,
        }}
      />

    </div>
  );
};

export default AdminManageArticles;