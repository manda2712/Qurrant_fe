import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import juzContent from "../data/juzContent";
import { getUserReadingProgress, addReadingProgress, updateReadingProgress } from "../api/api";

const JuzPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const juz = juzContent.find((j) => j.id === Number(id));

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).userId : null;

  const [surahStatus, setSurahStatus] = useState(
    juz
      ? juz.surah.map((surah) => ({
          name: surah,
          status: "Belum Dibaca", // status default
        }))
      : []
  );
  const [note, setNote] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isJuzCompleted, setIsJuzCompleted] = useState(false);

  useEffect(() => {
    if (!juz || !userId) return;

    const fetchProgress = async () => {
      try {
        console.log("🔍 Mengecek progress untuk userId:", userId, "Juz:", id);
    
        let response = await getUserReadingProgress(userId);
        console.log("📜 Response dari backend:", response.data); // Debugging response
    
        let progressData = response.data;
        let juzProgress = progressData.find((item) => Number(item.juz) === Number(id));
    
        console.log("✅ Progress ditemukan:", juzProgress); // Debugging hasil pencarian
    
        if (!juzProgress) {
          console.log("🚀 Progress untuk Juz ini belum ada, membuat progress baru...");
    
          const surahProgress = juz.surah.reduce((acc, surahName) => {
            acc[surahName] = "Belum Dibaca";
            return acc;
          }, {});
    
          await addReadingProgress(userId, Number(id), surahProgress, "");
    
          // Ambil ulang data progress setelah ditambahkan
          response = await getUserReadingProgress(userId);
          console.log("📜 Response setelah menambah progress:", response.data); // Debugging response baru
    
          progressData = response.data;
          juzProgress = progressData.find((item) => Number(item.juz) === Number(id));
        }
    
        if (juzProgress) {
          setSurahStatus(
            juz.surah.map((surah) => ({
              name: surah,
              status: juzProgress.progress?.[surah] || "Belum Dibaca",
            }))
          );
          setNote(juzProgress.catatan || "");
        }
      } catch (error) {
        console.error("⚠ Gagal mengambil progress:", error.response?.data || error.message);
      }
    };
    

    fetchProgress();
  }, [id, userId, juz]);

  useEffect(() => {
    const allCompleted = surahStatus.every((s) => s.status === "Selesai");
    setIsJuzCompleted(allCompleted);
  }, [surahStatus]);

  // const handleStatusChange = async (surahName, newStatus) => {
  //   setSurahStatus((prevStatus) =>
  //     prevStatus.map((s) => (s.name === surahName ? { ...s, status: newStatus } : s))
  //   );
  
  //   try {
  //     console.log(`📝 Mengupdate status surah "${surahName}" menjadi "${newStatus}" untuk Juz ${id}`);
  
  //     let response = await getUserReadingProgress(userId);
  //     let progressData = response.data;
  //     let juzProgress = progressData.find((item) => Number(item.juz) === Number(id));
  
  //     if (!juzProgress) {
  //       console.error("⚠ Progress tidak ditemukan! Tidak bisa update.");
  //       return;
  //     }
  
  //     console.log("📤 Mengirim request update:", {
  //       progressId: juzProgress.id,  // Pastikan ID ini benar
  //       userId,
  //       juzId: id,
  //       surahName,
  //       newStatus
  //     });
  
  //     await updateReadingProgress(juzProgress.id, surahName, newStatus);
  //   } catch (error) {
  //     console.error("⚠ Gagal memperbarui status:", error.response?.data || error.message);
  //   }
  // };
  
  const handleStatusChange = async (surahName, newStatus) => {
    setSurahStatus((prevStatus) =>
      prevStatus.map((s) => (s.name === surahName ? { ...s, status: newStatus } : s))
    );
  
    try {
      console.log(`🔄 Mengupdate status surah "${surahName}" menjadi "${newStatus}"`);
      const response = await updateReadingProgress(userId, id, surahName, newStatus);
      
      console.log("✅ Response dari server:", response);
    } catch (error) {
      console.error("⚠ Gagal memperbarui status:", error);
    }
  };
  
  const handleSaveNote = async () => {
    try {
      console.log("💾 Menyimpan catatan...");

      let response = await getUserReadingProgress(userId);
      let progressData = response.data;
      let juzProgress = progressData.find((item) => Number(item.juz) === Number(id));

      if (!juzProgress) {
        console.log("🚀 Menambahkan progress baru sebelum menyimpan catatan...");
        const surahProgress = surahStatus.reduce((acc, s) => {
          acc[s.name] = s.status;
          return acc;
        }, {});
        await addReadingProgress(userId, id, surahProgress, note);
      } else {
        console.log("✅ Progress sudah ada, hanya memperbarui catatan.");
        await updateReadingProgress(userId, id, null, null, note);
      }

      setSavedMessage("Catatan berhasil disimpan!");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("⚠ Gagal menyimpan catatan:", error);
    }
  };

  if (!juz) {
    return (
      <div className="container mt-5">
        <h1>Juz Tidak Ditemukan</h1>
        <p>Pastikan nomor Juz yang Anda masukkan benar.</p>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Kembali ke Homepage
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>{juz.title}</h1>
      <p className={"keterangan " + (isJuzCompleted ? "text-success fw-bold" : "text-muted")}>
        {isJuzCompleted ? "Juz ini telah selesai!" : "Belum selesai"}
      </p>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Surah</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {surahStatus.map((surah, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{surah.name}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant={surah.status === "Selesai" ? "success" : "secondary"}>
                    {surah.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(surah.name, "Belum Dibaca")}>
                      Belum Dibaca
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(surah.name, "Sedang Membaca")}>
                      Sedang Membaca
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(surah.name, "Selesai")}>
                      Selesai
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h3>Catatan</h3>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Tambahkan catatan untuk Juz ini..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={handleSaveNote}>
          Simpan Catatan
        </Button>
        {savedMessage && <p className="text-success mt-2">{savedMessage}</p>}
      </div>

      <Button variant="secondary" className="mt-3" onClick={() => navigate("/")}>
        Kembali ke Homepage
      </Button>
    </div>
  );
};

export default JuzPage;
