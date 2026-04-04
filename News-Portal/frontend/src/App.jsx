import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
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
import ChangePassword from "./pages/ChangePassword.jsx";
import ReaderDashboardLayout from "./components/ReaderDashboardLayout.jsx";
import ReaderHome from "./pages/ReaderDashboardHome.jsx";
import Profile from "./pages/ProfileReader.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
import MyCampaigns from "./pages/MyCampaigns.jsx";
import AdvertiserDashboardLayout from "./components/AdvertiserDashboardLayout.jsx";
import AdvertiserDashboardHome from "./pages/AdvertiserDashboardHome.jsx";
import SingleCampaignAnalytics from "./components/SingleCampaignAnalytics.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import AdminDashboardHome from "./pages/AdminDashboardHome.jsx";
import AdminManageUsers from "./pages/AdminManageUsers.jsx";
import AdminManageArticles from "./pages/AdminManageArticles.jsx";
import AdminManageComments from "./pages/AdminManagesComments.jsx";
import AdminManageCampaigns from "./pages/AdminManageCampaigns.jsx";
import AdminRevenue from "./pages/AdminRevenue.jsx";
import TopCampaigns from "./pages/AdminTopCampaign.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import "./indec.css"
import Toast from "./components/Toast.jsx";

function App() {

  return (
    <BrowserRouter>
      <Toast />

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ProtectedRoute><ArticleDetails /></ProtectedRoute>} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/profile/complete" element={<ProtectedRoute><ProfileComplete /></ProtectedRoute>} />
        <Route path="/auth/change-password" element={<ChangePassword />} />
          <Route path="/about" element={<AboutUs />} />
       <Route
  path="/journalist"
  element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
>
  <Route index element={<JournalistDashboard />} />
  <Route path="articles/create" element={<CreateArticle />} />
  <Route path="articles/edit/:id" element={<EditArticle />} />
  <Route path="my-articles" element={<MyArticles />} />
</Route>
        <Route
          path="/reader"
          element={<ProtectedRoute><ReaderDashboardLayout /></ProtectedRoute>}
        >
          <Route index element={<ReaderHome />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/advertiser"
          element={<ProtectedRoute><AdvertiserDashboardLayout /></ProtectedRoute>}
        >
          <Route index element={<AdvertiserDashboardHome />} />
          <Route path="campaign/create" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
          <Route path="campaign/my" element={<ProtectedRoute><MyCampaigns /></ProtectedRoute>} />
          <Route path="campaign-analytics/:id" element={<ProtectedRoute><SingleCampaignAnalytics /></ProtectedRoute>} />
        </Route>

        <Route
          path="/admin"
          element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="manage-users" element={<AdminManageUsers />} />
          <Route path="manage-articles" element={<AdminManageArticles />} />
          <Route path="manage-comments" element={<AdminManageComments />} />
          <Route path="manage-campaigns" element={<AdminManageCampaigns />} />
          <Route path="manage-revenue" element={<AdminRevenue />} />
          <Route path="top-campaigns/revenue" element={<TopCampaigns />} />
          {/* <Route path="dashboard" element={<AdminDashboardHome />} /> */}
        </Route>
      </Routes>


    </BrowserRouter>
  );
}

export default App;