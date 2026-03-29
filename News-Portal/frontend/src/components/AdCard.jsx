import { useEffect } from "react";
import axios from "axios";

const AdCard = ({ ad }) => {
  // Track impression
  useEffect(() => {
    axios.post(`http://localhost:5000/api/advertiser/track/impression/${ad._id}`);
  }, [ad._id]);

  // Track click
  const handleClick = async () => {
    await axios.post(`http://localhost:5000/api/advertiser/track/click/${ad._id}`);
    window.open(ad.redirectUrl, "_blank");
  };

  // Helper to detect if file is video
  // const isVideo = (url) => {
  //   const ext = url.split(".").pop().toLowerCase();
  //   return ["mp4", "mov", "webm"].includes(ext);
  // };
  console.log("ads" , ad);
  console.log("ad image" , ad?.images)

  return (
    <div
      onClick={handleClick}
      className="bg-white p-4 rounded-xl cursor-pointer hover:shadow-md transition mb-6 text-center"
    >
      <h3 className="font-bold text-lg mb-2">Advertisement</h3>

      {/* Media */}
<div className="grid grid-cols-1 gap-2">
 
      <img
        src={ad.images?.[0]}
        alt="Advertisement"
        className="w-full rounded max-h-64 h-auto"
      />
</div>
    </div>
  );
};

export default AdCard;