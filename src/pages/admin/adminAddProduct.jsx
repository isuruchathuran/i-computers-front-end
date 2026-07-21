import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function AdminAddProductPage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("Others");
    const [brand, setBrand] = useState("Generic");
    const [model, setModel] = useState("");
    const [qty, setQty] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [files, setFiles] = useState([]);
    
    // Dynamic specifications
    const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);

    const navigate = useNavigate();

    const handleAddSpecification = () => {
        setSpecifications([...specifications, { key: "", value: "" }]);
    };

    const handleRemoveSpecification = (index) => {
        const newSpecs = [...specifications];
        newSpecs.splice(index, 1);
        setSpecifications(newSpecs);
    };

    const handleSpecificationChange = (index, field, value) => {
        const newSpecs = [...specifications];
        newSpecs[index][field] = value;
        setSpecifications(newSpecs);
    };

    async function handleAddProduct() {
        try {
            const token = localStorage.getItem("token");

            if (token == null) {
                toast.error("You must be logged in to add a product");
                window.location.href = "/login";
                return;
            }

            const fileUploadPromises = [];

            for (let i = 0; i < files.length; i++) {
                fileUploadPromises[i] = uploadFile(files[i])
            }

            const imageURLs = await Promise.all(fileUploadPromises);

            // Filter out empty specifications
            const validSpecs = specifications.filter(spec => spec.key.trim() !== "" && spec.value.trim() !== "");

            await axios.post(import.meta.env.VITE_API_URL + "/products", {
                name: name,
                description: description,
                price: Number(price),
                labeledPrice: Number(labelledPrice),
                altNames: altNames ? altNames.split(",").map(n => n.trim()) : [],
                images: imageURLs,
                category: category,
                brand: brand,
                model: model,
                qty: Number(qty) || 0,
                specifications: validSpecs,
                isVisible: Boolean(isVisible),
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            toast.success("Product added successfully")
            navigate("/admin/products");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to add product");
            return;
        }
    }

    return (
        <div className="w-full bg-[#111827] rounded-xl border border-[#1f2937] p-6 text-white mb-10">
            <h1 className="text-2xl font-bold mb-6 pb-4 border-b border-[#1f2937] text-[#0ea5e9]">
                Add New Product
            </h1>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Product Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Gaming Laptop" className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Description *</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description..." className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors min-h-[120px]" />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Images</label>
                <label className="border-2 border-dashed border-[#374151] hover:border-[#0ea5e9] bg-[#1f2937] rounded-xl h-32 flex flex-col justify-center items-center cursor-pointer transition-colors group">
                    <span className="text-gray-400 group-hover:text-[#0ea5e9] transition-colors">Click or Drag & Drop Images Here</span>
                    <span className="text-xs text-gray-500 mt-2">({files.length} files selected)</span>
                    <input multiple type="file" onChange={(e) => setFiles(e.target.files)} className="hidden" />
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Alternative Names</label>
                    <input value={altNames} onChange={(e) => setAltNames(e.target.value)} placeholder="Comma separated" className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Price *</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Labelled Price (Optional)</label>
                    <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors">
                        <option value="Others">Others</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Desktops">Desktops</option>
                        <option value="Components">Components</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Peripherals">Peripherals</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Brand</label>
                    <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors">
                        <option value="Generic">Generic</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value="Acer">Acer</option>
                        <option value="Apple">Apple</option>
                        <option value="MSI">MSI</option>
                        <option value="Samsung">Samsung</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Model</label>
                    <input value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Quantity in Stock</label>
                    <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                </div>
            </div>

            {/* Specifications Section */}
            <div className="mb-8 border border-[#374151] rounded-xl p-4 bg-[#0b0f19]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Specifications</h3>
                    <button type="button" onClick={handleAddSpecification} className="flex items-center gap-2 text-sm bg-[#1f2937] hover:bg-[#374151] px-3 py-1.5 rounded-lg transition-colors text-[#0ea5e9]">
                        <FaPlus size={12} /> Add Spec
                    </button>
                </div>
                
                {specifications.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">No specifications added yet.</p>
                )}

                <div className="space-y-3">
                    {specifications.map((spec, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <input 
                                type="text" 
                                placeholder="Key (e.g. RAM, Storage)" 
                                value={spec.key} 
                                onChange={(e) => handleSpecificationChange(index, "key", e.target.value)} 
                                className="w-1/3 bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0ea5e9] text-sm" 
                            />
                            <input 
                                type="text" 
                                placeholder="Value (e.g. 16GB, 512GB SSD)" 
                                value={spec.value} 
                                onChange={(e) => handleSpecificationChange(index, "value", e.target.value)} 
                                className="flex-1 bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#0ea5e9] text-sm" 
                            />
                            <button type="button" onClick={() => handleRemoveSpecification(index)} className="text-red-400 hover:text-red-500 p-2 bg-[#1f2937] hover:bg-red-500/10 rounded-lg transition-colors">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#1f2937]">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-400">Product Visibility:</label>
                    <select value={isVisible} onChange={(e) => setIsVisible(e.target.value === "true" || e.target.value === true)} className="bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#0ea5e9] text-sm">
                        <option value={true}>Visible</option>
                        <option value={false}>Hidden</option>
                    </select>
                </div>
                
                <div className="flex gap-4">
                    <button onClick={() => navigate("/admin/products")} className="px-6 py-2.5 rounded-lg border border-[#374151] text-gray-300 hover:bg-[#374151] transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleAddProduct} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    )
}