import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import ProductCard from "../components/productCard"
import LoadingAnimation from "../components/loadingAnimation"
import { FaSearch, FaFilter } from "react-icons/fa"

export default function ProductPage(){

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    
    const searchQuery = searchParams.get("search") || ""
    const categoryQuery = searchParams.get("category") || ""
    
    const [localSearch, setLocalSearch] = useState(searchQuery)

    const categories = ["All", "Laptops", "Desktops", "Components", "Accessories", "Peripherals"]

    useEffect(() => {
        setLocalSearch(searchQuery)
    }, [searchQuery])

    useEffect(
        ()=>{
            setLoading(true)

            let url = import.meta.env.VITE_API_URL + "/products"
            if(searchQuery){
                url = import.meta.env.VITE_API_URL + "/products/search?q=" + encodeURIComponent(searchQuery)
            }

            axios.get(url)
            .then(
                (response)=>{
                    let fetchedProducts = response.data
                    
                    if(categoryQuery && categoryQuery !== "All"){
                        fetchedProducts = fetchedProducts.filter(p => p.category === categoryQuery)
                    }

                    setProducts(fetchedProducts)
                    setLoading(false)
                }
            ).catch(
                ()=>{
                    toast.error("Failed to fetch products. Please try again.")
                    setLoading(false)
                }
            )
        },[searchQuery, categoryQuery]
    )

    function handleSearch(e){
        e.preventDefault()
        const newParams = new URLSearchParams(searchParams)
        if(localSearch.trim()){
            newParams.set("search", localSearch)
        } else {
            newParams.delete("search")
        }
        setSearchParams(newParams)
    }

    function clearSearch(){
        setLocalSearch("")
        const newParams = new URLSearchParams(searchParams)
        newParams.delete("search")
        setSearchParams(newParams)
    }

    function handleCategoryClick(cat) {
        const newParams = new URLSearchParams(searchParams)
        if(cat === "All"){
            newParams.delete("category")
        } else {
            newParams.set("category", cat)
        }
        setSearchParams(newParams)
    }

    return(
        <div className="w-full min-h-[60vh] bg-[#0b0f19] text-white p-4 md:p-8 flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 sticky top-24">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-[#1f2937] pb-3">
                        <FaFilter className="text-[#0ea5e9]"/> Filters
                    </h3>
                    
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-300 mb-3 uppercase text-sm tracking-wider">Categories</h4>
                        <div className="flex flex-col gap-2">
                            {categories.map((cat, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleCategoryClick(cat)}
                                    className={`text-left px-3 py-2 rounded-lg transition-colors ${
                                        (categoryQuery === cat || (cat === "All" && !categoryQuery)) 
                                        ? "bg-[#0ea5e9]/20 text-[#0ea5e9] font-medium border border-[#0ea5e9]/50" 
                                        : "text-gray-400 hover:text-white hover:bg-[#1f2937] border border-transparent"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Search Bar */}
                <div className="w-full mb-8">
                    <form onSubmit={handleSearch} className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search products by name, category, brand..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className="w-full py-3 pl-4 pr-10 rounded-xl border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] bg-[#111827] text-white shadow-sm transition-all"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0ea5e9] transition-colors">
                                <FaSearch size={18}/>
                            </button>
                        </div>
                    </form>

                    {(searchQuery || categoryQuery) && (
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-400 bg-[#111827] p-3 rounded-lg border border-[#1f2937]">
                            <span>Results for: </span>
                            
                            {searchQuery && (
                                <span className="bg-[#1f2937] px-3 py-1 rounded-full text-white border border-[#374151]">
                                    Search: <strong className="text-[#0ea5e9]">"{searchQuery}"</strong>
                                </span>
                            )}

                            {categoryQuery && (
                                <span className="bg-[#1f2937] px-3 py-1 rounded-full text-white border border-[#374151]">
                                    Category: <strong className="text-[#0ea5e9]">{categoryQuery}</strong>
                                </span>
                            )}

                            <button onClick={() => setSearchParams({})} className="ml-auto text-red-400 hover:text-red-500 font-medium cursor-pointer transition-colors">
                                Clear All Filters
                            </button>
                            <span className="text-gray-500 border-l border-[#374151] pl-3">{products.length} product(s) found</span>
                        </div>
                    )}
                </div>

                {/* Products Grid */}
                <div className="flex justify-center md:justify-start items-center flex-wrap gap-4">
                    {loading && (
                        <div className="w-full flex justify-center py-20">
                            <LoadingAnimation/>
                        </div>
                    )}
                    
                    {
                        !loading && products.length === 0 && (
                            <div className="w-full flex flex-col items-center justify-center py-20 text-gray-500 bg-[#111827] rounded-xl border border-[#1f2937]">
                                <FaSearch size={48} className="mb-4 opacity-30"/>
                                <h2 className="text-2xl font-bold mb-2 text-white">No products found</h2>
                                <p className="mb-6">We couldn't find any products matching your current filters.</p>
                                <button onClick={() => setSearchParams({})} className="px-6 py-2 bg-[#0ea5e9] text-white font-medium rounded-lg hover:bg-[#0284c7] transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                                    Browse All Products
                                </button>
                            </div>
                        )
                    }
                    {
                        !loading && products.map(
                            (item)=>{
                                return(
                                    <ProductCard product={item} key={item.productId}/>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}