const BASE_URL = "http://localhost:8080/api"
const API = {
  products: {
    create: BASE_URL + "/admin/products",
    get: BASE_URL + "/products",
    update: BASE_URL + "/admin/products",
  },
  category: {
    get: BASE_URL + "/categories",
    create: BASE_URL + "/admin/categories"
  },
  cart: {
    get: BASE_URL + "/user/cart",
    create: BASE_URL + "/user/cart/add",
    remove: BASE_URL + "/user/cart/remove"
  },
  user: {
    register: BASE_URL + "/register",
    login: BASE_URL + "/login",
    update: BASE_URL + "/user"
  },
  order: {
    get: BASE_URL + "/user/orders",
    checkout: BASE_URL + "/user/orders/checkout"

  },
  admin: {
    register: BASE_URL + "/adminregister",
    login: BASE_URL + "/adminlogin",
    update: BASE_URL + "/admin"
  }
};

export default API;
