import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import './css/Userdelx.css';

export default function Userdelx() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
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
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const navigate = useNavigate();
  const moveTo = () => {
    navigate('/Admin');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users && users.filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleClick = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/del/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('User deleted successfully');
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.error(`Failed to delete user. Status: ${response.status}`);
        const errorMessage = await response.text();
        console.error(`Error message: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="users_container">
      <button onClick={moveTo}>Back To Admin</button>
      <h1>Manage Users</h1>
      <h2>Welcome Admin {user.name}</h2>
      <input
        type="text"
        placeholder="Search users with email..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <table className="users_table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers &&
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roll}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleClick(user._id)}>DELETE</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}