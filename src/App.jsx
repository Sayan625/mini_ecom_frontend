import { Routes, Route } from "react-router-dom";
import './App.css'
import AddProduct from './pages/Addproduct.jsx'
import ShopView from './pages/ViewProduct.jsx'
import Register from './pages/RegisterUser.jsx'
import Login from "./pages/Login.jsx";
import MainLayout from "./component/Mainlayout.jsx";
import OrdersPage from "./pages/OrderPage.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./component/ProtectedRoutes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "./config.js";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "./store/cartSlice";
import { setProductPage } from "./store/productSlice.js";
import { useEffect } from "react";
import AdminOrdersPage from "./pages/AdminOrderPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const {
    page

  } = useSelector(state => state.product);

  async function fetchProducts() {
    try {
      const res = await fetch(API.products.get + `?page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      dispatch(setProductPage({
        content: data.content,
        page: data.number,
        size: data.size,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      }));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }
    async function fetchCart() {
    if (!user) return;
    try {
      const res = await fetch(API.cart.get + "/" + user.id, {
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      dispatch(setCart(data));
      console.log(data)
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page])

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/explore" element={<ShopView fetchCart={fetchCart} />} />
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute role={"ADMIN"} />}>
            <Route path="/admin" element={<AddProduct fetchProducts={fetchProducts} />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login fetchCart={fetchCart}/>} />


      </Routes>
    </>
  )
}

export default App
