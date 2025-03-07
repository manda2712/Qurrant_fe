import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import HomePage from "./HomePage";
import JuzPage from "./Component/JuzPage";
import NavbarComponent from "./Component/NavbarComponent";
import AdminPage from "./admin/AdminPage";
import Beranda from "./admin/Beranda";
import LoginRegis from "./LoginRegis";
import ProtectedRoute from "./protectedRoute"; // Sesuaikan dengan nama file di Windows// ✅ Pastikan sesuai dengan nama file!



import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [userRole, setUserRole] = useState(""); 

    // ✅ Ambil role dari localStorage saat aplikasi dimuat
    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (storedRole) {
            setUserRole(storedRole);
        }
    }, []);

    return (
        <Router>
            <div className="container-fluid p-0">
                <NavbarComponent />
                <Routes>
                    {/* ✅ Kirim setUserRole ke LoginRegis */}
                    <Route path="/loginregis" element={<LoginRegis setUserRole={setUserRole} />} />

                    {/* Halaman Utama User */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/juz/:id" element={<JuzPage />} />

                    {/* ✅ Gunakan ProtectedRoute untuk Admin */}
                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={userRole} />}>
                        <Route path="/adminpage" element={<AdminPage />} />
                        <Route path="/beranda" element={<Beranda />} />
                    </Route>

                    {/* Halaman Tidak Ditemukan */}
                    <Route path="*" element={<h1>404 - Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
