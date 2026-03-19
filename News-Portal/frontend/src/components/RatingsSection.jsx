// frontend/src/components/Rating.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rateArticle } from "../store/slices/ratingsSlice";

const Rating = ({ articleId, userRating = 0 }) => {
  const dispatch = useDispatch();
  const { averageRating, totalRatings, loading } = useSelector(
    (state) => state.ratings
  );

  // selected = current user's star selection
  const [selected, setSelected] = useState(userRating);

  // hasRated = disables stars after user rates
  const [hasRated, setHasRated] = useState(userRating > 0);

  const handleRate = (value) => {
    if (hasRated) return; // prevent multiple ratings

    setSelected(value);
    setHasRated(true);

    dispatch(rateArticle({ articleId, value }));
  };

  // Update state if userRating changes (like after fetching article)
  useEffect(() => {
    if (userRating > 0) {
      setSelected(userRating);
      setHasRated(true);
    }
  }, [userRating]);

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${
              star <= selected ? "text-yellow-400" : "text-gray-300"
            } ${hasRated ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            onClick={() => handleRate(star)}
          >
            ★
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-700 mt-1">
        {loading
          ? "Submitting..."
          : `${averageRating.toFixed(1)} average from ${totalRatings} ratings`}
      </p>
    </div>
  );
};

export default Rating;