import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import './css/Userdelx.css'
export default function Userdelx() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/ulists/');
        const json = await response.json();
        if (response.ok) {
          setUsers(json);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const navigate = useNavigate();
  const moveTo = () => {
    navigate('/Admin');
  };

  return (
    <div className="users_container">
      <button onClick={moveTo}>Back To Admin</button>
      <h1>Manage Users</h1>
      <h2>Welcome Admin {user.name}</h2>
      {/* Rendering user table with unique class name */}
      <table className="users_table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roll}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}