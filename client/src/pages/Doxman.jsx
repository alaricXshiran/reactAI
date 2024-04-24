import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './css/Doxman.css';
import PdfPage from './PdfPage';

export default function Doxman() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [allImage, setAllImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rerender, setRerender] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin access control

  useEffect(() => {
    getPdf();
    checkAdmin(); // Check if the user is an admin
  }, [rerender]);

  const getPdf = async () => {
    try {
      const result = await axios.get('http://localhost:8000/getfiles');
      setAllImage(result.data.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const checkAdmin = () => {
    if (user && user.roll && user.roll.toLowerCase().includes('admin')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const showPdf = async (pdfFileName) => {
    try {
      const response = await axios.get(`http://localhost:8000/uploads/${pdfFileName}`, {
        responseType: 'arraybuffer'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      setSelectedPdf(URL.createObjectURL(blob));
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

      setUploadStatus(response.data.message);
      setAllImage(prevAllImage => [...prevAllImage, response.data.fileData]);
      setFile(null);
      setFilename('');
      fileInputRef.current.value = '';
      setRerender(prev => !prev);
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
    <div>
      <div className="chat_container">
        {isAdmin && ( // Render content only if the user is an admin
          <>
            <button onClick={moveToAdmin}>Back To Admin</button>
            <h1>Manage Documents</h1>
            <h2>Welcome Admin {user && user.name ? user.name : ""}</h2>
            <form className='input-files'>
              <input type="file"
                onChange={handleFileChange}
                disabled={uploading}
                required
                ref={fileInputRef}
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

            <div className='pdf-container'>
              <PdfPage selectedPdf={selectedPdf} />
            </div>
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
          </>
        )}
      </div>
    </div>
  );
}