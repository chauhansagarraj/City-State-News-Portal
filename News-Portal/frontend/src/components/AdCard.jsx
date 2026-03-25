import { useEffect } from "react";
// import API from "../services/axios";
import axios from "axios";

const AdCard = ({ ad }) => {

  // ✅ TRACK IMPRESSION (on load)
  useEffect(() => {
    axios.post(`http://localhost:5000/api/advertiser/track/impression/${ad._id}`);
  }, [ad._id]);

  // ✅ TRACK CLICK
  const handleClick = async () => {
    await axios.post(`http://localhost:5000/api/advertiser/track/click/${ad._id}`);
    window.open(ad.redirectUrl, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-yellow-100 p-4 rounded-xl cursor-pointer hover:shadow-md transition"
    >
      <p className="text-xs text-gray-500 mb-1">Sponsored</p>

      <h3 className="font-bold text-lg">{ad.title}</h3>

      <p className="text-sm text-gray-700">{ad.description}</p>
    </div>
  );
};

export default AdCard;