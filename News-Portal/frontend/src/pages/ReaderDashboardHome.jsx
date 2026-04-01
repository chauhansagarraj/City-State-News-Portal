import { useEffect , useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReaderDashboard } from "../store/slices/readerSlice"
import { Link } from "react-router-dom"

const ReaderHome = () => {
const [likedVisible, setLikedVisible] = useState(3);
const [savedVisible, setSavedVisible] = useState(3);
  const dispatch = useDispatch()
  const { recommended, likedArticles,savedArticles ,comments, activitySummary } =
    useSelector(state => state.reader)

  useEffect(() => {
    dispatch(getReaderDashboard())
  }, [dispatch])

  return (
    <div className="space-y-10">

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-xl shadow">
          <h3 className="text-sm">Total Likes</h3>
          <p className="text-3xl font-bold">{activitySummary?.totalLikes}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-xl shadow">
          <h3 className="text-sm">Total Comments</h3>
          <p className="text-3xl font-bold">{activitySummary?.totalComments}</p>
        </div>

      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">📍 Recommended</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended?.map(a => (
            <div
              key={a._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <img
                src={a.images?.[0]}
                alt=""
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">
                  {a.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {a.city}, {a.state}
                </p>

                <p className="text-xs text-gray-400 mb-3">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>

                <Link
                  to={`/article/${a._id}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

     <div>
  <h2 className="text-2xl font-semibold mb-4">❤️ Liked Articles</h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {likedArticles?.slice(0, likedVisible).map((a) => (
      <div
        key={a._id}
        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={a.images?.[0]}
          alt=""
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">
            {a.title}
          </h3>

          <p className="text-sm text-gray-500 mb-2">
            {a.city}, {a.state}
          </p>

          <Link
            to={`/article/${a._id}`}
            className="text-red-500 font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    ))}
  </div>

  {/*  Show More / Show Less OUTSIDE map */}
 <div className="mt-4 text-center">
  {likedVisible < likedArticles?.length ? (
    <button
      onClick={() => setLikedVisible((prev) => prev + 3)}
      className="text-red-500 font-semibold hover:underline"
    >
      Show More →
    </button>
  ) : likedVisible > 3 ? (
    <button
      onClick={() => setLikedVisible(3)}
      className="text-red-800 font-semibold hover:underline"
    >
      Show Less
    </button>
  ) : null}
</div>
</div>

<div>
  <h2 className="text-2xl font-semibold mb-4">🔖 Saved Articles</h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {!savedArticles || savedArticles.length === 0 ? (
      <p className="text-gray-500">No saved articles yet</p>
    ) : (
      savedArticles.slice(0, savedVisible).map((a) => (
        <div
          key={a._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={a.images?.[0]}
            alt=""
            className="w-full h-40 object-cover"
          />

          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">
              {a.title}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              {a.city}, {a.state}
            </p>

            <p className="text-xs text-gray-400 mb-3">
              {new Date(a.createdAt).toLocaleDateString()}
            </p>

            <Link
              to={`/article/${a._id}`}
              className="text-green-600 font-semibold hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))
    )}

  </div>

  {/*  Show More / Show Less OUTSIDE grid */}
  <div className="mt-4 text-center">
    {savedArticles?.length > savedVisible && (
      <button
        onClick={() => setSavedVisible(prev => prev + 3)}
        className="text-red-500 font-semibold hover:underline"
      >
        Show More →
      </button>
    )}

    {savedVisible > 3 && (
      <button
        onClick={() => setSavedVisible(3)}
        className="ml-4 text-red-500 font-semibold hover:underline"
      >
        Show Less
      </button>
    )}
  </div>
</div>

      {/*  Comments */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">💬 Your Comments</h2>

        <div className="space-y-4">
          {comments?.map(c => (
            <div
              key={c._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >

              <h3 className="font-semibold text-gray-800">
                📰 {c.article?.title}
              </h3>

              <p className="text-gray-600 mt-2 italic">
                "{c.content}"
              </p>

              

              <div className="flex justify-between items-center mt-3">

                <span className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>

                <Link
                  to={`/article/${c.article?._id}`}
                  className="text-blue-500 text-sm hover:underline"
                >
                  View Article →
                </Link>

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ReaderHome