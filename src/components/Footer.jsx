import React from 'react';

export default function Footer() {
  const footerStyle = {
    backgroundColor: '#222',
    color: '#f1f1f1',
    textAlign: 'center',
    padding: '20px 0',
    fontSize: '16px',
    marginTop: '40px',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    margin: 0,
    fontWeight: 400,
  };

  return (
    <div style={footerStyle}>
      <h3 style={headingStyle}>This is footer</h3>
    </div>
  );
}
