import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, userRole }) => {
    const role = userRole || localStorage.getItem("role"); 

    console.log("🔍 Role user saat akses halaman:", role);
    console.log("🛑 Role yang diizinkan:", allowedRoles);

    return role && allowedRoles.includes(role.toLowerCase()) ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
