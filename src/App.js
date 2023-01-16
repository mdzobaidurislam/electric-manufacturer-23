import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import Navbar from "./components/Share/Navbar/Navbar";
import Purchase from "./components/Purchase/Purchase";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Dashboard from "./components/Dashboard/Content/Dashboard";
import Layout from "./components/Dashboard/Layout/Layout";
import MangeBlog from "./components/Dashboard/Content/Blog/MangeBlog";
import MyOrders from "./components/Dashboard/Content/MyOrders/MyOrders";
import AddReview from "./components/Dashboard/Content/Review/AddReview";
import Profile from "./components/Dashboard/Content/Profile/Profile";
import MyPament from "./components/Dashboard/Content/MyOrders/MyPament";
import ManageProduct from "./components/Dashboard/Content/Product/ManageProduct";
import AddProduct from "./components/Dashboard/Content/Product/AddProduct";
import MangeUser from "./components/Dashboard/Content/User/MangeUser";
import NotFound from "./components/NotFound/NotFound";
import AdminOrders from "./components/Dashboard/Content/AdminOrder/AdminOrders";
import MyPortfolio from "./components/Home/MyPortfolio";
import Blog from "./components/Blog/Blog";
import SingleBlog from "./components/Blog/SingleBlog";
import FooterCopy from "./components/Share/Footer/FooterCopy";
import Footer from "./components/Share/Footer/Footer";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import RequireAdmin from "./components/RequireAuth/RequireAdmin";
import RequireUser from "./components/RequireAuth/RequireUser";
import Review from "./components/Review/Review";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<Review reviews={true} />} />
        <Route path="protfolio" element={<MyPortfolio />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<SingleBlog />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="payment/:id" element={<MyPament />} />
          <Route path="Profile" element={<Profile />} />
          <Route
            path="blog"
            element={
              <RequireUser>
                <MangeBlog />
              </RequireUser>
            }
          />
          <Route path="orders" element={<MyOrders />} />
          <Route path="add-review" element={<AddReview />} />
          {/* admin  */}
          <Route
            path="manage-product"
            element={
              <RequireAdmin>
                <ManageProduct />
              </RequireAdmin>
            }
          />
          <Route path="manage-order" element={<AdminOrders />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-user" element={<MangeUser />} />

          <Route path="/dashboard" index element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
      <FooterCopy />
    </>
  );
}

export default App;
