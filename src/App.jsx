import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ExplorePage from "./pages/ExplorePage";
import SellItemPage from "./pages/SellItemPage";
import AboutPage from "./pages/AboutPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditProfilePage from './pages/EditProfilePage';
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import CartSidebar from "./components/CartSidebar";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <CartSidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/item/:itemId" element={<ItemDetailPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/sell" element={<SellItemPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster richColors position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
