import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "../store/slices/uiMessageSlice";

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.ui);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-5 py-3 rounded-lg shadow text-white
        ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;