import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";


import HomePage from "./HomePage";
import JuzPage from "./Component/JuzPage"; // Pastikan file ini ada
import NavbarComponent from "./Component/NavbarComponent";
import AdminPage from "./admin/AdminPage";

// import Tabel from "./Tabel";
import LoginRegis from "./LoginRegis";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container-fluid p-0">
      <NavbarComponent />

        <Routes>
        <Route path="/loginregis" element={<LoginRegis />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/juz/:id" element={<JuzPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          {/* <Route path="/tabel" element={<Tabel />} /> */}
          {/* <Route path="/login" element={<LoginRegis />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
