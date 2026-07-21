import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import ProductCard from "../components/productCard"
import LoadingAnimation from "../components/loadingAnimation"
import { FaSearch } from "react-icons/fa"

export default function ProductPage(){

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get("search") || ""
    const [localSearch, setLocalSearch] = useState(searchQuery)

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
                    setProducts(response.data)
                    setLoading(false)
                }
            ).catch(
                ()=>{
                    toast.error("Failed to fetch products. Please try again.")
                    setLoading(false)
                }
            )
        },[searchQuery]
    )

    function handleSearch(e){
        e.preventDefault()
        if(localSearch.trim()){
            setSearchParams({ search: localSearch })
        } else {
            setSearchParams({})
        }
    }

    function clearSearch(){
        setLocalSearch("")
        setSearchParams({})
    }

    return(
        <div className="w-full min-h-[60vh] p-4 md:p-8">
            {/* Search & Filter Bar */}
            <div className="max-w-4xl mx-auto mb-8">
                <form onSubmit={handleSearch} className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search products by name, category, brand..."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            className="w-full py-3 pl-4 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent bg-white text-secondary shadow-sm"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors">
                            <FaSearch />
                        </button>
                    </div>
                </form>

                {searchQuery && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                        <span>Showing results for: <strong className="text-secondary">"{searchQuery}"</strong></span>
                        <button onClick={clearSearch} className="ml-2 text-red-500 hover:text-red-700 font-medium cursor-pointer">
                            Clear Search
                        </button>
                        <span className="ml-auto text-gray-500">{products.length} product(s) found</span>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className="flex justify-center items-center flex-wrap">
                {loading && <LoadingAnimation/>}
                {
                    !loading && products.length === 0 && (
                        <div className="text-center py-16 text-gray-500">
                            <FaSearch size={48} className="mx-auto mb-4 opacity-30"/>
                            <h2 className="text-xl font-semibold mb-2">No products found</h2>
                            <p>Try a different search term or browse our categories.</p>
                            {searchQuery && (
                                <button onClick={clearSearch} className="mt-4 px-6 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    View All Products
                                </button>
                            )}
                        </div>
                    )
                }
                {
                    products.map(
                        (item)=>{
                            return(
                                <ProductCard product={item} key={item.productId}/>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}