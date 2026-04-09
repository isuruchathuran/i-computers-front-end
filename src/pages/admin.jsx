import { Link, Route, Routes } from "react-router-dom";
import { FaListUl, FaRegListAlt } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProduct";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";

export default function AdminPage(){
    return(
        <div className="w-full h-full border-4  flex bg-accent">
            <div className="w-[300px] h-full flex flex-col bg-accent text-white">
                    <h1 className="text-3xl font-bold p-5 border-b-4 border-white">Admin Panel</h1>
                    <Link className="flex w-full p-[10px] gap-3 items-center hover:bg-white hover:text-accent transition-colors duration-700" to="/admin/"><FaRegListAlt/>Orders</Link>
                    <Link className="flex w-full p-[10px] gap-3 items-center hover:bg-white hover:text-accent transition-colors duration-700" to="/admin/products"><MdOutlineInventory2/>Products</Link>
                    <Link className="flex w-full p-[10px] gap-3 items-center hover:bg-white hover:text-accent transition-colors duration-700" to="/admin/users"><LuUsersRound/>Users</Link>    

            </div>


            <div className="w-[calc(100%-300px)] h-full border-8 border-accent rounded-[20px] bg-primary p-4">
                <Routes>
                    <Route path="/" element={<h1>Oders Page</h1>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/users" element={<h1>Users Page</h1>}/>
                    <Route path="/add-product" element={<AdminAddProductPage/>}/>
                    <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
                </Routes>
            </div>
         </div>
    )
}

//instead of w-[calc(100%-300px)], you can use Flex 1