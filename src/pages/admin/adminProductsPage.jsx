import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const sampleProducts = [
  {
    productId: "P001",
    name: "Dell Inspiron 15",
    description: "A reliable laptop for students and office work.",
    altNames: ["Dell Laptop", "Inspiron", "Student Laptop"],
    price: 185000,
    labeledPrice: 200000,
    category: "Laptops",
    images: ["/images/dell-1.png", "/images/dell-2.png"],
    isVisible: true,
    brand: "Dell",
    model: "Inspiron 15"
  },

  {
    productId: "P002",
    name: "HP Pavilion 14",
    description: "Lightweight laptop suitable for everyday use.",
    altNames: ["HP Laptop", "Pavilion", "Portable Laptop"],
    price: 210000,
    labeledPrice: 225000,
    category: "Laptops",
    images: ["/images/hp-1.png", "/images/hp-2.png"],
    isVisible: true,
    brand: "HP",
    model: "Pavilion 14"
  },

  {
    productId: "P003",
    name: "Lenovo ThinkPad X1",
    description: "High-performance laptop designed for professionals.",
    altNames: ["ThinkPad", "Business Laptop"],
    price: 320000,
    labeledPrice: 350000,
    category: "Laptops",
    images: ["/images/lenovo-1.png", "/images/lenovo-2.png"],
    isVisible: true,
    brand: "Lenovo",
    model: "ThinkPad X1"
  },

  {
    productId: "P004",
    name: "Logitech Wireless Mouse",
    description: "Ergonomic wireless mouse for smooth navigation.",
    altNames: ["Wireless Mouse", "Logitech Mouse"],
    price: 4500,
    labeledPrice: 5500,
    category: "Accessories",
    images: ["/images/mouse-1.png", "/images/mouse-2.png"],
    isVisible: true,
    brand: "Logitech",
    model: "M185"
  },

  {
    productId: "P005",
    name: "Samsung 24-inch Monitor",
    description: "Full HD monitor ideal for work and entertainment.",
    altNames: ["Samsung Monitor", "LED Monitor"],
    price: 68000,
    labeledPrice: 75000,
    category: "Peripherals",
    images: ["/images/monitor-1.png", "/images/monitor-2.png"],
    isVisible: true,
    brand: "Samsung",
    model: "LS24"
  }];

export default function AdminProductsPage(){

    
    const [ products , setProducts ] = useState(sampleProducts);

    return(
        <div className="w-full h-full overflow-y-scroll">

          {
                /*
                products.map(
                  (item , index)=>{
                    return <h1 key={item.productId} >{item.name}</h1>
                  }
                )
                */
          }

                
<div className="overflow-x-auto rounded-xl shadow-lg border border-[var(--color-primary)] bg-white">
  <table className="min-w-full text-sm text-[var(--color-secondary)]">
    
    <thead>
      <tr style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Product ID</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Name</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Price</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Labeled Price</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Category</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Image</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Status</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Brand</th>
        <th className="px-4 py-3 text-left text-white uppercase text-xs tracking-wide font-semibold">Model</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-[var(--color-primary)]">
      {
        products.map((item) => {
          return (
            <tr 
              key={item.productId}
              className="hover:bg-[var(--color-primary)] transition"
            >
              <td className="px-4 py-3 font-medium">{item.productId}</td>
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3 font-semibold text-[var(--color-accent)]">
                Rs. {item.price}
              </td>
              <td className="px-4 py-3 line-through text-gray-400">
                Rs. {item.labeledPrice}
              </td>
              <td className="px-4 py-3 capitalize">{item.category}</td>
              <td className="px-4 py-3">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                  loading="lazy"
                />
              </td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 text-xs rounded-full font-semibold
                  ${item.isVisible 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"}
                `}>
                  {item.isVisible ? "Visible" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3">{item.brand}</td>
              <td className="px-4 py-3">{item.model}</td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
</div>



                
            <Link to="/admin/add-product"className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-3xl rounded-[20px] hover:rounded-full fixed bottom-10 right-16">        
                <FaPlus />
            </Link>
        </div>
    )
}


