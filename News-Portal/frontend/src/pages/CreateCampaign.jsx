import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign, getMyCampaigns, getWallet } from "../store/slices/advertiserSlice";

const CreateCampaign = () => {
    const dispatch = useDispatch();
    const { message, error, walletBalance } = useSelector((state) => state.advertiser);

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        dispatch(getWallet());
    }, [dispatch]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        redirectUrl: "",
        images: [],
        budget: {
            total: "",
            costPerClick: "",
            costPerImpression: "",
        },
        schedule: {
            startDate: "",
            endDate: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("budget")) {
            setForm({
                ...form,
                budget: { ...form.budget, [name.split(".")[1]]: value },
            });
        } else if (name.includes("schedule")) {
            setForm({
                ...form,
                schedule: { ...form.schedule, [name.split(".")[1]]: value },
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (walletBalance <= 0) {
            alert("❌ Please add funds before creating a campaign");
            return;
        }

        const formData = new FormData();

        // Basic
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("redirectUrl", form.redirectUrl);

        // Budget
        formData.append("budget.total", Number(form.budget.total));
        formData.append("budget.costPerClick", Number(form.budget.costPerClick));
        formData.append("budget.costPerImpression", Number(form.budget.costPerImpression));

        // Schedule
        formData.append("schedule.startDate", form.schedule.startDate);
        formData.append("schedule.endDate", form.schedule.endDate);

        // Media (multiple files)
        form.images.forEach((file) => formData.append("images", file));

        dispatch(createCampaign(formData)).then(() => {
            dispatch(getMyCampaigns());
            dispatch(getWallet());
        });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🚀 Create Campaign</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Campaign Title"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="redirectUrl"
                    placeholder="Redirect URL (https://...)"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <div className="grid grid-cols-3 gap-3">
                    <input
                        type="number"
                        name="budget.total"
                        placeholder="Total Budget"
                        className="border p-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="budget.costPerClick"
                        placeholder="Cost / Click"
                        className="border p-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="budget.costPerImpression"
                        placeholder="Cost / Impression"
                        className="border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    className="w-full border p-2 rounded"
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (!files.length) return;

                        // Optional: max 10MB each
                        for (let file of files) {
                            if (file.size > 10 * 1024 * 1024) {
                                alert("File too large (max 10MB)");
                                return;
                            }
                        }

                        setForm({ ...form, images: files });
                        setPreviews(files.map((file) => URL.createObjectURL(file)));
                    }}
                />

                {previews.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                        {previews.map((preview, i) => {
                            const file = form.images[i];
                            const isVideo = file.type.startsWith("video");
                            return isVideo ? (
                                <video
                                    key={i}
                                    src={preview}
                                    controls
                                    className="w-full h-40 object-cover rounded"
                                />
                            ) : (
                                <img
                                    key={i}
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-40 object-cover rounded"
                                />
                            );
                        })}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 mt-3">
                    <input
                        type="date"
                        name="schedule.startDate"
                        className="border p-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="schedule.endDate"
                        className="border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={walletBalance <= 0}
                    className={`px-4 py-2 rounded text-white ${
                        walletBalance <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
                    }`}
                >
                    Create Campaign
                </button>

                {message && <div className="bg-green-100 text-green-700 p-3 rounded mt-4 text-center">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mt-4 text-center">{error}</div>}
            </form>
        </div>
    );
};

export default CreateCampaign;