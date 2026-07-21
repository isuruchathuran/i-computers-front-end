import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settings";
import HomeContent from "./homeContent";
import AboutContent from "./aboutContent";
import ContactContent from "./contactContent";
import CategoriesPage from "./categories";
import ProtectedRoute from "../components/ProtectedRoute";

export default function HomePage(){
    return(
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<HomeContent />} />
                    <Route path="/about" element={<AboutContent />} />
                    <Route path="/contact" element={<ContactContent />} />
                    
                    {/* Categories */}
                    <Route path="/categories" element={<CategoriesPage />} />
                    
                    {/* products */}
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/overview/:productId" element={<Overview/>} />
                    
                    {/* Protected Customer Routes */}
                    <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/my-orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    
                    <Route path="/*" element={
                        <div className="w-full h-[60vh] flex flex-col justify-center items-center text-white">
                            <h1 className="text-6xl font-bold text-[#0ea5e9] mb-4">404</h1>
                            <p className="text-xl text-gray-400">Page Not Found</p>
                        </div>
                    } />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}