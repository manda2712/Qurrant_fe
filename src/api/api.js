import axios from "axios";
// import axios from "./axiosInstance"; 



// ✅ Buat instance axios dengan baseURL
const api = axios.create({
  baseURL: "https://qurrant.vercel.app/api", // Sesuaikan dengan URL backend
  headers: { "Content-Type": "application/json" },
});

// 🔹 Interceptor untuk menyertakan token JWT jika ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("✅ Menggunakan token:", token); // 🔍 Debug token
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ Tidak ada token! Pastikan sudah login.");
  }

  return config;
});


// ✅ Fungsi untuk registrasi
export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// ✅ Fungsi untuk login
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const addReadingProgress = async ( juz, surah,  catatan) => {
  try {
    const response = await api.post("/reading/progress", {
      juz,
      surah, // Kirim null jika surah kosong
      catatan,
    });
    console.log("✅ Data progress berhasil dikirim ke backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("⚠ Gagal mengirim progress ke backend:", error.response?.data || error.message);
    throw error;
  }
};



/** ✅ Ambil Progress Membaca berdasarkan User ID */
export const getUserReadingProgress = async (userId) => {
  try {
    if (!userId) {
      throw new Error("❌ userId tidak ditemukan! Pastikan sudah login.");
    }

    console.log(`🔍 Mengambil progress untuk userId: ${userId}`);
    const response = await api.get(`/reading/progress/${userId}`);
    return response.data;
  } catch (error) {
    console.error("⚠️ Gagal mengambil progress:", error.response?.data || error.message);
    throw error.response ? error.response.data : error;
  }
};


/** ✅ Update Progress (Tandai Selesai + Edit Catatan) */
export const updateReadingProgress = async (id, surah, status, catatan) => {
  try {
    if (!id) {
      throw new Error("❌ userId tidak ditemukan! Pastikan sudah login.");
    }

    const body = {};
    if (id) body.id = id
    if (surah) body.surah = surah;
    if (status) body.status = status;
    if (catatan !== null) body.catatan = catatan;

    console.log(`🔄 Memperbarui progress:`, body);
    const response = await api.put(`/reading/progress/${id}`, body);
    return response.data;
  } catch (error) {
    console.error("⚠️ Gagal memperbarui progress:", error.response?.data || error.message);
    throw error.response ? error.response.data : error;
  }
};

export default api;