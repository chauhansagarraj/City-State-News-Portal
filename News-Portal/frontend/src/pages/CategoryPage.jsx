import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArticlesByCategory } from "../store/slices/articleSlice";
import NewsCard from "../components/NewsCard";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const CategoryPage = () => {

  const { category } = useParams();
  const dispatch = useDispatch();

  const { articles, loading } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticlesByCategory(category));
  }, [category, dispatch]);

  return (
    <>
        <Header />
       <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category} News
      </h1>

      {loading && <p>Loading...</p>}

      <div className="grid gap-6">

        {articles.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}

      </div>

    </div>
    </>
  );
};


export default CategoryPage;