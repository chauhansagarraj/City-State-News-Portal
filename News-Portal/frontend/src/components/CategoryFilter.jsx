import { useDispatch } from "react-redux";
import { filterArticles } from "../store/slices/articleSlice";

const CategoryFilter = () => {

  const dispatch = useDispatch();

const handleCategory = (e) => {
  const category = e.target.value;

  if (!category) {
    dispatch(fetchArticles()); // show all
  } else {
    dispatch(filterArticles({ category }));
  }
};

  return (
    <div className="mb-6">

      <select
        onChange={handleCategory}
        className="border p-2 rounded"
      >
        <option value="">Select Category</option>

        <option value="Politics">Politics</option>
        <option value="Sports">Sports</option>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>


      </select>

    </div>
  );
};

export default CategoryFilter;