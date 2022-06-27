import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AddProduct from "./Components/Home/AddProduct";
import Home from "./Components/Home/Home";
import ManageProduct from "./Components/Home/ManageProduct/ManageProduct";
import UpdateProduct from "./Components/Home/ManageProduct/UpdateProduct";
import Navbar from "./Components/Home/Navbar";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Login from "./Components/Register/Login";
import Reset from "./Components/Register/Reset";
import SignUp from "./Components/Register/SignUp";
import UpdateProfile from "./Components/Register/UpdateProfile";
import RequireAuth from "./Components/RequireAuth/RequireAuth";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route
          path="/add-product"
          element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }
        />
        <Route
          path="/manage-product"
          element={
            <RequireAuth>
              <ManageProduct />
            </RequireAuth>
          }
        />
        <Route path="/manage-product/:id" element={<UpdateProduct />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
