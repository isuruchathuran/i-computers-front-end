import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutDetailsModal(props) {

    const [isVisible, setIsVisible] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");

    const cart = props.cart;

    async function placeOrder() {

        const token = localStorage.getItem("token");

        if (token == null) {

            toast.error("You need to be logged in to place an order");
            window.location.href = "/login";
            return;
        }

        const order = {

            firstName: firstName,
            lastName: lastName,

            addressLine1: addressLine1,
            addressLine2: addressLine2,

            city: city,

            Country: "Sri Lanka",

            postalCode: postalCode,

            phone: phone,

            items: []
        };

        cart.forEach((item) => {

            order.items.push({

                productId: item.product.productId,

                qty: item.qty
            });

        });

        console.log(order);

        try {

            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/orders",
                order
            );

            console.log(response.data);

            toast.success("Order placed successfully");

        } catch (error) {

            console.error(error);

            toast.error("Order failed");
        }
    }

    return (
        <>
            {/* Buy Button */}
            <button
                onClick={() => setIsVisible(true)}
                className="bg-accent text-white px-6 py-3 rounded-2xl shadow-xl hover:scale-105 hover:shadow-blue-500/50 transition duration-300 ml-5 font-bold"
            >
                Buy Now
            </button>

            {/* Modal */}
            {isVisible && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center p-4">

                    <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl bg-white">

                        {/* Top Gradient Header */}
                        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 p-6 relative">

                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-5 text-white text-3xl hover:text-red-300"
                            >
                                ✕
                            </button>

                            <h1 className="text-4xl font-extrabold text-white text-center">
                                Checkout Details
                            </h1>

                            <p className="text-blue-100 text-center mt-2">
                                Fill your delivery information below
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 bg-gradient-to-b from-white to-blue-50">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="border-2 border-blue-200 rounded-2xl py-3 px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                    placeholder="First Name"
                                />

                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="border-2 border-blue-200 rounded-2xl py-3 px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                    placeholder="Last Name"
                                />

                                <input
                                    value={addressLine1}
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                    className="md:col-span-2 border-2 border-blue-200 rounded-2xl py-3 px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                    placeholder="Address Line 1"
                                />

                                <input
                                    value={addressLine2}
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                    className="md:col-span-2 border-2 border-blue-200 rounded-2xl py-3 px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                    placeholder="Address Line 2"
                                />

                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="border-2 border-blue-200 rounded-2xl py-3 px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                    placeholder="City"
                                />

                                <input
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="border-2 border-blue-200 rounded-2xl py-3 px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                    placeholder="Postal Code"
                                />

                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="md:col-span-2 border-2 border-blue-200 rounded-2xl py-3 px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                    placeholder="Phone Number"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 mt-8">

                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="w-1/2 py-3 rounded-2xl border-2 border-blue-300 text-blue-700 font-semibold hover:bg-blue-100 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={placeOrder}
                                    className="w-1/2 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-blue-500/50 transition duration-300"
                                >
                                    Confirm
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}