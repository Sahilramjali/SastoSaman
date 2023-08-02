import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Test from "./pages/test";
import Cart from "./pages/cart/Cart";

import { useCookies } from "react-cookie";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getCookieStorage } from "./redux/userSlice";
import CategoryProduct from "./pages/Category/CategoryProduct";
import ProductDetail from "./pages/Product/ProductDetail";
import CheckoutSuccess from "./pages/cart/CheckoutSuccess";

function App() {

  const dispatch = useAppDispatch();

  const [cookies, ,] = useCookies(["user"]);
 
    console.log(cookies.user);
    if (cookies.user) {
      const username = cookies.user.username;
      const id = cookies.user.id;
      const token = cookies.user.token;
      dispatch(getCookieStorage({ username, id, token }));
    }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/test", element: <Test /> },
        { path: "/cart", element: <Cart /> },
        {path:"/checkout-success", element:<CheckoutSuccess/>},
        {path:'/CategoryProduct/:category',element:<CategoryProduct/>},
        {path:'/productDetails/:id',element:<ProductDetail/>},
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
