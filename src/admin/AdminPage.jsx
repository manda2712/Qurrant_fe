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


import React, { useState, useEffect, useCallback } from "react";
import { Table, Container } from "react-bootstrap";
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
      status: curr.status,
    });

    return acc;
  }, {});

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Juz</th>
            <th>Surah</th>
            <th>Catatan</th>
            <th>Status</th>
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
                  <td>{reading.status}</td>
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
