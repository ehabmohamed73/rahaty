import React from "react";
import PhoneLoginPage from "./components/auth/login";
import HomePage from "./components/pages/HomePage";
import BookingInday from "./components/pages/bookingInDay";
import ConfirmPayment from "./components/pages/confirmPayment";
import JoinUsPage from "./components/pages/joinUs";
import BookingMonthly from "./components/pages/bookingMonthly";
import HospitalityBooking from "./components/pages/hospitalityBooking";
import ProfilePage from "./components/pages/profile";
import ConfirmPhonePage from "./components/auth/bookingWithNonRegister";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OTPPage from "./components/auth/OtpPage";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <PhoneLoginPage /> },
  { path: "/booking-in-day", element: <BookingInday /> },
  { path: "/confirm-payment", element: <ConfirmPayment /> },
  { path: "/confirm-phone", element: <ConfirmPhonePage /> },
  { path: "/otp", element: <OTPPage /> },
  { path: "/join-us", element: <JoinUsPage /> },
  // { path: "/booking-monthly", element: <BookingMonthly /> },
  { path: "/hospitality-booking", element: <HospitalityBooking /> },
  { path: "/profile", element: <ProfilePage /> },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
