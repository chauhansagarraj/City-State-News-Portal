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
      {/* 🔹 Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-1 rounded-full ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All Campaigns
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-1 rounded-full ${activeTab === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
        >
          Pending Campaigns
        </button>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Advertiser</th>
              <th className="p-3">Status</th>
              {activeTab === "pending" && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {displayedCampaigns.length === 0 ? (
              <tr>
                <td colSpan={activeTab === "pending" ? 4 : 3} className="text-center p-6 text-gray-500">
                  No campaigns found
                </td>
              </tr>
            ) : (
              displayedCampaigns.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{c.title}</td>
                  <td className="p-3 text-center">{c.advertiser?.name || "Unknown"}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : c.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  {activeTab === "pending" && (
                    <td className="p-3 text-center flex gap-2 justify-center">
                       <button
  onClick={() => setSelectedCampaign(c)}
  className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
>
  View
</button>
                      <button
                        onClick={() => handleApprove(c._id)}
                        className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                      >
                        Approve
                      </button>
                      {/* <input
                        type="text"
                        placeholder="Reason"
                        value={selectedCampaign?._id === c._id ? rejectReason : ""}
                        onChange={(e) => { setSelectedCampaign(c._id); setRejectReason(e.target.value); }}
                        className="border p-1 rounded text-xs"
                      /> */}
                      {/* <button
                      onClick={() => {
  setSelectedCampaign(c);
  setRejectModal(c);
}}
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        Reject
                      </button> */}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      {activeTab === "all" && (
        <div className="flex justify-between items-center">
          <button
            disabled={page === 1}
            onClick={() => dispatch(fetchAllCampaigns({ page: page - 1 }))}
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => dispatch(fetchAllCampaigns({ page: page + 1 }))}
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        
      )}
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