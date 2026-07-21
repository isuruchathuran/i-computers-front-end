import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function CheckoutDetailsModal(props) {

    const [isVisible, setIsVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("Please login to continue checkout");
            navigate("/login");
            
        }

        axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
            }
        ).catch(
            () => {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
        )
    }, []);

    const cart = props.cart;

    
    async function placeOrder() {

        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must be logged in to place an order");
            window.location.href = "/login";
            return;
        }


        const order = {
            firstName: firstName,
            lastName: lastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            phone: phone,
            country: "Sri Lanka",
            items: [],
            
        }
        cart.forEach(
            (item) => {
                order.items.push({
                    productId: item.product.productId,
                    qty: item.qty
                })
            }
        )

        

        try {

            await axios.post(import.meta.env.VITE_API_URL + "/orders", order, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Order Placed successfully..");
            window.location.href = "/";
            


        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to place the order. Please try agen.");
            return;
        }

    }


    return (
        <>
            <button className="bg-accent text-white px-4 py-2 rounded ml-5 hover:bg-blue-600"

                onClick={() => {
                    setIsVisible(true);
                }}
            >
                Buy now
            </button>

            {isVisible && <div className="w-full h-full bg-black/80 backdrop-blur-sm fixed z-[9999] top-0 left-0 flex justify-center items-center px-4 overflow-hidden text-left">
                
                <div className="w-[480px] max-w-full bg-white rounded-3xl shadow-2xl p-8 relative flex flex-col max-h-[90vh]">

                    
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400"></div>

                    
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-red-500 hover:bg-red-500 hover:text-white hover:rotate-90 transition-all duration-300 text-lg font-bold"
                    >
                        ✕
                    </button>

                    
                    <div className="text-center mb-7 mt-2">

                        
                        <div className="w-16 h-16 mx-auto rounded-full bg-blue-300 flex items-center justify-center text-white text-2xl shadow-lg mb-4">
                            🛒
                        </div>

                        <h1 className="text-3xl font-bold text-blue-600">
                            Fill in your Details
                        </h1>

                        <p className="text-gray-500 text-sm mt-2">
                            Fill in your information below
                        </p>
                    </div>

                    
                    <div className="flex flex-col gap-4 overflow-y-auto hide-scroll-track pr-2 pb-4">

                        
                        <div className="flex gap-3">
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                placeholder="First Name"
                                className="w-1/2 h-[50px] rounded-2xl border border-gray-200 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                            />

                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                                placeholder="Last Name"
                                className="w-1/2 h-[50px] rounded-2xl border border-gray-200 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-400 outline-none transition-all duration-300"
                            />
                        </div>

                        
                        <input
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            type="text"
                            placeholder="Address Line 1"
                            className="w-full h-[50px] rounded-2xl border border-gray-200 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                        />

                        <input
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            type="text"
                            placeholder="Address Line 2"
                            className="w-full h-[50px] rounded-2xl border border-gray-200 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-400 outline-none transition-all duration-300"
                        />

                        
                        <div className="flex gap-3">
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                placeholder="City"
                                className="w-1/2 h-[50px] rounded-2xl border border-gray-200 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                            />

                            <input
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                type="text"
                                placeholder="Postal Code"
                                className="w-1/2 h-[50px] rounded-2xl border border-gray-200 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sky-400 outline-none transition-all duration-300"
                            />
                        </div>

                        
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="Phone Number"
                            className="w-full h-[50px] rounded-2xl border border-gray-200 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-300"
                        />

                        
                        <button onClick={placeOrder} className="mt-3 h-[54px] rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
                            Confirm 
                        </button>
                    </div>
                </div>
            </div>}

        </>
    );
}
