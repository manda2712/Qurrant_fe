import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [juzStatus, setJuzStatus] = useState({}); // Status penyelesaian juz
  const navigate = useNavigate();

  useEffect(() => {
    const updatedStatus = {};
    for (let i = 1; i <= 30; i++) {
      updatedStatus[i] = JSON.parse(localStorage.getItem(`juz_${i}_completed`)) || false;
    }
    setJuzStatus(updatedStatus);
  }, []);

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


      {/* 🔹 BUTTON PER JUZ */}
    <Container className="text-center mt-4">
      <Row className="justify-content-center">
        {Array.from({ length: 30 }, (_, index) => (
          <Col xs={4} sm={3} md={2} key={index} className="mb-3">
            <Button
              variant={juzStatus[index + 1] ? "success" : "primary"}
              className="button w-100"
              onClick={() => navigate(`/juz/${index + 1}`)}
            >
              JUZ {index + 1}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default HomePage;
