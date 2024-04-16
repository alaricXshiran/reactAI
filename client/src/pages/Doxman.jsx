import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Doxman() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(''); // State for filename
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      return alert('Please select a file');
    }
    if (!filename) {
      return alert('Please enter a filename');
    }
  
    setUploading(true);
  
    // Get the file extension
    const fileExtension = file.name.split('.').pop();
  
    // Construct a new filename with the desired name and file extension
    const newFilename = `${filename}.${fileExtension}`;
  
    const formData = new FormData();
    formData.append('file', file, newFilename); // Append file with the new filename
  
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const data = await response.json();
      setUploadStatus(data.message);
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const moveToAdmin = () => {
    navigate('/Admin');
  };

  return (
    <div className="chat_container">
      <button onClick={moveToAdmin}>Back To Admin</button>
      <h1>Manage Documents</h1>
      <h2>Welcome Admin {user.name}</h2>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      <input
        type="text"
        value={filename}
        onChange={handleFilenameChange}
        placeholder="Enter filename"
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      <div>{uploadStatus}</div>
      



    </div>
  );
}