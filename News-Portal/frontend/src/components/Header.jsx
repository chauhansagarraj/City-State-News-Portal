import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Header = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const today = new Date().toDateString();

  return (
    <header className="bg-gray-900 text-white py-3 px-6 flex justify-between items-center">

      <div className="text-xl font-bold">
        CityState News
      </div>

      <div className="text-sm">
        {today}
      </div>

      <div>

        {user ? (
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-600 px-4 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-3">

            <a href="/login" className="hover:underline">
              Login
            </a>

            <a href="/register" className="hover:underline">
              Register
            </a>

          </div>
        )}

      </div>

    </header>
  );
};

export default Header;