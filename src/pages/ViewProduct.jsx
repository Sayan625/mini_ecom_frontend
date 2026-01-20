import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "../component/ProductCard";
import API from "../config";
import CartItem from "../component/CartItem";
import LoginModal from "../component/loginModal";
import Pagination from "../component/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../store/productSlice";
import { setCart, clearCart } from "../store/cartSlice";

export default function ShopView() {
  const dispatch=useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector(state => state.cart.cart);

  const {
    products
  } = useSelector(state => state.product);

  async function fetchCategory() {
    try {
      const res = await fetch(API.category.get);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setCategory(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }



  async function addToCart(id, quantity = 1) {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      const res = await fetch(API.cart.create + `/${user.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: id,
          qty: quantity
        })
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      dispatch(setCart(data));
      console.log(data)
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  async function removeFromCart(id) {

    try {
      const res = await fetch(API.cart.remove + `/${user.id}?cartItemId= ${id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      dispatchEvent(setCart(data));
      console.log(data)
    } catch (err) {
      console.error("Error fetching products:", err);
    }

  }

  async function Checkout() {
    if (!user) return;

    try {
      const res = await fetch(API.order.checkout + `/${user.id}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      await res.json();
      alert("checked out successfully")
      dispatch(clearCart(null));
    } catch (err) {
      console.error("Error fetching products:", err);
    }


  }

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    // fetchCart()
    if (user && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [user])


  return (
    <div className="container-fluid h-100 text-white">
      <div className="row h-100">

        <div className="col-9 h-100">
          <div className="card bg-dark border-light h-100 p-3 rounded-0 d-flex flex-column pb-0">

            <h4 className="mb-2 text-white">Products</h4>

            {/* Search + Filter */}
            <div className="d-flex gap-2 mb-2">
              {/* <input
                className="form-control"
                placeholder="Search product"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              <select
                className="form-select"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="">-- Select Category --</option>
                {category.map((item, index) => (

                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select> */}
            </div>

            {products.length === 0 ? (
              <p className="text-white">No products found.</p>
            ) : (
              <div className="flex-grow-1 overflow-y-auto overflow-x-hidden">
                <div className="row g-1">
                  {products.map(p => (
                    <div key={p.id} className="col-12 col-md-6 col-lg-4">
                      <ProductCard
                        product={p}
                        admin={false}
                        addToCart={addToCart}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Pagination slice="product" setPageAction={setPage} />
          </div>
        </div>

        {/* RIGHT: CART */}
        <div className="col-3 h-100">
          <div className="card bg-dark border-light h-100 p-3 rounded-0">
            <h4 className="mb-3 text-white">Cart</h4>
            {!user ? (
              <div className="text-center mt-4 text-white">
                🔐 Please login to view cart
              </div>
            ) : cart?.items?.length > 0 ? (
              <>
                <div className="flex-grow-1 overflow-auto">
                  {cart.items.map((item, index) => (
                    <CartItem
                      key={index}
                      cartItem={item}
                      removeFromCart={removeFromCart}
                      addToCart={addToCart}
                    />
                  ))}
                </div>

                <div className="fw-bold text-end text-white">
                  Total: ₹{cart.value}
                </div>

                <button className="btn btn-success w-100 mt-2" onClick={Checkout}>
                  Checkout
                </button>
              </>
            ) : (
              <div className="text-center mt-4 text-white">
                🛒 Cart is empty
              </div>
            )}


          </div>
        </div>

      </div>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        path={"/explore"}
      />

    </div>
  );
}
