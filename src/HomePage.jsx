import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import juzContent from "./data/juzContent.js";

const HomePage = () => {
  // const [juzStatus, setJuzStatus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [juz, setJuz] = useState([]);
  const [surahList, setSurahList] = useState([]);
  const [surah, setSurah] = useState("");
  const [status, setStatus] = useState("Belum Dibaca");
  const [catatan, setCatatan] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    const updatedStatus = {};
    for (let i = 1; i <= 30; i++) {
      const storedData = JSON.parse(localStorage.getItem(`juz_${i}_progress`));
      updatedStatus[i] = storedData ? storedData.status : "Belum Dibaca";
    }
    // setJuzStatus(updatedStatus);
  }, []);

  const handleShowModal = (juzNumber) => {
    setSelectedJuz(juzNumber);
    const selectedJuzData = juzContent.find((juz) => juz.id === juzNumber);
    setSurahList(selectedJuzData ? selectedJuzData.surah : []);

    // Ambil data yang tersimpan di localStorage
    const savedData = JSON.parse(localStorage.getItem(`juz_${juzNumber}_progress`));
    if (savedData) {
      setSurah(savedData.surah);
      setStatus(savedData.status);
      setCatatan(savedData.catatan);
    } else {
      setSurah("");
      setStatus("belum dibaca");
      setCatatan("");
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJuz(null);
    setSurah("");
    setStatus("belum dibaca");
    setCatatan("");
  };

  const handleSave = async () => {
    const progressData = {
      juz,
      surah,
      status,
      catatan,
    };
  
    try {
      const token = localStorage.getItem("token");
      console.log("Token yang dikirim:", token);
  
      const response = await fetch("http://localhost:3000/api/reading/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(progressData),
      });
  
      const responseData = await response.json();
      console.log("Response dari server:", responseData);
  
      if (!response.ok) {
        throw new Error(`Gagal menyimpan progress: ${responseData.message || response.statusText}`);
      }
  
      console.log("Progress tersimpan:", responseData);
  
      // setJuzStatus((prevStatus) => ({
      //   ...prevStatus,
      //   [selectedJuz]: status
      // }));
  
      handleCloseModal();
    } catch (error) {
      console.error("Error menyimpan progress:", error.message);
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
        <Row className="justify-content-center">
          {Array.from({ length: 30 }, (_, index) => (
            <Col xs={4} sm={3} md={2} key={index} className="mb-3">
              {/* <Button
                variant={juzStatus[index + 1] === "Selesai" ? "success" : juzStatus[index + 1] === "Sedang Membaca" ? "warning" : "primary"}
                className="w-100 mb-2"
                onClick={() => navigate(`/juz/${index + 1}`)}
              >
                JUZ {index + 1}
              </Button> */}
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => handleShowModal(index + 1)}
              >
                JUZ {index + 1}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Catatan untuk Juz {selectedJuz}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>Juz</Form.Label>
              <Form.Control
                // as="textarea"
                // rows={3}
                placeholder="Tambahkan Juz"
                value={juz}
                onChange={(e) => setJuz(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surah</Form.Label>
              <Form.Select value={surah} onChange={(e) => setSurah(e.target.value)}>
                <option value="">Pilih Surah</option>
                {surahList.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>belum dibaca</option>
                <option>Sedang dilakukan</option>
                <option>Selesai</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Catatan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Tambahkan catatan"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomePage;
