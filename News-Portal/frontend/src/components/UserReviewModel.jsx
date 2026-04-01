const UserReviewModal = ({ user, onClose, dispatch, actions }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            {/* MODAL BOX */}
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 text-xl"
                >
                    ✖
                </button>

                <h2 className="text-xl font-semibold mb-4">User Details</h2>

                <div className="grid grid-cols-2 gap-6">

                    <div className="space-y-2">
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Role:</b> {user.role}</p>

                        {user.role === "journalist" && (
                            <>
                                <p><b>Press Card:</b> {user.pressCardNumber}</p>
                                <p><b>Organization:</b> {user.organizationName}</p>
                                <p><b>Experience:</b> {user.experienceYears}</p>
                                <p><b>Gov ID:</b> {user.governmentIDNumber}</p>
                            </>
                        )}

                        {user.role === "advertiser" && (
                            <>
                                <p><b>Company:</b> {user.companyName}</p>
                                <p><b>GST:</b> {user.gstNumber}</p>
                                <p><b>Website:</b> {user.companyWebsite}</p>
                                <p><b>Gov ID:</b> {user.governmentIDNumber}</p>
                            </>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">ID Proof</h3>

                        {user.idProofImage ? (
                            <img
                                src={user.idProofImage}
                                alt="proof"
                                className="rounded border w-full"
                            />
                        ) : (
                            <p>No image uploaded</p>
                        )}
                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-6">

                    <button
                        onClick={() => {
                            dispatch(actions.approve(user._id))
                                .unwrap()
                                .then(() => {
                                    dispatch(showToast({ message: "User approved successfully" }));
                                });
                            onClose();
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Approve
                    </button>

                    <button
                        onClick={() => {
                            const reason = prompt("Enter rejection reason");
                            dispatch(actions.reject({ id: user._id, reason }))
                                .unwrap()
                                .then(() => {
                                    dispatch(showToast({ message: "User rejected successfully" }));
                                });
                            onClose();
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Reject
                    </button>

                </div>

            </div>
        </div>
    );
};

export default UserReviewModal;