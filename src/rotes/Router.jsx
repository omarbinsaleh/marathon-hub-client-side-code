import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout></MainLayout>,
      children: [
         {
            path: '/',
            element: <Home></Home>,
            loader: () => fetch('https://unity-fund-server.vercel.app/campaigns')
         },
         {
            path: '/auth/login',
            element: <Login></Login>
         },
         {
            path: '/auth/register',
            element: <Register></Register>
         }
      ]
   },
   {
      path: '*',
      element: <ErrorPage></ErrorPage>
   }
])

export default router;
