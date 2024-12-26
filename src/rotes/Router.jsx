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
import PrivateRoutes from "./PrivateRoutes";
import Profile from "../pages/Profile";
import DashboardHome from "../pages/DashboardHome";
import AllMarathons from "../pages/AllMarathons";
import MarathonDetails from "../pages/MarathonDetails";
import UpdateMarathon from "../pages/UpdateMarathon";
import MarathonRegister from "../pages/MarathonRegister";
import UpdateMyApplication from "../pages/UpdateMyApplication";

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
            element: (
               <PrivateRoutes>
                  <Dashboard></Dashboard>
               </PrivateRoutes>
            ),
            children: [
               {
                  index: true,
                  element: <DashboardHome></DashboardHome>
               },
               {
                  path: '/dashboard/add-marathon',
                  element: (
                     <PrivateRoutes>
                        <AddMarathon></AddMarathon>
                     </PrivateRoutes>
                  ),
               },
               {
                  path: '/dashboard/my-marathons-list',
                  element: (
                     <PrivateRoutes>
                        <MyMarathonList></MyMarathonList>
                     </PrivateRoutes>
                  ),
               },
               {
                  path: '/dashboard/my-marathons-list/update/:marathonId',
                  element: (
                     <PrivateRoutes>
                        <UpdateMarathon></UpdateMarathon>
                     </PrivateRoutes>
                  ),
               },
               {
                  path: '/dashboard/my-apply-list',
                  element: (
                     <PrivateRoutes>
                        <MyApplyList></MyApplyList>
                     </PrivateRoutes>
                  ),
               },
               {
                  path: '/dashboard/my-applications/update/:applicationId',
                  element: (
                     <PrivateRoutes>
                        <UpdateMyApplication></UpdateMyApplication>
                     </PrivateRoutes>
                  ),
               },
               {
                  path: '/dashboard/profile',
                  element: (
                     <PrivateRoutes>
                        <Profile></Profile>
                     </PrivateRoutes>
                  ),
               }
            ]
         },
         {
            path: '/marathons',
            element: (
               <PrivateRoutes>
                  <AllMarathons></AllMarathons>
               </PrivateRoutes>
            )
         },
         {
            path: '/marathons/:marathonId',
            element: (
               <PrivateRoutes>
                  <MarathonDetails></MarathonDetails>
               </PrivateRoutes>
            )
         },
         {
            path: '/marathons/register/:marathonId',
            element: (
               <PrivateRoutes>
                  <MarathonRegister></MarathonRegister>
               </PrivateRoutes>
            )
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
