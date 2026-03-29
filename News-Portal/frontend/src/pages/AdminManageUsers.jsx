import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllUsers,
    fetchPendingUsers,
    approveUser,
    rejectUser,
    blockUser,
    unblockUser,
} from "../store/slices/adminUserSlice";
import UserReviewModal from "../components/UserReviewModel";
import { showToast } from "../store/slices/uiMessageSlice";
const AdminManageUsers = () => {
    const dispatch = useDispatch();
    const { users, pending } = useSelector((state) => state.adminUsers);
    const [selectedUser, setSelectedUser] = useState(null);

    const [tab, setTab] = useState("all");

    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchPendingUsers());
    }, [dispatch]);

    return (
        <div className="space-y-6">

            {/* 🔹 Tabs */}
            <div className="flex gap-4">
                <button
                    onClick={() => setTab("all")}
                    className={`px-4 py-2 rounded-lg ${tab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                >
                    All Users
                </button>

                <button
                    onClick={() => setTab("pending")}
                    className={`px-4 py-2 rounded-lg ${tab === "pending" ? "bg-orange-500 text-white" : "bg-gray-200"
                        }`}
                >
                    Pending Approvals
                </button>
            </div>

            {/* 🔹 Table */}
            <div className="bg-white rounded-2xl shadow p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(tab === "all" ? users : pending).map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">

                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="capitalize">{user.role}</td>

                                <td>
                                    <span className={`px-2 py-1 rounded text-sm
                    ${user.status === "blocked" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                        {user.verificationStatus}
                                    </span>
                                </td>

                                <td className="flex gap-2 py-2">

                                    {/* ✅ Pending Actions */}
                                    {tab === "pending" && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    dispatch(approveUser(user._id))
                                                        .unwrap()
                                                        .then(() => {
                                                            dispatch(showToast({ message: "User approved successfully" }));
                                                            dispatch(fetchPendingUsers());
                                                            dispatch(fetchAllUsers());
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
                                                    dispatch(rejectUser({ id: user._id, reason: "Not valid" }))
                                                        .unwrap()
                                                        .then(() => {
                                                            dispatch(showToast({ message: "User rejected successfully" }));
                                                            dispatch(fetchPendingUsers());
                                                            dispatch(fetchAllUsers());
                                                        })
                                                        .catch(() => {
                                                            dispatch(showToast({ message: "Rejection failed", type: "error" }));
                                                        });
                                                }}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                                            >
                                                Reject
                                            </button>

                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="bg-gray-800 text-white px-2 py-1 rounded"
                                            >
                                                View
                                            </button>

                                            <UserReviewModal
                                                user={selectedUser}
                                                onClose={() => setSelectedUser(null)}
                                                dispatch={dispatch}
                                                actions={{
                                                    approve: approveUser,
                                                    reject: rejectUser,
                                                }}
                                            />
                                        </>
                                    )}

                                    {/* ✅ Block/Unblock */}
                                    {user.status === "active" ? (
                                        <button
                                            onClick={() => {
                                                dispatch(blockUser(user._id))
                                                    .unwrap()
                                                    .then(() => {
                                                        dispatch(showToast({ message: "User blocked successfully" }));
                                                        dispatch(fetchAllUsers());
                                                    })
                                                    .catch(() => {
                                                        dispatch(showToast({ message: "Block failed", type: "error" }));
                                                    });
                                            }}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Block
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                dispatch(unblockUser(user._id))
                                                    .unwrap()
                                                    .then(() => {
                                                        dispatch(showToast({ message: "User unblocked successfully" }));
                                                        dispatch(fetchAllUsers());

                                                    })
                                                    .catch(() => {
                                                        dispatch(showToast({ message: "Unblock failed", type: "error" }));
                                                    });
                                            }}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Unblock
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminManageUsers;