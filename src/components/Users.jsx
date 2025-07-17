import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Users.css";

export default function Users() {
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [editId, setEditId] = useState();

  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    setEditId(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      await axios.post(`${API_URL}/api/users`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setError("User added successfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      await axios.patch(`${API_URL}/api/users/${editId}`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchUsers();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setError("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      {error && <div className="error-message">{error}</div>}

      <form ref={frmRef} className="user-form">
        <input
          name="firstName"
          value={form.firstName}
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          value={form.lastName}
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          value={form.email}
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          value={form.password}
          type="password"
          placeholder="New Password"
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">--Select Role--</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {editId ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={resetForm}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </form>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button onClick={fetchUsers}>Search</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((value) => (
            <tr key={value._id}>
              <td>{value.firstName}</td>
              <td>{value.lastName}</td>
              <td>{value.email}</td>
              <td>{value.role}</td>
              <td className="user-actions">
                <button onClick={() => handleEdit(value)}>Edit</button>
                <button onClick={() => handleDelete(value._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
