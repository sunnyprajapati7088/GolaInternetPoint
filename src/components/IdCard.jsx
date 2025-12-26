import React from "react";
import QRCode from "react-qr-code";
import "./Icard.css";

function IdCard() {

  const idData = {
    instituteName: "Gola Computer Education & Skill's Development Foundation",
    logo: "./img/logo.png",        // watermark logo
    student: {
      name: "kumar Kumar",
      studentId: "GCE12345",
      course: "Full Stack Development",
      phone: "9876543210",
      photo: "./img/image.jpeg",
    },
  };

  return (
    <div className="id-card">

      {/* Header */}
      <div className="id-header">
        {idData.instituteName}
      </div>

      {/* Body */}
      <div className="id-body">

        {/* Left */}
        <div className="id-left">
          <p><b>Name:</b> {idData.student.name}</p>
          <p><b>Student ID:</b> {idData.student.studentId}</p>
          <p><b>Course:</b> {idData.student.course}</p>
          <p><b>Phone:</b> {idData.student.phone}</p>
        </div>

        {/* Right */}
        <div className="id-right">
          <img
            src={idData.student.photo}
            alt="Student"
            className="user-photo"
          />

          <div className="qr-box">
            <QRCode
              value={`Name: ${idData.student.name}, ID: ${idData.student.studentId}, Course: ${idData.student.course}`}
              size={56}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default IdCard;
