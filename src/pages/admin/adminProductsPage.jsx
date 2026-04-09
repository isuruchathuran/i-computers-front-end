import axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteModal from "../../components/deleteModal";
import LoadingAnimation from "../../components/loadingAnimation";

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
    <div className="w-full h-full overflow-y-scroll hide-scroll-track">
      <h1
        className="w-full text-3xl font-bold mb-4 sticky top-0 text-white p-3 rounded-lg"
        style={{
          background:
            "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)",
        }}
      >
        Products
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-[var(--color-primary)] bg-white">

        {loading ? (
          <div className="w-full min-h-[300px] flex justify-center items-center bg-white rounded-xl">
            <LoadingAnimation />
          </div>
        ) : (
          <table className="min-w-full text-sm text-[var(--color-secondary)]">
            <thead>
              <tr
                style={{
                  background:
                    "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)",
                }}
              >
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Product ID
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Labeled Price
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Brand
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Model
                </th>
                <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--color-primary)]">
              {products.map((item) => {
                return (
                  <tr
                    key={item.productId}
                    className="hover:bg-[var(--color-primary)] transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {item.productId}
                    </td>
                    <td className="px-4 py-3">{item.name}</td>

                    <td className="px-4 py-3 font-semibold text-[var(--color-accent)]">
                      LKR{" "}
                      {Number(item.price).toLocaleString("en-LK", {
                        minimumFractionDigits: 2,
                      })}
                    </td>

                    <td className="px-4 py-3 line-through text-gray-400">
                      LKR{" "}
                      {Number(item.labeledPrice).toLocaleString("en-LK", {
                        minimumFractionDigits: 2,
                      })}
                    </td>

                    <td className="px-4 py-3 capitalize">
                      {item.category}
                    </td>

                    <td className="px-4 py-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border"
                        loading="lazy"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold ${
                          item.isVisible
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-4 py-3">{item.brand}</td>
                    <td className="px-4 py-3">{item.model}</td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center items-center text-2xl gap-2">
                        <Link
                          to="/admin/update-product"
                          state={item}
                          className="hover:text-accent"
                        >
                          <RiEdit2Fill />
                        </Link>
                        <DeleteModal product={item} setLoading={setLoading} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Link
        to="/admin/add-product"
        className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-3xl rounded-[20px] hover:rounded-full fixed bottom-10 right-16"
      >
        <FaPlus />
      </Link>
    </div>
  );
}
