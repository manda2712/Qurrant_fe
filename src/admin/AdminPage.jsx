// import React, { useState, useEffect, useCallback } from "react";
// import { Table, Container } from "react-bootstrap";
// import axios from "axios";

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchUsers = useCallback(async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/reading", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("✅ Data dari Backend:", response.data);

//       setUsers(response.data); // Data sudah mengandung username
//     } catch (error) {
//       console.error("❌ Gagal mengambil data pengguna:", error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Admin Dashboard</h2>
//       <Table striped bordered hover>
//         <thead className="table-dark">
//           <tr>
//             <th>No</th>
//             <th>Username</th>
//             <th>Juz</th>
//             <th>Surah</th>
//             <th>Catatan</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td>{user.user.username}</td> {/* ✅ Ganti user.username */}
//                 <td>{user.juz}</td>
//                 <td>{user.surah}</td>
//                 <td>{user.catatan}</td>
//                 <td>{user.status}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">Tidak ada data progress</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default AdminPage;


// import React, { useState, useEffect, useCallback } from "react";
// import { Table, Container } from "react-bootstrap";
// import axios from "axios";

// const AdminPage = () => {
//   const [usersData, setUsersData] = useState([]);
//   const token = localStorage.getItem("token");
  

//   const fetchUsers = useCallback(async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/reading", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("✅ Data dari Backend:", response.data);
//       setUsersData(response.data);
//     } catch (error) {
//       console.error("❌ Gagal mengambil data pengguna:", error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   // 🔹 Kelompokkan data berdasarkan username
//   const groupedUsers = usersData.reduce((acc, curr) => {
//     const username = curr.user.username;

//     if (!acc[username]) {
//       acc[username] = {
//         username: username,
//         readings: [],
//       };
//     }

//     acc[username].readings.push({
//       juz: curr.juz,
//       surah: curr.surah,
//       catatan: curr.catatan,
//     });

//     return acc;
//   }, {});

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Admin Dashboard</h2>
//       <Table striped bordered hover>
//         <thead className="table-dark">
//           <tr>
//             <th>No</th>
//             <th>Username</th>
//             <th>Juz</th>
//             <th>Surah</th>
//             <th>Catatan</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.values(groupedUsers).length > 0 ? (
//             Object.values(groupedUsers).map((user, index) => {
//               return user.readings.map((reading, idx) => (
//                 <tr key={`${user.username}-${idx}`}>
//                   {idx === 0 && (
//                     <td rowSpan={user.readings.length}>{index + 1}</td>
//                   )}
//                   {idx === 0 && (
//                     <td rowSpan={user.readings.length}>{user.username}</td>
//                   )}
//                   <td>{reading.juz}</td>
//                   <td>{reading.surah}</td>
//                   <td>{reading.catatan}</td>
//                 </tr>
//               ));
//             })
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">Tidak ada data progress</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default AdminPage;

import React, { useState, useEffect, useCallback } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";

const AdminPage = () => {
  const [usersData, setUsersData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reading", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Data dari Backend:", response.data);
      setUsersData(response.data);
    } catch (error) {
      console.error("❌ Gagal mengambil data pengguna:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 🔹 Kelompokkan data berdasarkan username
  const groupedUsers = usersData.reduce((acc, curr) => {
    const username = curr.user.username;

    if (!acc[username]) {
      acc[username] = {
        username: username,
        readings: [],
      };
    }

    acc[username].readings.push({
      juz: curr.juz,
      surah: curr.surah,
      catatan: curr.catatan,
    });

    return acc;
  }, {});

  // 🔄 Fungsi untuk reset semua progress membaca
  // const resetProgress = async () => {
  //   if (!window.confirm("⚠ Apakah Anda yakin ingin menghapus semua progress membaca?")) return;

  //   try {
  //     const response = await axios.delete("http://localhost:3000/api/reading/progress", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     alert(response.data.message);
  //     fetchUsers(); // Refresh data setelah reset
  //   } catch (error) {
  //     console.error("❌ Gagal menghapus progress:", error);
  //     alert("Gagal menghapus progress!");
  //   }
  // };

// 🔄 Fungsi untuk reset semua progress membaca
const resetProgress = async () => {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop d-flex align-items-center justify-content-center";
  modal.style.position = "fixed";
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.zIndex = 1050;

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" style="background: white; border-radius: 8px; padding: 20px; max-width: 400px;">
      <div class="modal-content border-0">
        <div class="modal-header border-0">
          <h5 class="modal-title">Konfirmasi Reset Progress</h5>
        </div>
        <div class="modal-body text-center">
          <p class="mb-3">⚠ Apakah Anda yakin ingin menghapus semua progress membaca?</p>
        </div>
        <div class="modal-footer border-0 d-flex justify-content-between">
          <button id="cancel-reset" class="btn btn-secondary">Tidak</button>
          <button id="confirm-reset" class="btn btn-danger">Ya</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  return new Promise((resolve) => {
    document.getElementById("confirm-reset").onclick = async () => {
      document.body.removeChild(modal);

      try {
        const response = await axios.delete("http://localhost:3000/api/reading/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert(response.data.message);
        fetchUsers(); // Refresh data setelah reset
        resolve();
      } catch (error) {
        console.error("❌ Gagal menghapus progress:", error);
        alert("Gagal menghapus progress!");
        resolve();
      }
    };

    document.getElementById("cancel-reset").onclick = () => {
      document.body.removeChild(modal);
      resolve();
    };
  });
};



  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Tombol Reset Progress */}
      <Button variant="danger" className="mb-3" onClick={resetProgress}>
        🔄 Reset Semua Progress
      </Button>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Juz</th>
            <th>Surah</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(groupedUsers).length > 0 ? (
            Object.values(groupedUsers).map((user, index) => {
              return user.readings.map((reading, idx) => (
                <tr key={`${user.username}-${idx}`}>
                  {idx === 0 && (
                    <td rowSpan={user.readings.length}>{index + 1}</td>
                  )}
                  {idx === 0 && (
                    <td rowSpan={user.readings.length}>{user.username}</td>
                  )}
                  <td>{reading.juz}</td>
                  <td>{reading.surah}</td>
                  <td>{reading.catatan}</td>
                </tr>
              ));
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Tidak ada data progress</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;
