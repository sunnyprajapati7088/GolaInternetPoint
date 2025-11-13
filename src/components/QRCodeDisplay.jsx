import React from 'react';

/**
 * QR Code Placeholder Component
 */
const QRCodeDisplay = ({ value }) => (
  <div className="p-2 bg-white border rounded-lg shadow-inner" title={`QR Code for: ${value}`}>
    {/* This is a placeholder SVG that looks like a QR code */}
    <svg
      width="120"
      height="120"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current text-black"
    >
      <path d="M0 0h90v90H0zM30 30h30v30H30zM166 0h90v90h-90zM196 30h30v30h-30zM0 166h90v90H0zM30 196h30v30H30zM166 166h30v30h-30zM226 166h30v30h-30zM196 196h30v30h-30zM166 226h30v30h-30zM196 226h30v30h-30zM226 226h30v30h-30zM110 50h30v30h-30zM110 110h30v30h-30zM50 110h30v30H50zM110 166h30v30h-30zM50 166h30v30H50zM110 226h30v30h-30zM50 226h30v30H50zM110 0h30v30h-30zM50 0h30v30H50zM50 50h30v30H50z" />
    </svg>
  </div>
);

export default QRCodeDisplay;