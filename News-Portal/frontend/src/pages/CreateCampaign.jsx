import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign , getMyCampaigns , getWallet } from "../store/slices/advertiserSlice";


const CreateCampaign = () => {
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.advertiser);

    useEffect(() => {
  dispatch(getWallet());
}, [dispatch]);

    const [form, setForm] = useState({
        title: "",
        description: "",
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
    const { walletBalance } = useSelector((state) => state.advertiser);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("budget")) {
            setForm({
                ...form,
                budget: {
                    ...form.budget,
                    [name.split(".")[1]]: value,
                },
            });
        } else if (name.includes("schedule")) {
            setForm({
                ...form,
                schedule: {
                    ...form.schedule,
                    [name.split(".")[1]]: value,
                },
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

  dispatch(createCampaign(form)).then(() => {
    dispatch(getMyCampaigns());
    dispatch(getWallet()); // ✅ sync wallet
  });
};

    //   useEffect(() => {
    //     if (message || error) {
    //       const timer = setTimeout(() => {
    //         setMessage("")
    //         setError("")
    //       }, 3000)

    //       return () => clearTimeout(timer)
    //     }
    //   }, [message, error])

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🚀 Create Campaign</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow space-y-4"
            >
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

                <div className="grid grid-cols-2 gap-3">
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

                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mt-4 text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mt-4 text-center">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateCampaign;