import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './css/PdfPage.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfPage({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function goToNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <div className="pdf-container">
      {pdfUrl && (
        <div>
          <div>
            <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>Previous</button>
            <span>Page {pageNumber} of {numPages}</span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</button>
          </div>
          <div className="pdf-page">
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}