import { Route, Router, Routes } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductPage from "./productPage";
import overview from "./overview";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settings";
import HomeContent from "./homeContent";
import AboutContent from "./aboutContent";
import ContactContent from "./contactContent";

export default function HomePage(){
    return(
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<HomeContent />} />
                    <Route path="/about" element={<AboutContent />} />
                    <Route path="/contact" element={<ContactContent />} />
                    {/* products */}
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/overview/:productId" element={<Overview/>} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/my-orders" element={<MyOrdersPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/*" element={<div>404 Not Found</div>} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}