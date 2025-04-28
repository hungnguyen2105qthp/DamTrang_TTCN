import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Careers from "./pages/Careers";
import WarrantyCenter from "./pages/WarrantyCenter";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CartProvider from "./contexts/CartContext";
import PromoProducts from "./pages/PromoProducts";
import OrdersAdmin from "./components/OrdersAdmin";
import CustomersAdmin from "./components/CustomersAdmin";
import ProductsAdmin from "./components/ProductsAdmin";
import { ProductProvider } from "./contexts/ProductContext";
import AdminLayout from "./components/AdminLayout";
import Promotions from "./pages/Promotions";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import Policies from "./pages/Policies";

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="news" element={<News />} />
            <Route path="careers" element={<Careers />} />
            <Route path="warranty" element={<WarrantyCenter />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="promo/:promoType" element={<PromoProducts />} />

            <Route path="/policies" element={<Policies />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/promotions" element={<Promotions />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="dashboard" element={<Admin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="customers" element={<CustomersAdmin />} />
          </Route>
        </Routes>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
