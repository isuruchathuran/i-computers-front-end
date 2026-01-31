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

    const [ count , setCount ] = useState(0);
    const [ products , setProducts ] = useState(sampleProducts);

    return(
        <div className="w-full h-full overflow-y-scroll">
                {
                  products.map(
                      (item , index)=>{

                          return <h1 key={item.productId} >{item.name}</h1>

                      }
                  )
                }
            <Link to="/admin/add-product"className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-3xl rounded-[20px] hover:rounded-full fixed bottom-10 right-16">        
                <FaPlus />
            </Link>
        </div>
    )
}


