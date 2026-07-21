import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingAnimation from '../../components/loadingAnimation';
import toast from 'react-hot-toast';

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
        if (!window.confirm(`Are you sure you want to ${currentStatus ? 'unblock' : 'block'} this user?`)) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/block/${email}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            toast.success(response.data.message || `User successfully ${currentStatus ? 'unblocked' : 'blocked'}`);
            
            // Update UI
            setUsers(users.map(u => 
                u.email === email ? { ...u, isBlocked: response.data.isBlocked !== undefined ? response.data.isBlocked : !currentStatus } : u
            ));
        } catch (error) {
            toast.error("Failed to update user status");
            console.error(error);
        }
    };

    const deleteUser = async (email) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            toast.success("User deleted successfully");
            setUsers(users.filter(u => u.email !== email));
        } catch (error) {
            toast.error("Failed to delete user");
            console.error(error);
        }
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

    if (loading) {
        return <LoadingAnimation />;
    }

    return (
        <div className="w-full h-full flex flex-col hide-scroll-track overflow-y-auto">
            <div className="w-full p-6 text-white rounded-xl mb-6 shadow-md" style={{ background: 'linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)' }}>
                <h1 className="text-3xl font-bold">Users</h1>
                <p className="text-white/80 mt-1">Manage customers and admin users</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <input 
                    type="text"
                    placeholder="Search by name or email..."
                    className="p-2 border border-gray-300 rounded-lg w-full md:w-96 focus:outline-none focus:border-accent"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <div className="text-gray-500 font-semibold">
                    Total Users: {filteredUsers.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead style={{ background: 'linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)' }} className="text-white">
                            <tr>
                                <th className="p-4">Profile</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        {user.profilePic || user.profileImage ? (
                                            <img src={user.profilePic || user.profileImage} alt={user.firstName} className="w-10 h-10 rounded-full object-cover border-2 border-primary" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg border-2 border-primary">
                                                {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 font-semibold text-secondary">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="p-4 text-gray-600">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            user.type === 'admin' || user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.type === 'admin' || user.role === 'admin' ? 'Admin' : 'Customer'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button 
                                            onClick={() => toggleBlockStatus(user.email, user.isBlocked)}
                                            className={`px-3 py-1 rounded-lg text-sm font-bold text-white ${
                                                user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'
                                            } transition-colors`}
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                        <button 
                                            onClick={() => deleteUser(user.email)}
                                            className="px-3 py-1 rounded-lg text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {currentUsers.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500 text-lg">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mb-6">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-secondary disabled:opacity-50 hover:bg-gray-50 font-semibold transition-colors"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                                currentPage === number 
                                    ? 'bg-accent text-white' 
                                    : 'bg-white border border-gray-300 text-secondary hover:bg-gray-50'
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-secondary disabled:opacity-50 hover:bg-gray-50 font-semibold transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
