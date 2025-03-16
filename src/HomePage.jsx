import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import juzContent from "./data/juzContent.js";

const API_URL = "http://localhost:3000/api/reading/get/progress"; // Sesuaikan dengan backend kamu

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [surahList, setSurahList] = useState([]);
  const [surah, setSurah] = useState("");
  const [status, setStatus] = useState("Belum Dibaca");
  const [catatan, setCatatan] = useState("");
  const [juzStatus, setJuzStatus] = useState({});
  const [username, setUsername] = useState("Anonim");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUsername(decodedToken.username || "Anonim");
      } catch (error) {
        console.error("❌ Gagal decode token:", error);
      }
    }

    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Gagal mengambil data progress");

      const data = await response.json();
      const updatedStatus = {};

      data.forEach((item) => {
        updatedStatus[item.juz] = { status: item.status, username: item.username };
      });

      setJuzStatus(updatedStatus);
    } catch (error) {
      console.error("❌ Error mengambil data progress:", error);
    }
  };

  const handleShowModal = (juzNumber) => {
    setSelectedJuz(juzNumber);
    const selectedJuzData = juzContent.find((juz) => juz.id === juzNumber);
    setSurahList(selectedJuzData ? selectedJuzData.surah : []);
  
    const savedData = juzStatus[juzNumber];
    if (savedData) {
      setSurah(savedData.surah || "");
      setStatus(savedData.status || "Belum Dibaca");
      setCatatan(savedData.catatan || "");
    } else {
      setSurah("");
      setStatus("Belum Dibaca");
      setCatatan("");
    }
  
    setShowModal(true);
  };  

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJuz(null);
  };

  const handleSave = async () => {
    if (!selectedJuz) {
      console.error("❌ selectedJuz tidak boleh kosong!");
      return;
    }
  
    // Konversi status ke format yang diterima backend
    const statusMap = {
      "Belum Dibaca": "belum_dibaca",
      "Sedang Dilakukan": "Sedang_dilakukan",
      "Selesai": "Selesai",
    };
  
    const progressData = {
      juz: String(selectedJuz),
      surah,
      status: statusMap[status] || "belum_dibaca", // Default jika status tidak cocok
      catatan,
    };
  
    console.log("📌 Data yang dikirim ke backend:", JSON.stringify(progressData, null, 2));
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Token tidak ditemukan, user belum login!");
        return;
      }
  
      const checkResponse = await fetch(`http://localhost:3000/api/reading/progress/${selectedJuz}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
  
      const result = await checkResponse.json();
      console.log("📌 Response GET:", checkResponse.status, result);
  
      let method = "POST";
      let url = "http://localhost:3000/api/reading/progress";
  
      if (checkResponse.ok && result.data && result.data.juz === String(selectedJuz)) {
        method = "PUT";
        url = `http://localhost:3000/api/reading/progress/${selectedJuz}`;
      }
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(progressData),
      });
  
      const responseData = await response.json();
      console.log("📌 Response dari server:", responseData);
  
      if (!response.ok) {
        throw new Error(`Gagal menyimpan progress: ${responseData.message || response.statusText}`);
      }
  
      // Update state
      const updatedStatus = { ...juzStatus, [selectedJuz]: { status: progressData.status, username } };
      setJuzStatus(updatedStatus);
      localStorage.setItem(`juz_${selectedJuz}_progress`, JSON.stringify(progressData));
  
      handleCloseModal();
    } catch (error) {
      console.error("❌ Error menyimpan progress:", error.message);
    }
  };
  
  return (
    <>
      <header className="header">
        <Container fluid className="p-0 m-0">
          <Row className="justify-content-center align-items-center w-100 m-0">
            <Col xs={12} className="text-center p-0">
              <div className="header-content">
                <h1 className="header-title">QURRANT</h1>
                <p className="header-subtitle">(Quran + Current)</p>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="text-center mt-4">
        <h5 className="welcome fs-1 my-4 text-white">Selamat datang, {username}!</h5>
        <Row className="justify-content-center">
          {Array.from({ length: 30 }, (_, index) => {
            const juzNumber = index + 1;
            const juzData = juzStatus[juzNumber] || { status: "Belum Dibaca", username: "" };
            const variant =
              juzData.status === "Selesai"
                ? "success"
                : juzData.status === "Sedang_dilakukan"
                ? "warning"
                : "secondary";
            return (
              <Col xs={4} sm={3} md={2} key={index} className="mb-3">
                <Button variant={variant} className="w-100" onClick={() => handleShowModal(juzNumber)}>
                  JUZ {juzNumber}
                  <br />
                  <small>{juzData.username || "Belum ada"}</small>
                </Button>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Catatan untuk Juz {selectedJuz}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Juz</Form.Label>
              <Form.Control type="text" value={selectedJuz || ""} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surah</Form.Label>
              <Form.Select value={surah} onChange={(e) => setSurah(e.target.value)}>
                <option value="">Pilih Surah</option>
                {surahList.map((s, index) => (
                  <option key={index} value={s}>{s}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status Juz</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Belum Dibaca</option>
                <option>Sedang Dilakukan</option>
                <option>Selesai</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Catatan</Form.Label>
              <Form.Control as="textarea" rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomePage;


