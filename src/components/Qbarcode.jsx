import React from "react";
import QRCode from "react-qr-code";

function Qbarcode() {
  const user = [
    { id: 1 }
  ];

  return (
    <div style={{ textAlign: "center" }}>
      {user.map((item) => (
        <div
          key={item.id}
          style={{
            display: "inline-block",
            padding: "6px",
         
          }}
        >
          {/* QR CODE */}
          <QRCode
            value={`https://ssrctqrcode.vercel.app/qrcode/${item.id}`}
            size={90}              // 🔥 SAME AS MARKSHEET
            bgColor="#ffffff"
            fgColor="#000000"
          />

        
        </div>
      ))}
    </div>
  );
}

export default Qbarcode;
