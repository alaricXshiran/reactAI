import React from 'react'
import './css/Home.css'

export default function Home() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Set height to fill the viewport
  };

  const iframeStyle = {
    width: '100%', // Fill the width of the container
    height: '100%', // Fill the height of the container
    border: 'none', // Remove the iframe border
  };
  return (
<div style={containerStyle}>
      <iframe 
        title="Constitution PDF"
        src="http://localhost:5173/src/LAW/constitution.pdf" 
        style={iframeStyle}
        
      /> 
    </div>
    
  )
}
