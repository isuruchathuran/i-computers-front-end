import axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import DeleteModal from "../../components/deleteModal";
import LoadingAnimation from "../../components/loadingAnimation";
import toast from "react-hot-toast";
import getFormattedPrice from "../../utils/price-format";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");

      axios
        .get(import.meta.env.VITE_API_URL + "/products", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load products");
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <div className="w-full h-full pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400 text-sm">
            Manage your product inventory, prices, and visibility.
          </p>
        </div>
        <Link
          to="/admin/add-product"
          className="flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold px-4 py-2 rounded-lg transition-colors shadow-[0_0_10px_rgba(14,165,233,0.3)]"
        >
          <FaPlus /> Add New
        </Link>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#1f2937] overflow-hidden shadow-xl">
        {loading ? (
          <div className="w-full min-h-[300px] flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#1f2937] text-gray-300 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold border-b border-[#374151]">Image</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#374151]">Product Details</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#374151]">Category / Brand</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#374151]">Pricing</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#374151]">Stock</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#374151]">Status</th>
                  <th className="px-6 py-4 font-semibold border-b border-[#374151] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937] text-gray-300">
                {products.map((item) => (
                  <tr key={item.productId} className="hover:bg-[#1f2937]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-16 bg-white rounded-lg p-1 flex justify-center items-center overflow-hidden">
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/64'}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <p className="text-xs text-[#0ea5e9] font-mono font-bold mb-1">{item.productCode}</p>
                      <p className="font-bold text-white line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.model}</p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-[#374151] text-[#0ea5e9] rounded text-xs font-medium mr-2">
                        {item.category || 'N/A'}
                      </span>
                      <p className="text-xs text-gray-400 mt-2">{item.brand || 'Generic'}</p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-bold text-[#0ea5e9]">{getFormattedPrice(item.price)}</p>
                      {item.labeledPrice > item.price && (
                        <p className="text-xs text-gray-500 line-through">{getFormattedPrice(item.labeledPrice)}</p>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${item.qty > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {item.qty || 0} in stock
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${item.isVisible ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'}`}>
                        {item.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end items-center gap-3">
                        <Link
                          to="/admin/update-product"
                          state={item}
                          className="p-2 text-gray-400 hover:text-[#0ea5e9] hover:bg-[#374151] rounded-lg transition-colors"
                        >
                          <RiEdit2Fill size={18} />
                        </Link>
                        <DeleteModal product={item} setLoading={setLoading} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
