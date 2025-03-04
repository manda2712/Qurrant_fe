import { useParams, useNavigate } from "react-router-dom"; // 🔹 Tambahkan useNavigate
import { useState, useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
import juzContent from "../data/juzContent";

const JuzPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 🔹 Gunakan useNavigate()
  const juz = juzContent.find((j) => j.id === parseInt(id));

  const getSavedStatus = () => {
    const savedStatus = localStorage.getItem(`juz_${id}_status`);
    return savedStatus ? JSON.parse(savedStatus) : {};
  };

  const getSavedNote = () => localStorage.getItem(`juz_${id}_note`) || "";

  const [surahStatus, setSurahStatus] = useState(
    juz
      ? juz.surah.map((surah) => ({
          name: surah,
          status: getSavedStatus()[surah] || "Belum Dibaca",
        }))
      : []
  );

  const [note, setNote] = useState(getSavedNote());
  const [savedMessage, setSavedMessage] = useState("");
  const [isJuzCompleted, setIsJuzCompleted] = useState(false);

  useEffect(() => {
    const statusToSave = surahStatus.reduce((acc, surah) => {
      acc[surah.name] = surah.status;
      return acc;
    }, {});
    localStorage.setItem(`juz_${id}_status`, JSON.stringify(statusToSave));

    const allCompleted = surahStatus.every((s) => s.status === "Selesai");
    setIsJuzCompleted(allCompleted);
    localStorage.setItem(`juz_${id}_completed`, JSON.stringify(allCompleted));
  }, [surahStatus, id]);

  const handleSaveNote = () => {
    localStorage.setItem(`juz_${id}_note`, note);
    setSavedMessage("Catatan berhasil disimpan!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleStatusChange = (surahName, newStatus) => {
    setSurahStatus((prevStatus) =>
      prevStatus.map((s) =>
        s.name === surahName ? { ...s, status: newStatus } : s
      )
    );
  };

  if (!juz) {
    return (
      <div className="container mt-5">
        <h1>Juz Tidak Ditemukan</h1>
        <p>Pastikan nomor Juz yang Anda masukkan benar.</p>
        <Button variant="secondary" onClick={() => navigate("/")}>Kembali ke Homepage</Button>
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
                  <Dropdown.Toggle
                    variant={surah.status === "Selesai" ? "success" : "secondary"}
                  >
                    {surah.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(surah.name, "Belum Dibaca")}>
                      Belum Dibaca
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(surah.name, "Sedang Melakukan")}>
                      Sedang Melakukan
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
          placeholder="Tambahkan catatan untuk juz ini..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={handleSaveNote}>
          Simpan Catatan
        </Button>
        {savedMessage && <p className="text-success mt-2">{savedMessage}</p>}
      </div>

      {/* 🔹 Tombol Kembali ke Homepage */}
      <Button variant="secondary" className="mt-3" onClick={() => navigate("/")}>
        Kembali ke Homepage
      </Button>
    </div>
  );
};

export default JuzPage;
