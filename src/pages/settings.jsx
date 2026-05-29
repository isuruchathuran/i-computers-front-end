import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import uploadFile from "../utils/mediaUpload";

export default function SettingsPage() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [existingImageUrl, setExistingImageUrl] = useState("")
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // typing states
    const [profileText, setProfileText] = useState("")
    const [securityText, setSecurityText] = useState("")

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token != null) {

            axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setExistingImageUrl(response.data.image)
            }).catch(() => {
                localStorage.removeItem("token")
                window.location.href = "/login"
            })

        } else {
            window.location.href = "/login"
        }

        // 🔥 Typing Effect 1
        const text1 = "Update your personal information and profile picture.";
        let i = 0;
        const interval1 = setInterval(() => {
            setProfileText(text1.slice(0, i));
            i++;
            if (i > text1.length) clearInterval(interval1);
        }, 30);

        // 🔥 Typing Effect 2
        const text2 = "Change your password to keep your account secure.";
        let j = 0;
        const interval2 = setInterval(() => {
            setSecurityText(text2.slice(0, j));
            j++;
            if (j > text2.length) clearInterval(interval2);
        }, 30);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };

    }, []);

    async function updateProfile() {
        const token = localStorage.getItem("token");

        const updatedInfo = {
            firstName,
            lastName,
            image: existingImageUrl
        }

        if (file != null) {
            updatedInfo.image = await uploadFile(file)
        }

        const response = await axios.put(
            import.meta.env.VITE_API_URL + "/users",
            updatedInfo,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )

        localStorage.setItem("token", response.data.token)

        toast.success("Profile updated successfully")
        window.location.reload()
    }

    async function changePassword() {

        if (password !== confirmPassword) {
            toast.error("Password do not match")
            return
        }

        const token = localStorage.getItem("token");

        await axios.post(
            import.meta.env.VITE_API_URL + "/users/update-password",
            { password },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )

        toast.success("Password changed successfully")
        window.location.reload()
    }

    return (
        <div className="w-full h-screen overflow-hidden bg-slate-100 flex justify-center items-center px-6">

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Account Settings */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Account Settings
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {profileText}
                            <span className="animate-pulse">|</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">

                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full h-14 px-5 rounded-xl border border-gray-300 bg-gray-50"
                            placeholder="Enter First Name"
                        />

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full h-14 px-5 rounded-xl border border-gray-300 bg-gray-50"
                            placeholder="Enter Last Name"
                        />

                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full text-sm"
                            />
                        </div>

                        <button
                            onClick={updateProfile}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold"
                        >
                            Update Profile
                        </button>

                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Security Settings
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {securityText}
                            <span className="animate-pulse">|</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-14 px-5 rounded-xl border border-gray-300 bg-gray-50"
                            placeholder="New Password"
                        />

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-14 px-5 rounded-xl border border-gray-300 bg-gray-50"
                            placeholder="Confirm New Password"
                        />

                        <button
                            onClick={changePassword}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold"
                        >
                            Change Password
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}