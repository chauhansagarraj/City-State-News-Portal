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
            alert(" Please add funds before creating a campaign");
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
       <div className="p-6 max-w-4xl mx-auto">

  {/* Header */}
  <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Create Campaign</h1>
    <p className="text-gray-500 text-sm">
      Launch and manage your advertisement campaigns easily
    </p>
  </div>

  {/* Wallet Info */}
  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6 flex justify-between items-center">
    <span className="text-blue-700 font-medium">
      Wallet Balance: ₹{walletBalance}
    </span>
    {walletBalance <= 0 && (
      <span className="text-red-500 text-sm">
        Add funds to create campaign
      </span>
    )}
  </div>

  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-6">

    {/* Basic Info */}
    <div>
      <h2 className="font-semibold text-gray-700 mb-3">Basic Information</h2>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600">Campaign Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            rows="3"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Redirect URL</label>
          <input
            type="text"
            name="redirectUrl"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>

    {/* Budget */}
    <div>
      <h2 className="font-semibold text-gray-700 mb-3">Budget</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          name="budget.total"
          placeholder="Total Budget"
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
        <input
          type="number"
          name="budget.costPerClick"
          placeholder="Cost / Click"
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
        <input
          type="number"
          name="budget.costPerImpression"
          placeholder="Cost / Impression"
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Media Upload */}
    <div>
      <h2 className="font-semibold text-gray-700 mb-3">Media Upload</h2>

      <input
        type="file"
        multiple
        accept="image/*,video/*"
        className="w-full border p-2 rounded-lg"
        onChange={(e) => {
          const files = Array.from(e.target.files);
          setForm({ ...form, images: files });
          setPreviews(files.map((file) => URL.createObjectURL(file)));
        }}
      />

      {/* Preview */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {previews.map((preview, i) => (
            <div key={i} className="relative group">
              <img
                src={preview}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => {
                  const newImages = form.images.filter((_, index) => index !== i);
                  const newPreviews = previews.filter((_, index) => index !== i);
                  setForm({ ...form, images: newImages });
                  setPreviews(newPreviews);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Schedule */}
    <div>
      <h2 className="font-semibold text-gray-700 mb-3">Schedule</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="schedule.startDate"
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
        <input
          type="date"
          name="schedule.endDate"
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={walletBalance <= 0}
      className={`w-full py-3 rounded-lg font-semibold transition ${
        walletBalance <= 0 || walletBalance < form.budget.total
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      Create Campaign
    </button>

    {/* Messages */}
    {message && (
      <div className="bg-green-100 text-green-700 p-3 rounded text-center">
        {message}
      </div>
    )}
    {error && (
      <div className="bg-red-100 text-red-700 p-3 rounded text-center">
        {error}
      </div>
    )}

  </form>
</div>
    );
};

export default CreateCampaign;