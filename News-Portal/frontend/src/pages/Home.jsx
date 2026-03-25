import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/slices/articleSlice";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TrendingNews from "../components/TrendingNews";
import BreakingNews from "../components/BreakingNews";
import NewsCard from "../components/NewsCard";
import Footer from "../components/Footer";
import CategoryFilter from "../components/CategoryFilter";
import AdCard from "../components/AdCard";
import { getActiveAds } from "../store/slices/adSlice";

const Home = () => {

  const dispatch = useDispatch();

  const { articles, loading, error, allArticles } = useSelector(
    (state) => state.articles
  );
  const { ads } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(getActiveAds());
  }, [dispatch]);

  // BREAKING NEWS (latest)
  const breakingNews = [...allArticles]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // TRENDING NEWS (most viewed)
  const trendingNews = [...allArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <>
      <Header />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-6">

        {/* Trending Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <TrendingNews articles={trendingNews} />
        </div>

        {/* Latest News */}
        <div className="col-span-12 md:col-span-6">

          <h2 className="text-2xl font-bold mb-6">
            Latest News
          </h2>

          <CategoryFilter />

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-6">
            {articles.map((article, index) => (
              <div key={article._id}>

                <NewsCard article={article} />

                {/* ✅ SHOW AD AFTER EVERY 2 ARTICLES (MAX 2 ADS) */}
                {index % 2 === 1 && index < 4 && ads.length > 0 && (
                  <AdCard ad={ads[index % ads.length]} />
                )}

              </div>
            ))}
          </div>

        </div>

        {/* Breaking Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <BreakingNews articles={breakingNews} />
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Home;