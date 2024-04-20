import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfPage from './PdfPage';
import './css/Home.css';

export default function Home() {
  const [allDocuments, setAllDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []); // Run once on component mount

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getfiles');
      setAllDocuments(response.data.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
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
      console.error('Details:', error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDocumentClick = (pdfFileName) => {
    showPdf(pdfFileName);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  };

  return (
    <div>
      <h1>Home Page</h1>
      <PdfPage pdfUrl={selectedPdf} />

      <form className='view-files' onSubmit={handleFormSubmit}> {/* Add onSubmit event handler */}
        <input
          type="text"
          placeholder="Search Documents"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className='view-box'>
          {allDocuments
            .filter(data => data && data.title && data.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((data, index) => (
              <div className='document-item' key={index}>
                <button className="document-button" onClick={() => handleDocumentClick(data.pdf)}>
                  <h6>{data.title}</h6>
                </button>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
}