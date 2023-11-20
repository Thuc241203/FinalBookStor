import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import LayoutClient from "./layouts/LayoutClient";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/products/ProductManagement";
import PrivateRouter from "./components/PrivateRouter";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import CategoriesManager from "./pages/admin/categories/CategoriesManager";
import UpdateCategory from "./pages/admin/categories/UpdateCategory";
import Account from "./pages/auth/Account";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateUser from "./pages/auth/UpdateUser";
import OrderPage from "./pages/OrderPage";
import MyOrder from "./pages/Order/MyOrder";
import ProfileManager from "./pages/admin/profile/ProfileManager";
import Products from "./pages/Products";
import OderList from "./pages/admin/order/List";
import EditOrder from "./pages/admin/order/Edit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="">
        <LayoutClient />
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "update-user", element: <UpdateUser /> },
      { path: "my-order", element: <MyOrder /> },
      { path: "books/:slug/detail", element: <ProductDetail /> },
      { path: "order", element: <OrderPage /> },
      { path: "account", element: <Account /> },
      { path: "books", element: <Products /> },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRouter />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <ProductManagement />,
          },
          {
            path: "products/:id/edit",
            element: <UpdateProduct />,
          },
          {
            path: "categories",
            element: <CategoriesManager />,
          },
          {
            path: "categories/:id/edit",
            element: <UpdateCategory />,
          },
          {
            path: "order",
            element: <OderList />,
          },
          {
            path: "order/update/:id",
            element: <EditOrder />,
          },
          {
            path: "profile",
            element: <ProfileManager />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
