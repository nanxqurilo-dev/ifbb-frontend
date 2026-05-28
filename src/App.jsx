import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Course from "./pages/Course";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Certficates from "./pages/Certficates";
import News from "./pages/News";
import ContactUs from "./pages/ContactUs";
import CourseDetail from "./pages/CourseDetail";
import PurchaseCourse from "./pages/PurchaseCourse";

// Auth
import Login from "./Auth/Login";
import ForgetPassword from "./Auth/ForgetPassword";
import VerifyOtp from "./Auth/VerifyOtp";
import Signup from "./Auth/Signup";
import PaymentSuccess from "./pages/PaymentSuccess";
import { AuthProvider } from "./Auth/AuthContext";
import { Toaster } from "sonner";

/* ================= ROUTER ================= */
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/VerifyOtp" element={<VerifyOtp />} />
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="course" element={<Course />} />
        <Route path="purchasecourse" element={<PurchaseCourse />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="certificates" element={<Certficates />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="coursedetail/:id" element={<CourseDetail />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
            404 - Page Not Found
          </div>
        }
      />
    </>
  )
);

/* ================= APP ================= */
const App = () => {
  return (
    <AuthProvider>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;