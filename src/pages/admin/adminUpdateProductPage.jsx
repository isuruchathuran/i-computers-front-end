import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminUpdateProductPage() {

    const location = useLocation();
    const navigate = useNavigate();

    
    const state = location.state || {};

    const [productId, setProductId] = useState(state.productId || "");
    const [name, setName] = useState(state.name || "");
    const [description, setDescription] = useState(state.description || "");
    const [altNames, setAltNames] = useState(state.altNames ? state.altNames.join(",") : "");
    const [price, setPrice] = useState(state.price || "");
    const [labelledPrice, setLabelledPrice] = useState(state.labeledPrice || "");
    const [category, setCategory] = useState(state.category || "Others");
    const [brand, setBrand] = useState(state.brand || "Generic");
    const [model, setModel] = useState(state.model || "");
    const [isVisible, setIsVisible] = useState(state.isVisible ?? true);
    const [files, setFiles] = useState([]);

    async function handleUpdateProduct() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("You must be logged in");
                navigate("/login");
                return;
            }

           
            const fileUploadPromises = Array.from(files).map(file => uploadFile(file));
            let imageURLs = await Promise.all(fileUploadPromises);

            if (imageURLs.length === 0) {
                imageURLs = state.images || [];
            }

            await axios.put(
                import.meta.env.VITE_API_URL + "/products/" + productId,
                {
                    name,
                    description,
                    price: Number(price),
                    labeledPrice: Number(labelledPrice),
                    altNames: altNames ? altNames.split(",").map(n => n.trim()) : [],
                    images: imageURLs,
                    category,
                    brand,
                    model,
                    isVisible
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            toast.success("Product updated successfully");
            navigate("/admin/products");

        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update product");
        }
    }

    return (
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track">

            
            <h1 className="w-full text-3xl font-bold mb-4 sticky top-0 text-white p-3 rounded-lg"
                style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}>
                Edit Product
            </h1>

            
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Product ID</label>
                <input value={productId} disabled className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2" />
            </div>

           
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Product Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2" />
            </div>

            
            <div className="w-full h-[170px] flex flex-col">
                <label className="font-bold ml-2">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border-4 border-accent rounded-[10px] h-[100px] p-2 m-2" />
            </div>

            
            <div className="w-full h-[140px] flex flex-col justify-center">
                <label className="font-bold ml-2 mb-1">Images</label>

                <label className="border-2 border-dashed border-accent rounded-xl h-[90px] m-2 flex flex-col justify-center items-center cursor-pointer hover:bg-accent/10 transition">
                    <span className="text-gray-600 text-sm">Click or Drag & Drop Images Here</span>
                    <span className="text-xs text-gray-400 mt-1">(Multiple files allowed)</span>

                    <input
                        multiple
                        type="file"
                        onChange={(e) => setFiles(e.target.files)}
                        className="hidden"
                    />
                </label>
            </div>

            
            <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold ml-2">Alternative Names</label>
                <input value={altNames} onChange={(e) => setAltNames(e.target.value)} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2" />
            </div>

            
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2" />
            </div>

            
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Labelled Price</label>
                <input value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2" />
            </div>

            
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Categories</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2">
                    <option value="Others">Others</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Peripherals">Peripherals</option>
                </select>
            </div>

            
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Brand</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2">
                    <option value="Generic">Generic</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Asus">Asus</option>
                    <option value="Acer">Acer</option>
                    <option value="Apple">Apple</option>
                </select>
            </div>

            
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Model</label>
                <input value={model} onChange={(e) => setModel(e.target.value)} className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2" />
            </div>

            
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold ml-2">Is Visible</label>
                <select
                    value={isVisible}
                    onChange={(e) => setIsVisible(e.target.value === "true")}
                    className="border-4 border-accent rounded-[10px] h-[50px] p-2 m-2"
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            
            <div className="w-full h-[80px] bg-white sticky bottom-0 rounded-b-2xl flex justify-end items-center p-4 gap-4">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="bg-gray-500 text-white font-bold px-6 py-3 rounded-[10px] hover:bg-gray-600"
                >
                    Cancel
                </button>

                <button
                    onClick={handleUpdateProduct}
                    className="bg-accent text-white font-bold px-6 py-3 rounded-[10px] hover:bg-secondary"
                >
                    Update Product
                </button>
            </div>

        </div>
    );
}