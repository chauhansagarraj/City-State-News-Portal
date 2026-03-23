// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { searchArticles, filterArticles } from "../store/slices/articleSlice";
// import { Link } from "react-router-dom";

// const Navbar = () => {

//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();

//   // SEARCH
//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (!query.trim()) return;

//     dispatch(searchArticles(query));
//   };


//   return (
//     <nav className="bg-red-600 text-white">

//       <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 py-3">

//         <Link to="/" className="font-semibold hover:underline">
//           Home
//         </Link>

//         <button
//           onClick={() => handleCategory("State")}
//           className="hover:underline"
//         >
//           State News
//         </button>

//         <button
//           onClick={() => handleCategory("City")}
//           className="hover:underline"
//         >
//           City News
//         </button>

//        <Link to="/category/Politics">Politics</Link>
// <Link to="/category/Business">Business</Link>
// <Link to="/category/Sports">Sports</Link>
// <Link to="/category/Technology">Technology</Link>

//         {/* SEARCH */}
//         <form onSubmit={handleSearch} className="flex gap-2 ml-auto">

//           <input
//             type="text"
//             placeholder="Search news..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="px-3 py-1 text-black rounded"
//           />

//           <button
//             type="submit"
//             className="bg-black px-3 py-1 rounded"
//           >
//             Search
//           </button>

//         </form>

//       </div>

//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchArticles } from "../store/slices/articleSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    dispatch(searchArticles(query));
  };

  return (
    <nav className="bg-red-600 text-white relative">
      <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 py-3">
        {/* Logo / Home */}
        <Link to="/" className="font-semibold hover:underline">
          Home
        </Link>

        {/* Category Links */}
        <button className="hover:underline">State News</button>
        <button className="hover:underline">City News</button>
        <Link to="/category/Politics">Politics</Link>
        <Link to="/category/Business">Business</Link>
        <Link to="/category/Sports">Sports</Link>
        <Link to="/category/Technology">Technology</Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 ml-auto">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1 text-black rounded"
          />
          <button type="submit" className="bg-black px-3 py-1 rounded">
            Search
          </button>
        </form>

        {/* Hamburger menu */}
        {loggedInUser && (
          <button
            onClick={() => setMenuOpen(true)}
            className="ml-4 text-3xl"
          >
            ☰
          </button>
        )}
      </div>

      {/* Overlay Menu */}
      {menuOpen && (
        <div className="fixed top-26 right-6 bg-white text-black w-60 p-4 rounded-lg shadow-lg z-50 text-1xl">          <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 text-1.5xl font-bold"
        >
          ✖
        </button>

          <div className="flex flex-col gap-6 text-1.5xl">
            <Link
              to="/profile/complete"
              className="hover:text-red-400"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
 <Link
                to="/auth/changePassword"
                className="hover:text-red-400"
                onClick={() => setMenuOpen(false)}
              >
              Change Password
            </Link>

            {loggedInUser.role === "reader" && (
              <Link
                to="/reader"
                className="hover:text-red-400"
                onClick={() => setMenuOpen(false)}
              >
              Dashboard
            </Link>
)}

            {/* Journalist Links */}
            {loggedInUser.role === "journalist" && (
              <>
                <Link
                  to="articles/create"
                  className="hover:text-red-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Article
                </Link>
                <Link
                  to="my-articles"
                  className="hover:text-red-400"
                  onClick={() => setMenuOpen(false)}
                >
                  My Articles
                </Link>
                <Link
                  to="/journalistDashboard"
                  className="hover:text-red-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* Advertiser Links */}
            {loggedInUser.role === "advertiser" && (
              <>
                <Link
                  to="/create-campaign"
                  className="hover:text-red-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Campaign
                </Link>
                <Link
                  to="/my-campaigns"
                  className="hover:text-red-400"
                  onClick={() => setMenuOpen(false)}
                >
                  My Campaigns
                </Link>
                 <Link
                  to="/my-campaings"
                  className="hover:text-red-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* <button
              className="text-red-500 hover:text-red-400 text-2xl mt-4"
              onClick={() => {
                setMenuOpen(false);
                // dispatch logout action here
              }}
            >
              Logout
            </button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;