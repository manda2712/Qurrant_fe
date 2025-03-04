import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegis = ({ setUserRole }) => {
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (role) => {
        setUserRole(role); // Simpan peran pengguna
        navigate(role === "admin" ? "/adminpage" : "/"); // Redirect sesuai role
    };

    return (
        <div className={`contentlr d-flex justify-content-center align-items-center shadow-ig ${isRegister ? "active" : ""}`}>
            {/* Registrasi Form */}
            <div className={`col-md-6 form-box ${isRegister ? "show" : "hide"}`}>
                <form>
                    <div className="header-logreg mb-4 text-center">
                        <h1>BUAT AKUN DULU!</h1>
                        <div className="input-group mb-3">
                            <input type="text" placeholder="Nama" className="form-control form-control-lg bg-light fs-6" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" />
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <button className="btn btn-primary w-50 fs-6">Daftar</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Login Form */}
            <div className={`col-md-6 form-box ${isRegister ? "hide" : "show"}`}>
                <form>
                    <div className="header-logreg mb-4 text-center">
                        <h1>YUK MASUK</h1>
                        <div className="input-group mb-3">
                            <input type="text" placeholder="Nama" className="form-control form-control-lg bg-light fs-6" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" />
                        </div>
                        <div className="input-group mb-5 d-flex justify-content-center">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label htmlFor="formcheck" className="form-check-label text-secondary">
                                    <small>Remember me</small>
                                </label>
                            </div>
                            <div className="forgot">
                                <small><a href="#">Forgot password</a></small>
                            </div>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <button type="button" className="btn btn-primary w-50 fs-6" onClick={() => handleLogin("user")}>
                                Masuk sebagai User
                            </button>
                        </div>
                        <div className="input-group mb-3 justify-content-center">
                            <button type="button" className="btn btn-secondary w-50 fs-6" onClick={() => handleLogin("admin")}>
                                Masuk sebagai Admin
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Switch Button */}
            <div className="switch-content">
                <div className="switch">
                    <div className="switch-panel switch-left">
                        <h1>Selamat Datang</h1>
                        <p>Selamat Datang di QURRANT</p>
                        <button className="hidden btn text-white w-50 fs-6" onClick={() => setIsRegister(false)}>Login</button>
                    </div>
                    <div className="switch-panel switch-right">
                        <h1>Halo Lagi</h1>
                        <p>Kami senang kamu kembali</p>
                        <button className="hidden btn border-white text-white w-50 fs-6" onClick={() => setIsRegister(true)}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegis;
