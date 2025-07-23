import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';
import ExplorePage from './pages/ExplorePage';
import SellItemPage from './pages/SellItemPage';
import AboutPage from './pages/AboutPage';
import UserProfilePage from './pages/UserProfilePage';
import CheckoutPage from './pages/CheckoutPage'; // <-- Impor halaman checkout
import ConfirmationPage from './pages/ConfirmationPage'; // <-- Impor halaman konfirmasi
import CartSidebar from './components/CartSidebar';
import { Toaster } from "@/components/ui/sonner"
import './index.css';

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
            <Route path="/item/:itemId" element={<ItemDetailPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/sell" element={<SellItemPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> {/* <-- Rute untuk checkout */}
            <Route path="/confirmation" element={<ConfirmationPage />} /> {/* <-- Rute untuk konfirmasi */}
          </Routes>
        </main>
        <Footer />
        <Toaster richColors position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
