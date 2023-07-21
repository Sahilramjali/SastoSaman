import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {path:'/',element:<Home/>},
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
