import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterArticles, fetchArticles } from "../store/slices/articleSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    category: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(updatedFilters);

    // Remove empty values before sending
    const cleanedFilters = Object.fromEntries(
      Object.entries(updatedFilters).filter(([_, v]) => v !== "")
    );

    if (Object.keys(cleanedFilters).length === 0) {
      dispatch(fetchArticles());
    } else {
      dispatch(filterArticles(cleanedFilters));
    }
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">

      {/* Category */}
      <p><b>Filter News :</b></p>
      <select name="category" onChange={handleChange} className="border p-2 rounded">
        <option value="">Category</option>
        <option value="Politics">Politics</option>
        <option value="Sports">Sports</option>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
      </select>

      {/* State */}
      <select name="state" onChange={handleChange} className="border p-2 rounded">
        <option value="">State</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Maharashtra">Maharashtra</option>
      </select>

      {/* City */}
      <select name="city" onChange={handleChange} className="border p-2 rounded">
        <option value="">City</option>
        <option value="Ahmedabad">Ahmedabad</option>
        <option value="Surat">Surat</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      {/* Reset */}
      <button
        onClick={() => {
          setFilters({ category: "", state: "", city: "" });
          dispatch(fetchArticles());
        }}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default CategoryFilter;