import React, { useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const AdminPage = () => {
  // Data Dummy User dan Progress Juz
  const [users, setUsers] = useState([
    { id: 1, name: "Ahmad", progress: "Juz 5" },
    { id: 2, name: "Aisyah", progress: "Juz 10" },
    { id: 3, name: "Fatimah", progress: "Juz 15" },
  ]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Nama User</th>
            <th>Progres Bacaan Juz</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.progress}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;
