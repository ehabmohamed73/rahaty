import React from "react";
import PhoneLoginPage from "./components/auth/login";
import HomePage from "./components/pages/HomePage";
import BookingInday from "./components/pages/bookingInDay";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <PhoneLoginPage /> },
  { path: "/booking-in-day", element: <BookingInday /> },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
