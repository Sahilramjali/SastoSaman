import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {path:'/',element:<Home/>},
      { path: "/login", element: <Login /> }],
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
