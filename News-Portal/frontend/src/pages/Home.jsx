import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/slices/articleSlice";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TrendingNews from "../components/TrendingNews";
import NewsCard from "../components/NewsCard";
import Footer from "../components/Footer";
import CategoryFilter from "../components/CategoryFilter";
import AdCard from "../components/AdCard";
import HeadlineTicker from "../components/Headline";
import { getActiveAds } from "../store/slices/adSlice";
// import ArticleListCard from "../components/ArticleListCard";
const Home = () => {
const [currentPage, setCurrentPage] = useState(1);
const articlesPerPage = 6;
  const dispatch = useDispatch();

  const { articles, loading, error, allArticles } = useSelector(
    (state) => state.articles
  );
  const { ads } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(getActiveAds());
  }, [dispatch]);

  // 🔥 TRENDING NEWS (RIGHT SIDE)
  const trendingNews = [...allArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);
const indexOfLast = currentPage * articlesPerPage;
const indexOfFirst = indexOfLast - articlesPerPage;
const currentArticles = articles.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(articles.length / 6);
  return (
    <>
      <Header />
      <Navbar />
      <HeadlineTicker/>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">

        {/* 📰 LEFT - LATEST NEWS (BIGGER AREA) */}
        <div className="col-span-12 lg:col-span-9">


{ads.length > 0 && (
  <div className="mb-6">
    <AdCard ad={ads[0]} />
  </div>
)}
          <h2 className="text-2xl font-bold mb-6">
            Latest News
          </h2>
          {/* ADVERTISEMENT BELOW NAVBAR */}

          {/* Filter */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
            <CategoryFilter />
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* 🔥 GRID CARDS */}
          <div className="grid sm:grid-cols-2 gap-6">

          {currentArticles.map((article, index) => (
              <div key={article._id}>

                <NewsCard article={article} />

                {/* ✅ ADS AFTER EVERY 2 ARTICLES */}
                {/* {index % 2 === 1 && index < 4 && ads.length > 0 && (
                  <AdCard ad={ads[index % ads.length]} />
                )} */}

              </div>
            ))}
            </div>
           <div className="flex justify-center gap-2 mt-8 flex-wrap">

  {/* Prev */}
  <button
    onClick={() => setCurrentPage(prev => prev - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-gray-200 rounded"
  >
    Prev
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded ${
        currentPage === i + 1
          ? "bg-blue-500 text-white"
          : "bg-gray-200"
      }`}
    >
      {i + 1}
    </button>
  ))}

  {/* Next */}
  <button
    onClick={() => setCurrentPage(prev => prev + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 bg-gray-200 rounded"
  >
    Next
  </button>



          </div>

        </div>

        {/* 🔥 RIGHT - TRENDING SIDEBAR */}
        <div className="col-span-12 lg:col-span-3">
          <TrendingNews articles={trendingNews} />
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Home;