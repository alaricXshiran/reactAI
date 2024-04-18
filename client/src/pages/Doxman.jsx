import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import './css/Doxman.css'

export default function Doxman() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for file input element

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(''); // State for filename
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [allImage, setAllImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getPdf();
  }, [rerender]); // Ensure useEffect runs when rerender changes

  const getPdf = async () => {
    try {
      const result = await axios.get('http://localhost:8000/getfiles');
      setAllImage(result.data.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }
  const showPdf = async (pdfFileName) => {
    try {
      const response = await axios.get(`http://localhost:8000/uploads/${pdfFileName}`);
      return{
        response
      }
     
    } catch (error) {
      console.error('Error fetching PDF:', error);
      
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      return setUploadStatus('Please select a file');
    }
    if (!filename) {
      return setUploadStatus('Please enter a filename');
    }
  
    setUploading(true);
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
  
    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
  
      setUploadStatus(response.data.message);
  
      // Update allImage state with the newly uploaded file data
      setAllImage(prevAllImage => [...prevAllImage, response.data.fileData]);
  
      // Clear the inputs after successful upload
      setFile(null);
      setFilename('');
      fileInputRef.current.value = ''; // Reset file input value
      setRerender(prev => !prev); // Trigger rerender
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const moveToAdmin = () => {
    navigate('/Admin');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="chat_container">
      <button onClick={moveToAdmin}>Back To Admin</button>
      <h1>Manage Documents</h1>
      <h2>Welcome Admin {user && user.name ? user.name : ""}</h2>
      <form className='input-files'>
        <input type="file"
          onChange={handleFileChange}
          disabled={uploading}
          required
          ref={fileInputRef} // Attach ref to file input element
        />
        <input
          type="text"
          value={filename}
          onChange={handleFilenameChange}
          placeholder="Enter TITLE"
          disabled={uploading}
          required
        />
        <button onClick={handleUpload} disabled={uploading}>
          <h3>{uploading ? 'Uploading...' : 'Upload File'}</h3>
        </button>
      </form>
      <div>{uploadStatus}</div>

      <form className='view-files'>
        <input
          type="text"
          placeholder="Search Documents"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className='view-box'>
          {allImage && allImage.length > 0 && allImage
            .filter(data => data && data.title && data.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((data, index) => (
              <div className='document-item' key={index}>
                <button className="document-button" onClick={() => showPdf(data.pdf)}>
                  <h6>{data.title}</h6>
                </button>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
}