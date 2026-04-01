import React from "react";
import { useState } from "react";
import { showToast } from "../store/slices/uiMessageSlice";

const CampaignReviewModal = ({ campaign, onClose, dispatch, actions }) => {
    if (!campaign) return null;
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    
    return (
        <>
        
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">

      {/* MODAL BOX */}
   <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-lg flex flex-col relative">

  {/*  CLOSE BUTTON */}
  <button
    onClick={onClose}
    className="absolute top-3 right-3 text-gray-600 text-xl hover:text-gray-800"
  >
    ✖
  </button>

  {/*  HEADER (FIXED) */}
  <div className="p-6 border-b">
    <h2 className="text-xl font-semibold">Campaign Details</h2>
  </div>

  {/*  SCROLLABLE CONTENT */}
  <div className="p-6 overflow-y-auto flex-1">

    <div className="grid grid-cols-2 gap-6">

      {/* LEFT SIDE */}
      <div className="space-y-2">
        <p><b>Title:</b> {campaign.title}</p>
        <p><b>Description:</b> {campaign.description}</p>
        <p><b>Budget:</b> ₹{campaign.budget?.total}</p>
        <p><b>Cost per Click:</b> ₹{campaign.budget?.costPerClick}</p>
        <p><b>Cost per Impression:</b> ₹{campaign.budget?.costPerImpression}</p>
        <p><b>Start Date:</b> {new Date(campaign.schedule?.startDate).toLocaleDateString()}</p>
        <p><b>End Date:</b> {new Date(campaign.schedule?.endDate).toLocaleDateString()}</p>
        <p><b>Status:</b> {campaign.status}</p>
        <p><b>Advertiser:</b> {campaign.advertiser?.name}</p>
        <p><b>Email:</b> {campaign.advertiser?.email}</p>

        {campaign.rejectionReason && (
          <p><b>Rejection Reason:</b> {campaign.rejectionReason}</p>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-2">
        {campaign.images?.length > 0 ? (
          campaign.images.map((m, idx) => (
            <img
              key={idx}
              src={m}
              alt={`media-${idx}`}
              className="rounded border w-full"
            />
          ))
        ) : (
          <p>No media uploaded</p>
        )}
      </div>

    </div>
  </div>

  {/*  ACTION BUTTONS (FIXED FOOTER) */}
  {campaign.status === "pending" && (
    <div className="p-4 border-t flex justify-end gap-4">

      <button
        onClick={() => {
          dispatch(actions.approve(campaign._id))
            .unwrap()
            .then(() => {
              dispatch(showToast({ message: "Campaign approved successfully" }));
            });
          onClose();
        }}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Approve
      </button>

    <button
  onClick={() => setRejectModal(campaign)}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
  Reject
</button>

    </div>
  )}
</div>
    </div>
     {rejectModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[60]">
  
      <div className="bg-white p-6 rounded-xl w-[400px]">
  
        <h2 className="text-lg font-bold mb-3 text-red-600">
          Enter Rejection Reason
        </h2>
  
        <textarea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Enter reason..."
          className="border p-2 w-full mb-4 rounded"
        />
  
        <div className="flex justify-end gap-2">
          
          <button
            onClick={() => {
              setRejectModal(null);
              setRejectReason("");
            }}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
  
          <button
            onClick={() => {
              if (!rejectReason) return;
  
              dispatch(actions.reject({
                id: rejectModal._id,
                reason: rejectReason
              }))
                .unwrap()
                .then(() => {
                  dispatch(showToast({ message: "Campaign rejected successfully" }));
                });
  
              setRejectModal(null);
              setRejectReason("");
              onClose(); // close main modal
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Submit
          </button>
  
        </div>
      </div>
    </div>
  )}
    </>
  );
 
};

export default CampaignReviewModal;