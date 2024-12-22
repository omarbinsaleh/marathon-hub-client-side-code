import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import AddMarathon from "../pages/AddMarathon";
import MyMarathonList from "../pages/MyMarathonList";
import MyApplyList from "../pages/MyApplyList";

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
            path: '/dashboard',
            element: <Dashboard></Dashboard>,
            children: [
               {
                  path: '/dashboard/add-marathon',
                  element: <AddMarathon></AddMarathon>
               },
               {
                  path: '/dashboard/my-marathons-list',
                  element: <MyMarathonList></MyMarathonList>
               },
               {
                  path: '/dashboard/my-apply-list',
                  element: <MyApplyList></MyApplyList>
               }
            ]
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
