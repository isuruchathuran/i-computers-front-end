import axios from "axios";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import uploadFile from "../utils/mediaUpload";
import { FaUser, FaLock, FaCamera, FaSave, FaShieldAlt } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function SettingsPage() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [existingImageUrl, setExistingImageUrl] = useState("")
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [isPasswordSaving, setIsPasswordSaving] = useState(false)
    const [previewUrl, setPreviewUrl] = useState("")
    const fileInputRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token != null) {
            axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((response) => {
                setFirstName(response.data.firstName || "")
                setLastName(response.data.lastName || "")
                setExistingImageUrl(response.data.image || "")
                setPreviewUrl(response.data.image || "/images/default-profile.png")
            }).catch(() => {
                localStorage.removeItem("token")
                window.location.href = "/login"
            })
        } else {
            window.location.href = "/login"
        }
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
        }
    };

    async function updateProfile() {
        if (!firstName.trim() || !lastName.trim()) {
            toast.error("First name and last name are required");
            return;
        }

        try {
            setIsSaving(true);
            const token = localStorage.getItem("token");
            const updatedInfo = { firstName, lastName, image: existingImageUrl }

            if (file != null) {
                const uploadedUrl = await uploadFile(file);
                updatedInfo.image = uploadedUrl;
            }

            const response = await axios.put(
                import.meta.env.VITE_API_URL + "/users",
                updatedInfo,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            localStorage.setItem("token", response.data.token);
            toast.success("Profile updated successfully", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
            window.location.reload();
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    }

    async function changePassword() {
        if (!password || !confirmPassword) {
            toast.error("Please fill in all password fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            setIsPasswordSaving(true);
            const token = localStorage.getItem("token");

            await axios.post(
                import.meta.env.VITE_API_URL + "/users/update-password",
                { password },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Password changed successfully", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error("Failed to change password");
        } finally {
            setIsPasswordSaving(false);
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#0b0f19] text-white py-10">
            <div className="container mx-auto px-4 max-w-5xl">
                
                {/* Breadcrumb & Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <Link to="/" className="hover:text-[#0ea5e9] transition-colors">Home</Link>
                        <BiChevronRight />
                        <span className="text-[#0ea5e9]">Settings</span>
                    </div>
                    <h1 className="text-4xl font-bold flex items-center gap-3 text-white mb-2">
                        Account Settings
                    </h1>
                    <p className="text-gray-400">Manage your profile information and security preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">

                    {/* Left Column: Personal Info */}
                    <div className="bg-[#111827] rounded-3xl shadow-xl border border-[#1f2937] p-8 flex flex-col h-full relative overflow-hidden group hover:border-[#374151] transition-colors">
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex items-center gap-3 mb-8 border-b border-[#1f2937] pb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
                                <FaUser size={18} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Personal Info</h2>
                        </div>

                        <div className="flex flex-col items-center mb-8">
                            <div className="relative group/avatar cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1f2937] group-hover/avatar:border-[#0ea5e9] transition-colors shadow-2xl bg-[#0b0f19]">
                                    <img 
                                        src={previewUrl} 
                                        alt="Profile Preview" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = '/images/default-profile.png' }}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                    <FaCamera size={24} className="text-white" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#0ea5e9] rounded-full flex items-center justify-center border-4 border-[#111827] shadow-lg">
                                    <FaCamera size={14} className="text-white" />
                                </div>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                            <p className="text-xs text-gray-500 mt-4">Click avatar to upload new picture</p>
                        </div>

                        <div className="space-y-5 flex-1">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full h-14 px-5 rounded-xl border border-[#374151] bg-[#0b0f19] text-white focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full h-14 px-5 rounded-xl border border-[#374151] bg-[#0b0f19] text-white focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>

                        <div className="pt-8 mt-auto border-t border-[#1f2937]">
                            <button
                                onClick={updateProfile}
                                disabled={isSaving}
                                className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSaving ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FaSave size={18} /> Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Security */}
                    <div className="bg-[#111827] rounded-3xl shadow-xl border border-[#1f2937] p-8 flex flex-col h-full relative overflow-hidden group hover:border-[#374151] transition-colors">
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex items-center gap-3 mb-8 border-b border-[#1f2937] pb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                                <FaShieldAlt size={18} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Security</h2>
                        </div>

                        <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-5 mb-8">
                            <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                <FaLock /> Password Requirements
                            </h3>
                            <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5 marker:text-purple-500/50">
                                <li>Must be at least 6 characters long</li>
                                <li>Use a mix of letters, numbers, and symbols for better security</li>
                                <li>Do not use personal information</li>
                            </ul>
                        </div>

                        <div className="space-y-5 flex-1">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 px-5 rounded-xl border border-[#374151] bg-[#0b0f19] text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full h-14 px-5 rounded-xl border border-[#374151] bg-[#0b0f19] text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>

                        <div className="pt-8 mt-auto border-t border-[#1f2937]">
                            <button
                                onClick={changePassword}
                                disabled={isPasswordSaving || !password || !confirmPassword}
                                className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isPasswordSaving ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FaLock size={16} /> Update Password
                                    </>
                                )}
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}