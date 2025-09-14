import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/myApplications/MyApplications";
import AddJob from "../pages/addJob/AddJob";
import MyPostedJobs from "../pages/myPostedJobs/MyPostedJobs";
import ViewApplication from "../pages/ViewApplications/ViewApplication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route not Found</h2>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/jobs/:id',
        element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/jobs/${params.id}`)
      },
      {
        path: '/jobApply/:id',
        element: <PrivateRoute><JobApply></JobApply></PrivateRoute>
      },
      {
        path:'/myApplications',
        element:<PrivateRoute><MyApplications></MyApplications></PrivateRoute>
        },
        {
          path:'/myPostedJobs',
          element:<PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
        },
      {
        path:'/addJob',
        element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
        },
        {
          path:'/viewApplications/:job_id',
          element:<PrivateRoute><ViewApplication></ViewApplication></PrivateRoute>,
          loader:({params}) => fetch(`http://localhost:3000/job-application/jobs/${params.job_id}`)
        },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      }
    ]
  },
]);

export default router;