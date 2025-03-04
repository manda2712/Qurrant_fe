import React, { useState } from "react";
import { Table, Dropdown } from "react-bootstrap";

const Tabel = () => {
  const [quranData, setQuranData] = useState([
    { id: 1, juz: 1, surah: "Al-Fatihah", ayat: "1-7", status: "Selesai" },
    { id: 2, juz: 1, surah: "Al-Baqarah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 2, juz: 2, surah: "Al-Baqarah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 2, juz: 3, surah: "Al-Baqarah", ayat: "1-5", status: "Sedang Melakukan" },    
    { id: 3, juz: 3, surah: "Ali 'Imran", ayat: "1-10", status: "Selesai" },
    { id: 3, juz: 4, surah: "Ali 'Imran", ayat: "1-10", status: "Selesai" },
    { id: 4, juz: 4, surah: "An-Nisa'", ayat: "1-7", status: "Selesai" },
    { id: 4, juz: 5, surah: "An-Nisa'", ayat: "1-7", status: "Selesai" },
    { id: 4, juz: 6, surah: "An-Nisa'", ayat: "1-7", status: "Selesai" },
    { id: 5, juz: 6, surah: "Al-Ma'idah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 5, juz: 7, surah: "Al-Ma'idah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 6, juz: 7, surah: "Al-An'am", ayat: "1-10", status: "Selesai" },
    { id: 6, juz: 8, surah: "Al-An'am", ayat: "1-10", status: "Selesai" },
    { id: 7, juz: 8, surah: "Al-A'raf", ayat: "1-7", status: "Selesai" },
    { id: 7, juz: 9, surah: "Al-A'raf", ayat: "1-7", status: "Selesai" },
    { id: 8, juz: 9, surah: "Al-Anfal", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 8, juz: 10, surah: "Al-Anfal", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 9, juz: 10, surah: "At-Taubah", ayat: "1-10", status: "Selesai" },
    { id: 9, juz: 11, surah: "At-Taubah", ayat: "1-10", status: "Selesai" },
    { id: 10, juz: 11, surah: "Yunus", ayat: "1-7", status: "Selesai" },
    { id: 11, juz: 11, surah: "Hud", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 11, juz: 12, surah: "Hud", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 12, juz: 12, surah: "Yusuf", ayat: "1-10", status: "Selesai" },
    { id: 12, juz: 13, surah: "Yusuf", ayat: "1-10", status: "Selesai" },
    { id: 13, juz: 13, surah: "Ar-Ra'd", ayat: "1-7", status: "Selesai" },
    { id: 14, juz: 13, surah: "Ibrahim", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 15, juz: 14, surah: "Al-Hijr", ayat: "1-10", status: "Selesai" },
    { id: 16, juz: 4, surah: "An-Nahl", ayat: "1-7", status: "Selesai" },
    { id: 17, juz: 15, surah: "Al-Isra'", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 18, juz: 15, surah: "Al-Kahf", ayat: "1-10", status: "Selesai" },
    { id: 18, juz: 16, surah: "Al-Kahf", ayat: "1-10", status: "Selesai" },
    { id: 19, juz: 16, surah: "Maryam", ayat: "1-7", status: "Selesai" },
    { id: 20, juz: 16, surah: "Ta Ha", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 21, juz: 17, surah: "Al-Anbiya'", ayat: "1-10", status: "Selesai" },
    { id: 22, juz: 17, surah: "Al-Hajj", ayat: "1-7", status: "Selesai" },
    { id: 23, juz: 18, surah: "Al-Mu'minun", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 24, juz: 18, surah: "An-Nur", ayat: "1-10", status: "Selesai" },
    { id: 25, juz: 18, surah: "Al-Furqan", ayat: "1-7", status: "Selesai" },
    { id: 25, juz: 19, surah: "Al-Furqan", ayat: "1-7", status: "Selesai" },
    { id: 26, juz: 19, surah: "Asy-Syu'ara'", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 27, juz: 19, surah: "An-Naml", ayat: "1-10", status: "Selesai" },
    { id: 27, juz: 20, surah: "An-Naml", ayat: "1-10", status: "Selesai" },
    { id: 28, juz: 20, surah: "Al-Qasas", ayat: "1-7", status: "Selesai" },
    { id: 29, juz: 20, surah: "Al-'Ankabut", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 29, juz: 21, surah: "Al-'Ankabut", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 30, juz: 21, surah: "Ar-Rum", ayat: "1-10", status: "Selesai" },
    { id: 31, juz: 21, surah: "Luqman", ayat: "1-7", status: "Selesai" },
    { id: 32, juz: 21, surah: "As-Sajdah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 33, juz: 21, surah: "Al-Ahzab", ayat: "1-10", status: "Selesai" },
    { id: 33, juz: 22, surah: "Al-Ahzab", ayat: "1-10", status: "Selesai" },
    { id: 34, juz: 22, surah: "Saba'", ayat: "1-7", status: "Selesai" },
    { id: 35, juz: 22, surah: "Fatir", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 36, juz: 22, surah: "Yasin", ayat: "1-10", status: "Selesai" },
    { id: 36, juz: 23, surah: "Yasin", ayat: "1-10", status: "Selesai" },
    { id: 37, juz: 23, surah: "As-Saffat", ayat: "1-7", status: "Selesai" },
    { id: 38, juz: 23, surah: "Sad", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 39, juz: 23, surah: "Az-Zumar", ayat: "1-10", status: "Selesai" },
    { id: 39, juz: 24, surah: "Az-Zumar", ayat: "1-10", status: "Selesai" },
    { id: 40, juz: 24, surah: "Ghafir", ayat: "1-7", status: "Selesai" },
    { id: 41, juz: 24, surah: "Fussilat", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 41, juz: 25, surah: "Fussilat", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 42, juz: 25, surah: "Asy-Syura", ayat: "1-10", status: "Selesai" },
    { id: 43, juz: 25, surah: "Az-Zukhruf", ayat: "1-7", status: "Selesai" },
    { id: 44, juz: 25, surah: "Ad-Dukhan", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 45, juz: 25, surah: "Al-Jasiyah", ayat: "1-10", status: "Selesai" },
    { id: 45, juz: 26, surah: "Al-Jasiyah", ayat: "1-10", status: "Selesai" },
    { id: 46, juz: 26, surah: "Al-Ahqaf", ayat: "1-7", status: "Selesai" },
    { id: 47, juz: 26, surah: "Muhammad", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 48, juz: 26, surah: "Al-Fath", ayat: "1-10", status: "Selesai" },
    { id: 49, juz: 26, surah: "Al-Hujurat", ayat: "1-7", status: "Selesai" },
    { id: 50, juz: 26, surah: "Qaf", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 51, juz: 26, surah: "Az-Zariyat", ayat: "1-10", status: "Selesai" },
    { id: 51, juz: 27, surah: "Az-Zariyat", ayat: "1-10", status: "Selesai" },
    { id: 52, juz: 27, surah: "At-Tur", ayat: "1-7", status: "Selesai" },
    { id: 53, juz: 27, surah: "An-Najm", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 54, juz: 27, surah: "Al-Qamar", ayat: "1-10", status: "Selesai" },
    { id: 55, juz: 27, surah: "Ar-Rahman", ayat: "1-7", status: "Selesai" },
    { id: 56, juz: 27, surah: "Al-Waqi'ah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 57, juz: 27, surah: "Al-Hadid", ayat: "1-10", status: "Selesai" },
    { id: 58, juz: 28, surah: "Al-Mujadilah", ayat: "1-7", status: "Selesai" },
    { id: 59, juz: 28, surah: "Al-Hasyr", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 60, juz: 28, surah: "Al-Mumtahanah", ayat: "1-10", status: "Selesai" },
    { id: 61, juz: 28, surah: "As-Saff", ayat: "1-7", status: "Selesai" },
    { id: 62, juz: 28, surah: "Al-Jumu'ah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 63, juz: 28, surah: "Al-Munafiqun", ayat: "1-10", status: "Selesai" },
    { id: 64, juz: 28, surah: "At-Tagabun", ayat: "1-7", status: "Selesai" },
    { id: 65, juz: 28, surah: "At-Talaq", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 66, juz: 28, surah: "At Tahrim", ayat: "1-10", status: "Selesai" },
    { id: 67, juz: 29, surah: "Al-Mulk", ayat: "1-7", status: "Selesai" },
    { id: 68, juz: 29, surah: "Al-Qalam", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 69, juz: 29, surah: "Al-Haqqah", ayat: "1-10", status: "Selesai" },
    { id: 70, juz: 29, surah: "Al-Ma'arij", ayat: "1-7", status: "Selesai" },
    { id: 71, juz: 29, surah: "Nuh", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 72, juz: 29, surah: "Al-Jinn", ayat: "1-10", status: "Selesai" },
    { id: 73, juz: 29, surah: "Al-Muzzammil", ayat: "1-7", status: "Selesai" },
    { id: 74, juz: 29, surah: "Al-Muddassir", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 75, juz: 29, surah: "Al-Qiyamah", ayat: "1-10", status: "Selesai" },
    { id: 76, juz: 29, surah: "Al-Insan", ayat: "1-7", status: "Selesai" },
    { id: 77, juz: 29, surah: "Al-Mursalat", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 78, juz: 30, surah: "An-Naba'", ayat: "1-10", status: "Selesai" },
    { id: 79, juz: 30, surah: "An-Nazi'at", ayat: "1-7", status: "Selesai" },
    { id: 80, juz: 30, surah: "'Abasa", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 81, juz: 30, surah: "At-Takwir", ayat: "1-10", status: "Selesai" },
    { id: 82, juz: 30, surah: "Al-Infitar", ayat: "1-7", status: "Selesai" },
    { id: 83, juz: 30, surah: "Al-Mutaffifin", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 84, juz: 30, surah: "Al-Insyiqaq", ayat: "1-10", status: "Selesai" },
    { id: 85, juz: 30, surah: "Al-Buruj", ayat: "1-7", status: "Selesai" },
    { id: 86, juz: 30, surah: "At-Tariq", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 87, juz: 30, surah: "Al-A'la", ayat: "1-10", status: "Selesai" },
    { id: 88, juz: 30, surah: "Al-Gasyiyah", ayat: "1-7", status: "Selesai" },
    { id: 89, juz: 30, surah: "Al-Fajr", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 90, juz: 30, surah: "Al-Balad", ayat: "1-10", status: "Selesai" },
    { id: 91, juz: 30, surah: "Asy-Syams", ayat: "1-7", status: "Selesai" },
    { id: 92, juz: 30, surah: "Al-Lail", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 93, juz: 30, surah: "Ad-Duha", ayat: "1-10", status: "Selesai" },
    { id: 94, juz: 30, surah: "Al-Insyirah", ayat: "1-7", status: "Selesai" },
    { id: 95, juz: 30, surah: "At-Tin", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 96, juz: 30, surah: "Al-'Alaq", ayat: "1-10", status: "Selesai" },
    { id: 97, juz: 30, surah: "Al-Qadr", ayat: "1-7", status: "Selesai" },
    { id: 98, juz: 30, surah: "Al-Bayyinah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 99, juz: 30, surah: "Az-Zalzalah", ayat: "1-10", status: "Selesai" },
    { id: 100, juz: 30, surah: "Al-'Adiyat", ayat: "1-7", status: "Selesai" },
    { id: 101, juz: 30, surah: "Al-Qari'ah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 102, juz: 30, surah: "At-Takasur", ayat: "1-10", status: "Selesai" },
    { id: 103, juz: 30, surah: "Al-'Asr", ayat: "1-7", status: "Selesai" },
    { id: 104, juz: 30, surah: "Al-Humazah", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 105, juz: 30, surah: "Al-Fil", ayat: "1-10", status: "Selesai" },
    { id: 106, juz: 30, surah: "Quraisy", ayat: "1-7", status: "Selesai" },
    { id: 107, juz: 30, surah: "Al-Ma'un", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 108, juz: 30, surah: "Al-Kautsar", ayat: "1-10", status: "Selesai" },
    { id: 109, juz: 30, surah: "Al-Kafirun", ayat: "1-7", status: "Selesai" },
    { id: 110, juz: 30, surah: "An-Nasr", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 111, juz: 30, surah: "Al-Lahab", ayat: "1-10", status: "Selesai" },
    { id: 112, juz: 30, surah: "Al-Ikhlas", ayat: "1-7", status: "Selesai" },
    { id: 113, juz: 30, surah: "Al-Falaq", ayat: "1-5", status: "Sedang Melakukan" },
    { id: 114, juz: 30, surah: "An-Nas", ayat: "1-10", status: "Selesai" },
  ]);

  const handleStatusChange = (juz, surah, newStatus) => {
    setQuranData((prevData) =>
      prevData.map((item) =>
        item.juz === juz && item.surah === surah ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Juz</th>
          <th>Surah</th>
          <th>Ayat</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {quranData.map((item, index) => (
          <tr key={`${item.juz}-${item.surah}`}>
            <td>{item.juz}</td>
            <td>{item.surah}</td>
            <td>{item.ayat}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {item.status}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleStatusChange(item.juz, item.surah, "Selesai")}>
                    Selesai
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleStatusChange(item.juz, item.surah, "Sedang Melakukan")}>
                    Sedang Melakukan
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tabel;