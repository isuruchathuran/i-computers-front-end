import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingAnimation from '../../components/loadingAnimation';
import toast from 'react-hot-toast';
import { confirmAction } from '../../utils/confirmAction';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleBlockStatus = async (email, currentStatus) => {
        confirmAction({
            title: currentStatus ? "Unblock User?" : "Block User?",
            text: currentStatus ? "Do you want to restore this user's account access?" : "Are you sure you want to block this user?\nThey will no longer be able to access their account until they are unblocked.",
            icon: currentStatus ? "question" : "warning",
            confirmButtonText: currentStatus ? "Yes, Unblock" : "Yes, Block",
            confirmButtonColor: currentStatus ? "#10b981" : "#f97316",
            successTitle: currentStatus ? "User Unblocked" : "User Blocked",
            successText: currentStatus ? "The user can now access the system again." : "The user has been blocked successfully.",
            onConfirm: async () => {
                const token = localStorage.getItem('token');
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/block/${email}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data;
            },
            onSuccess: () => {
                setUsers(users => users.map(u => 
                    u.email === email ? { ...u, isBlocked: !currentStatus } : u
                ));
            }
        });
    };

    const deleteUser = async (email) => {
        confirmAction({
            title: "Delete User?",
            text: "Are you sure you want to permanently delete this user?\nThis action cannot be undone.",
            icon: "warning",
            confirmButtonText: "Yes, Delete",
            confirmButtonColor: "#ef4444",
            successTitle: "Deleted!",
            successText: "The user has been deleted successfully.",
            onConfirm: async () => {
                const token = localStorage.getItem('token');
                await axios.delete(`${import.meta.env.VITE_API_URL}/users/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            },
            onSuccess: () => {
                setUsers(users => users.filter(u => u.email !== email));
            }
        });
    };

    const filteredUsers = users.filter(user => 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="w-full h-full pb-20">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
                <p className="text-gray-400 text-sm">
                    Manage customers and admin accounts.
                </p>
                </div>
            </div>

            <div className="bg-[#111827] rounded-xl shadow-xl border border-[#1f2937] p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <input 
                    type="text"
                    placeholder="Search by name or email..."
                    className="p-3 bg-[#1f2937] border border-[#374151] rounded-lg w-full md:w-96 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <div className="text-gray-400 font-semibold px-4 py-2 bg-[#1f2937] rounded-lg border border-[#374151]">
                    Total Users: <span className="text-white">{filteredUsers.length}</span>
                </div>
            </div>

            <div className="bg-[#111827] rounded-xl shadow-xl border border-[#1f2937] overflow-hidden mb-6 min-h-[500px] flex flex-col">
                {loading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#1f2937] text-gray-300 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 border-b border-[#374151]">Profile</th>
                                    <th className="p-4 border-b border-[#374151]">Name</th>
                                    <th className="p-4 border-b border-[#374151]">Email</th>
                                    <th className="p-4 border-b border-[#374151]">Role</th>
                                    <th className="p-4 border-b border-[#374151]">Status</th>
                                    <th className="p-4 border-b border-[#374151] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1f2937] text-gray-300">
                                {currentUsers.map((user, index) => (
                                    <tr key={index} className="hover:bg-[#1f2937]/50 transition-colors">
                                        <td className="p-4">
                                            {user.profilePic || user.profileImage ? (
                                                <img src={user.profilePic || user.profileImage} alt={user.firstName} className="w-10 h-10 rounded-full object-cover border-2 border-[#374151]" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-[#1f2937] text-[#0ea5e9] flex items-center justify-center font-bold text-lg border border-[#374151]">
                                                    {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 font-bold text-white">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="p-4 text-gray-400">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                user.type === 'admin' || user.role === 'admin' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            }`}>
                                                {user.type === 'admin' || user.role === 'admin' ? 'Admin' : 'Customer'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                user.isBlocked ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            }`}>
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="p-4 flex gap-2 justify-end">
                                            <button 
                                                onClick={() => toggleBlockStatus(user.email, user.isBlocked)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                                                    user.isBlocked ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
                                                }`}
                                            >
                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                            <button 
                                                onClick={() => deleteUser(user.email)}
                                                className="px-3 py-1.5 rounded-lg text-sm font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {currentUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-12 text-center text-gray-500 text-lg">
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-[#111827] border border-[#374151] text-gray-400 disabled:opacity-50 hover:bg-[#1f2937] hover:text-white font-medium transition-colors"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                                currentPage === number 
                                    ? 'bg-[#0ea5e9] text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]' 
                                    : 'bg-[#111827] border border-[#374151] text-gray-400 hover:bg-[#1f2937] hover:text-white'
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-[#111827] border border-[#374151] text-gray-400 disabled:opacity-50 hover:bg-[#1f2937] hover:text-white font-medium transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
