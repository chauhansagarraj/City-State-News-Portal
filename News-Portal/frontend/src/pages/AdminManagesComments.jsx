import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAdminComments,
    toggleComment,
} from "../store/slices/adminCommentSlice";
import { showToast } from "../store/slices/uiMessageSlice";

const AdminComments = () => {
    const dispatch = useDispatch();

    const { comments, page, totalPages } = useSelector(
        (state) => state.adminComments
    );

    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        dispatch(fetchAdminComments({ page: 1, status: statusFilter }));
    }, [dispatch, statusFilter]);

    return (
      <div className="space-y-6">

  {/* 🔹 Header */}
  <div className="flex justify-between items-center">
    <h2 className="text-xl font-semibold">Manage Comments</h2>
    <span className="text-sm text-gray-500">
      Page {page} of {totalPages}
    </span>
  </div>

  {/* 🔹 Filters */}
  <div className="flex gap-3">
    {["", "visible", "hidden"].map((s) => (
      <button
        key={s}
        onClick={() => setStatusFilter(s)}
        className={`px-4 py-1 rounded-full text-sm ${
          statusFilter === s
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {s || "All"}
      </button>
    ))}
  </div>

  {/* 🔹 Table */}
  <div className="bg-white rounded-2xl shadow overflow-hidden">

    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="p-3 text-left">Comment</th>
          <th className="p-3">User</th>
          <th className="p-3">Article</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {comments.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center p-6 text-gray-500">
              No comments found
            </td>
          </tr>
        ) : (
          comments.map((c) => (
            <tr key={c._id} className="border-t hover:bg-gray-50">

              {/* COMMENT */}
              <td className="p-3 max-w-[300px]">
                <p className="truncate">
                  {c.text || c.content || "No content"}
                </p>
              </td>

              {/* USER */}
              <td className="p-3 text-center">
                {c.user?.name || "Unknown"}
              </td>

              {/* ARTICLE */}
              <td className="p-3 text-center max-w-[200px] truncate">
                {c.article?.title || "Deleted Article"}
              </td>

              {/* STATUS */}
              <td className="p-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    c.status === "visible"
                      ? "bg-green-100 text-green-600"
                      : c.status === "hidden"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {c.status}
                </span>
              </td>

              {/* ACTION */}
              <td className="p-3 text-center">
                <button
                  onClick={() => {
                    dispatch(toggleComment(c._id))
                      .unwrap()
                      .then((res) => {
                        dispatch(
                          showToast({
                            message:
                              res.status === "hidden"
                                ? "Comment hidden"
                                : "Comment unhidden",
                          })
                        );
                        dispatch(fetchAdminComments({ page, status: statusFilter }));
                      })
                      .catch(() => {
                        dispatch(
                          showToast({
                            message: "Action failed",
                            type: "error",
                          })
                        );
                      });
                  }}
                  className="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  {c.status === "hidden" ? "Unhide" : "Hide"}
                </button>
              </td>

            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* 🔥 PAGINATION */}
  <div className="flex justify-between items-center">

    <button
      disabled={page === 1}
      onClick={() =>
        dispatch(fetchAdminComments({ page: page - 1, status: statusFilter }))
      }
      className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Prev
    </button>

    <button
      disabled={page === totalPages}
      onClick={() =>
        dispatch(fetchAdminComments({ page: page + 1, status: statusFilter }))
      }
      className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>

  </div>
</div>
    );
};

export default AdminComments;