import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCampaigns,
  fetchPendingCampaigns,
  approveCampaign,
  rejectCampaign,
} from "../store/slices/adminCampaignSlice";
import CampaignReviewModal from "../components/CampaignReviewModal";
import { showToast } from "../store/slices/uiMessageSlice";

const AdminCampaigns = () => {
  const dispatch = useDispatch();
  const { campaigns, pending, page, totalPages, loading } = useSelector(
    (state) => state.adminCampaigns
  );

  const [activeTab, setActiveTab] = useState("all"); // "all" or "pending"
  const [rejectReason, setRejectReason] = useState("");
  const [rejectModal, setRejectModal] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCampaigns({ page }));
    dispatch(fetchPendingCampaigns());
  }, [dispatch, page]);

  const handleApprove = (id) => {
    dispatch(approveCampaign(id)).then(() =>
      dispatch(fetchPendingCampaigns())
    );
  };

  const handleReject = (id) => {
    if (!rejectReason) return dispatch(showToast({ message: "Enter reason", type: "error" }));
    dispatch(rejectCampaign({ id, reason: rejectReason })).then(() => {
      setRejectReason("");
      dispatch(fetchPendingCampaigns());
    });
  };

  const displayedCampaigns = activeTab === "all" ? campaigns : pending;

  return (
  <div className="space-y-6">

    {/* Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Manage Campaigns</h1>
    </div>

    {/* Tabs */}
    <div className="flex gap-3 bg-gray-100 p-1 rounded-xl w-fit">
      <button
        onClick={() => setActiveTab("all")}
        className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
          activeTab === "all"
            ? "bg-blue-600 text-white shadow"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        All Campaigns
      </button>

      <button
        onClick={() => setActiveTab("pending")}
        className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
          activeTab === "pending"
            ? "bg-orange-500 text-white shadow"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        Pending Campaigns
      </button>
    </div>

    {/* 🔹 Table Card */}
    <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">

      <table className="w-full text-sm">
        
        {/* Header */}
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-center">Advertiser</th>
            <th className="p-4 text-center">Status</th>
            {activeTab === "pending" && (
              <th className="p-4 text-center">Actions</th>
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {displayedCampaigns.length === 0 ? (
            <tr>
              <td
                colSpan={activeTab === "pending" ? 4 : 3}
                className="text-center p-8 text-gray-400"
              >
                No campaigns found 🚫
              </td>
            </tr>
          ) : (
            displayedCampaigns.map((c) => (
              <tr
                key={c._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {c.title}
                </td>

                <td className="p-4 text-center text-gray-600">
                  {c.advertiser?.name || "Unknown"}
                </td>

                {/*  Status Colors */}
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : c.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : c.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                {/* Actions */}
                {activeTab === "pending" && (
                  <td className="p-4">
                    <div className="flex justify-center gap-2 flex-wrap">

                      <button
                        onClick={() => setSelectedCampaign(c)}
                        className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleApprove(c._id)}
                        className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCampaign(c);
                          setRejectModal(c);
                        }}
                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Reject
                      </button>

                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/*  Pagination */}
    {activeTab === "all" && (
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

        <button
          disabled={page === 1}
          onClick={() => dispatch(fetchAllCampaigns({ page: page - 1 }))}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40"
        >
          ← Prev
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => dispatch(fetchAllCampaigns({ page: page + 1 }))}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    )}

    {/*  Modal */}
    {selectedCampaign && (
      <CampaignReviewModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        dispatch={dispatch}
        actions={{
          approve: approveCampaign,
          reject: rejectCampaign,
        }}
        rejectModal={rejectModal}
        setRejectModal={setRejectModal}
      />
    )}
  </div>
);
};

export default AdminCampaigns;