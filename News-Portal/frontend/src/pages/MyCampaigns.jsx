import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/myCampaign.css";
import {
    getMyCampaigns,
    deleteCampaign,
    pauseCampaign,
    resumeCampaign,
    submitCampaign,
    clearMessages,
    updateCampaign,
    addFunds,
    getWallet
} from "../store/slices/advertiserSlice";

const MyCampaigns = () => {

    const [editCampaign, setEditCampaign] = useState(null);
        const [showAddFunds, setShowAddFunds] = useState(false);
        const [showReasonModal, setShowReasonModal] = useState(null);
    const [amount, setAmount] = useState("");
    const dispatch = useDispatch();
    const { campaigns, loading, message, error, walletBalance } = useSelector((state) => state.advertiser);

    useEffect(() => {
        dispatch(getMyCampaigns());
         dispatch(getWallet());
    }, [dispatch]);

    const statusColor = (status) => {
        return {
            active: "bg-green-100 text-green-600",
            paused: "bg-yellow-100 text-yellow-600",
            pending: "bg-blue-100 text-blue-600",
            draft: "bg-gray-200 text-gray-600",
            completed: "bg-purple-100 text-purple-600",
        }[status];
    };


    useEffect(() => {
        if (error || message) {
            const timer = setTimeout(() => {
                dispatch(clearMessages());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, message, dispatch]);

    // { loading && <p className="text-center">Updating...</p> }

    console.log("campaigns:", campaigns);
console.log("type:", typeof campaigns);
console.log("isArray:", Array.isArray(campaigns));
const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold mb-6">📊 My Campaigns</h1>
            <div className="bg-white p-5 rounded-2xl shadow mb-6 flex justify-between items-center">

                <div>
                    <h2 className="text-gray-500 text-sm">Wallet Balance</h2>
                    <p className="text-3xl font-bold text-green-600">
                        ₹{walletBalance}
                    </p>
                </div>

                <button
                    onClick={() => setShowAddFunds(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    + Add Funds
                </button>

            </div>
            {message && (
                <div className="bg-green-100 text-green-600 p-2 rounded">
                    {message}
                </div>
            )}
            {error && (
                <div className="bg-red-100 text-red-600 p-2 rounded">
                    {error}
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {campaigns.map((c) => (
                 <div
  key={c._id}
  className="group bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>
  {/* Header */}
  <div className="flex justify-between items-start">
    <div>
      <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
        {c.title}
      </h2>
      <p className="text-xs text-gray-400 mt-1">
        Campaign ID: {c._id.slice(-6)}
      </p>
    </div>

    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor(
        c.status
      )}`}
    >
      {c.status}
    </span>
  </div>

  {/* Description */}
  <p className="text-gray-500 text-sm mt-3 line-clamp-2">
    {c.description}
  </p>

  {/* Budget Progress Bar */}
  <div className="mt-4">
    <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>Budget</span>
      <span>
        ₹{c.budget?.spent} / ₹{c.budget?.total}
      </span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
        style={{
          width: `${Math.min(
            (c.budget?.spent / c.budget?.total) * 100 || 0,
            100
          )}%`,
        }}
      />
    </div>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
    <div className="bg-gray-50 p-2 rounded-lg">
      <p className="text-gray-400 text-xs">Impressions</p>
      <p className="font-semibold text-gray-700">
        {c.analytics?.impressions}
      </p>
    </div>

    <div className="bg-gray-50 p-2 rounded-lg">
      <p className="text-gray-400 text-xs">Clicks</p>
      <p className="font-semibold text-gray-700">
        {c.analytics?.clicks}
      </p>
    </div>
  </div>

  {/* Actions */}
  <div className="flex flex-wrap gap-2 mt-5">

    {c.status === "draft" && (
      <button
        onClick={() => dispatch(submitCampaign(c._id))}
        className="btn-blue"
      >
        Submit
      </button>
    )}

    {c.status === "active" && (
      <button
        onClick={() => dispatch(pauseCampaign(c._id))}
        className="btn-yellow"
      >
        Pause
      </button>
    )}

    {c.status === "paused" && (
      <button
        onClick={() => dispatch(resumeCampaign(c._id))}
        className="btn-green"
      >
        Resume
      </button>
    )}

    <button
      onClick={() => dispatch(deleteCampaign(c._id))}
      className="btn-red"
    >
      Delete
    </button>

    <button
      onClick={() =>
        navigate(`/advertiser/campaign-analytics/${c._id}`)
      }
      className="btn-indigo"
    >
      Analytics
    </button>

    {(c.status === "draft" || c.status === "rejected") && (
      <button
        onClick={() => setEditCampaign(c)}
        className="btn-gray"
      >
        Edit
      </button>
    )}
    {c.status === "rejected" && (
  <button
    onClick={() => setShowReasonModal(c)}
    className="mt-2 bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700"
  >
    View Reason
  </button>
)}

  </div>
</div>
                ))}


            </div>
            {editCampaign && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[400px]">

                        <h2 className="text-xl font-bold mb-4">Edit Campaign</h2>

                        <p>Title:</p>
                        <input
                            value={editCampaign.title}
                            onChange={(e) =>
                                setEditCampaign({ ...editCampaign, title: e.target.value })
                            }
                            placeholder="Title"
                            className="border p-2 w-full mb-3 rounded"
                        />
                        <p>Description:</p>
                        <input
                            value={editCampaign.description}
                            onChange={(e) =>
                                setEditCampaign({ ...editCampaign, description: e.target.value })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <p>Total Budget:</p>
                        <input
                            value={editCampaign.budget.total}
                            type="number"
                            onChange={(e) =>
                                setEditCampaign({
                                    ...editCampaign,
                                    budget: {
                                        ...editCampaign.budget,
                                        total: e.target.value,
                                    },
                                })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <p>Cost Per Click:</p>
                        <input
                            value={editCampaign.budget.costPerClick}
                            type="number"
                            onChange={(e) =>
                                setEditCampaign({
                                    ...editCampaign,
                                    budget: {
                                        ...editCampaign.budget,
                                        costPerClick: e.target.value,
                                    },
                                })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />
                        <p>Cost Per Impression:</p>
                        <input
                            value={editCampaign.budget.costPerImpression}
                            type="number"
                            onChange={(e) =>
                                setEditCampaign({
                                    ...editCampaign,
                                    budget: {
                                        ...editCampaign.budget,
                                        costPerImpression: e.target.value,
                                    },
                                })
                            }
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditCampaign(null)}
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    dispatch(
                                        updateCampaign({
                                            id: editCampaign._id,
                                            data: editCampaign,
                                        })
                                    );
                                    setEditCampaign(null);
                                }}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {showReasonModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

    <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg relative">

      {/* Close */}
      <button
        onClick={() => setShowReasonModal(null)}
        className="absolute top-2 right-3 text-gray-600 text-lg"
      >
        ✖
      </button>

      <h2 className="text-lg font-bold mb-3 text-red-600">
         Rejection Reason
      </h2>

      <p className="text-gray-700 text-sm">
        {showReasonModal.rejectionReason || "No reason provided"}
      </p>

    </div>
  </div>
)}

            {showAddFunds && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    
    <div className="bg-white p-6 rounded-2xl w-[350px] shadow-lg">

      <h2 className="text-xl font-bold mb-4 text-center">
        💰 Add Funds
      </h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex justify-between gap-2">
        
        <button
          onClick={() => setShowAddFunds(false)}
          className="w-full bg-gray-400 text-white py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
        onClick={() => {
  dispatch(addFunds(Number(amount))).then(() => {
    dispatch(getWallet()); // ✅ sync again
  });
  setShowAddFunds(false);
  setAmount("");
}}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Add
        </button>

      </div>

    </div>
  </div>
)}
        </div>

    );

};


export default MyCampaigns;