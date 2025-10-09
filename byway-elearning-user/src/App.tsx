import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Courses } from "./pages/Courses";
import { CourseDetail } from "./pages/CourseDetail";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Checkout } from "./pages/Checkout";
import { PurchaseComplete } from "./pages/PurchaseComplete";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-detail/:id" element={<CourseDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/purchase-complete" element={<PurchaseComplete />} />
      </Routes>
    </BrowserRouter>
  );
}