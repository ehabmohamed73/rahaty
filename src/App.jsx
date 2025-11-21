import React from "react";
import PhoneLoginPage from "./components/auth/login";
import HomePage from "./components/pages/HomePage";
import BookingInday from "./components/pages/bookingInDay";
import ConfirmPayment from "./components/pages/confirmPayment";
import JoinUsPage from "./components/pages/joinUs";
import BookingMonthly from "./components/pages/bookingMonthly";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <PhoneLoginPage /> },
  { path: "/booking-in-day", element: <BookingInday /> },
  { path: "/confirm-payment", element: <ConfirmPayment /> },
  { path: "/join-us", element: <JoinUsPage /> },
  { path: "/booking-monthly", element: <BookingMonthly /> },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
