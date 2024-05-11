import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import './css/Userdelx.css';

export default function Userdelx() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null); // Track user to be deleted

  const navigate = useNavigate();

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

  const moveTo = () => {
    navigate('/Admin');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users && users.filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleClick = (userId) => {
    // Open the confirmation dialog before deleting
    setConfirmDeleteUser(userId);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`http://localhost:8000/del/${confirmDeleteUser}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('User deleted successfully');
        setUsers(users.filter(user => user._id !== confirmDeleteUser));
      } else {
        console.error(`Failed to delete user. Status: ${response.status}`);
        const errorMessage = await response.text();
        console.error(`Error message: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    // Close the confirmation dialog after deletion
    setConfirmDeleteUser(null);
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog without deleting
    setConfirmDeleteUser(null);
  };

  useEffect(() => {
    if (user && user.roll !== 'admin') {
      window.location = "/";
    } else {
      setIsAdmin(true);
    }
  }, [user, navigate]);
  
  if (!user) {
    return <div>Loading...</div>;
}
  return (
    <div className="users_container">
      {isAdmin && (
        <>
          <button onClick={moveTo}>Back To Admin</button>
          <h1>Manage Users</h1>
          <h2>Welcome Admin {user && user.firstName}</h2> {/* Check if user is not null */}
          <input
            type="text"
            placeholder="Search users with email..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {/* Confirmation dialog */}
          {confirmDeleteUser && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this user?</p>
              <button onClick={handleDeleteConfirmation}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          )}
          <table className="users_table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Subscribe</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers &&
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.subscribe ? "Yes" : "No"}</td>
                    <td>{user.roll}</td>
                    <td>
                      <button onClick={() => handleClick(user._id)}>DELETE</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

        </>
      )}
    </div>
  );
}