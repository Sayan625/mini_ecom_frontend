import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLogout() {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const deleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    localStorage.removeItem("user");
  };

  // useEffect(() => {
  //   const savedUser = JSON.parse(localStorage.getItem("user"));
  //   if (savedUser != null){
  //     setUser(savedUser)
  //   }
  //   else
  //     navigate("/login");
  // }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border border-light p-0">
      <div className="container-fluid p-0">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item border-end border-light">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item border-end border-lights">
              <a className="nav-link" href="/explore">Products</a>
            </li>
            {user?.role == "ADMIN" && <>
              <li className="nav-item border-end border-lights">
                <a className="nav-link" href="/admin">Admin</a>
              </li>
            </>}

            {/* User Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <span className="bg-secondary rounded-circle d-flex justify-content-center align-items-center" style={{ width: 32, height: 32 }}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="dropdown-item-text fw">
                  {user?.name || "Guest"}
                </li>
                <li><hr className="dropdown-divider" /></li>

                <li>
                  {user ? <button className="dropdown-item" onClick={onLogout}>
                    Logout
                  </button> :
                    <a className="dropdown-item" href="/login">Login</a>

                  }

                </li>
                {user &&
                  <>
                    <li>
                      <a className="dropdown-item" href="/profile">Profile</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/orders">Orders</a>
                    </li>
                  </>
                }

              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
