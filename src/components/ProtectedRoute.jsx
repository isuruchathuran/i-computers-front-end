import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

// Helper function to decode JWT token without external library
const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
};

export default function ProtectedRoute({ children, roleRequired }) {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("You must be logged in to access this page.", { id: 'auth-error' });
        return <Navigate to="/login" />;
    }

    const decoded = decodeToken(token);
    
    if (!decoded) {
        localStorage.removeItem("token");
        toast.error("Invalid session. Please login again.", { id: 'auth-error' });
        return <Navigate to="/login" />;
    }

    // If a specific role is required (e.g. admin)
    if (roleRequired && decoded.role !== roleRequired) {
        toast.error("You are not authorized to access this page.", { id: 'auth-error' });
        
        // Redirect back to store if trying to access admin panel without permissions
        return <Navigate to="/" />;
    }

    return children;
}
