import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { FaLaptop, FaMouse, FaKeyboard, FaHeadphones, FaMicrochip } from 'react-icons/fa';
import { BsGpuCard } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';
import LoadingAnimation from '../components/loadingAnimation';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch categories from existing backend
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Icon mapper based on category name
    const getCategoryIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('laptop')) return <FaLaptop size={48} />;
        if (lowerName.includes('mouse')) return <FaMouse size={48} />;
        if (lowerName.includes('keyboard')) return <FaKeyboard size={48} />;
        if (lowerName.includes('headset') || lowerName.includes('audio')) return <FaHeadphones size={48} />;
        if (lowerName.includes('gpu') || lowerName.includes('vga')) return <BsGpuCard size={48} />;
        if (lowerName.includes('monitor') || lowerName.includes('display')) return <MdMonitor size={48} />;
        if (lowerName.includes('processor') || lowerName.includes('cpu')) return <FaMicrochip size={48} />;
        return <BiCategory size={48} />;
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-[#0b0f19]">
                <LoadingAnimation />
            </div>
        );
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#0b0f19] text-white py-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#0ea5e9]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-[#8b5cf6]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Browse by <span className="text-[#0ea5e9]">Category</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Find exactly what you're looking for by browsing through our extensive collection of premium tech categories.
                    </p>
                </div>

                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link 
                                to={`/products?category=${encodeURIComponent(category.name)}`} 
                                key={index}
                                className="bg-[#111827] border border-[#1f2937] rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#0ea5e9]/50 hover:bg-[#1f2937]/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="w-24 h-24 rounded-full bg-[#1f2937] flex items-center justify-center text-gray-400 group-hover:text-[#0ea5e9] group-hover:bg-[#0ea5e9]/10 transition-colors mb-6 shadow-inner">
                                    {getCategoryIcon(category.name)}
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#0ea5e9] transition-colors mb-2 capitalize">
                                    {category.name}
                                </h3>
                                <div className="w-8 h-1 bg-[#374151] rounded-full group-hover:w-16 group-hover:bg-[#0ea5e9] transition-all duration-300"></div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#111827] rounded-2xl border border-[#1f2937]">
                        <BiCategory size={64} className="mx-auto text-gray-600 mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">No Categories Found</h2>
                        <p className="text-gray-400">Categories will appear here once they are added by the admin.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
