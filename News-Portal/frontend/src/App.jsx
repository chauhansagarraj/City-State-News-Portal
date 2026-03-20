import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/Home.jsx";
import ArticleDetails from "./pages/ArticleDetails.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProfileComplete from "./pages/ProfileComplete.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
import MyArticles from "./pages/MyArticles.jsx";
// import JournalistDashboard from "./pages/JournalistDashboard.jsx";
import JournalistDashboard from "./pages/JournalistDashboardHome.jsx";
import EditArticle from "./pages/EditArticle.jsx";
// import ViewArticle from "./pages/ViewArticle.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ProtectedRoute><ArticleDetails /></ProtectedRoute>} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/profile/complete" element={<ProtectedRoute><ProfileComplete /></ProtectedRoute>} />
        <Route path="/journalist-dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
        {/* <Route index element={<JournalistDashboard />} /> */}
        <Route path="/articles/create" element={<ProtectedRoute><CreateArticle /></ProtectedRoute>} />
        <Route path="/my-articles" element={<ProtectedRoute><MyArticles /></ProtectedRoute>} />
        <Route path="/journalistDashboard" element={<ProtectedRoute><JournalistDashboard /></ProtectedRoute>} />
        <Route path="/articles/edit/:id" element={<ProtectedRoute><EditArticle /></ProtectedRoute>} />
        {/* <Route path="/articles/view/:id" element={<ProtectedRoute><ViewArticle /></ProtectedRoute>} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;