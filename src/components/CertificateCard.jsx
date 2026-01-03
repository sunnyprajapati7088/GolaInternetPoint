import React from "react";
// import QRCode from "react-qr-code";
import "./Marksheet.css";
import Qbarcode from "./Qbarcode";

const marksheetData = {
  institute: "  Gola Computer Education Skills Development Foundation ",
  course: "Advance Diploma in Computer Application",
  student: {
    name: "MOHIT KUMAR",
    regNo: "AICT1440519",
    fatherName: "JAHENDRA SINGH",
    dob: "01-Jun-2000",
    duration: "12 Months",
    session: "NOV-2024 TO OCT-2025",
  },
  subjects: [
    { code: "ADCA101", name: "Fundamental & Basic Computer", max: 100, marks: 90 },
    { code: "ADCA102", name: "Windows Operating System", max: 100, marks: 90 },
    { code: "ADCA103", name: "Microsoft Office", max: 100, marks: 88 },
    { code: "ADCA104", name: "Adobe Photoshop", max: 100, marks: 89 },
    { code: "ADCA105", name: "Page Maker & Corel Draw", max: 100, marks: 84 },
    { code: "ADCA106", name: "Internet & Email", max: 100, marks: 92 },
    { code: "ADCA107", name: "Tally Prime", max: 100, marks: 81 },
    { code: "ADCA108", name: "Project", max: 100, marks: 89 },
  ],
};

function CertificateCard() {
  const total = marksheetData.subjects.reduce((a, b) => a + b.marks, 0);

  return (
    <div  className="marksheet-container">
      {/* <div>
        <button  onClick={()=>window.print()}>
          print
        </button>
      </div> */}
      <div className="marksheet">

      {/* HEADER */}
      <div className="header">
        <img src="/logoInternetPoint.png" alt="logo" className="logo" />

        <div className="qr-boxdata">
          <div className="qr-reg">
            Regis No:<span>{marksheetData.student.regNo}</span>
          </div>
          <Qbarcode />
        </div>
      </div>

      {/* CENTER AUTHORITY */}
      <div className="center-authority">
        <h3>GCE &amp; SDF</h3>
        <h4>EDUCATION AND SKILL DEVELOPMENT FOUNDATION</h4>
        <p>Ministry of Corporate Affairs Govt. of India</p>
        <p>NITI Aayog & MSME – Govt. of India</p>
        <p className="reg">ISO 9001:2015 & 14001:2015 Certified</p>
        <p className="address">
          R.S.P. Inter College Road, Seohara (Bijnor)-246746 U.P India
        </p>
      </div>

      {/* RIBBON */}
      <div className="ribbon">MARKSHEET</div>

      <h4 className="course-title">
        ADVANCE DIPLOMA IN COMPUTER APPLICATION
      </h4>

      {/* STUDENT INFO */}
      <div className="student-info">
        <p><b>Name:</b> {marksheetData.student.name}</p>
        <p><b>Registration No:</b> {marksheetData.student.regNo}</p>
        <p><b>Father Name:</b> {marksheetData.student.fatherName}</p>
        <p><b>DOB:</b> {marksheetData.student.dob}</p>
        <p><b>Duration:</b> {marksheetData.student.duration}</p>
        <p><b>Session:</b> {marksheetData.student.session}</p>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>S.No.</th>
            <th>Subject</th>
            <th>Paper Code</th>
            <th>Max</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {marksheetData.subjects.map((s, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.code}</td>
              <td>{s.max}</td>
              <td>{s.marks}</td>
            </tr>
          ))}
          {/* Total Row */}
          <tr style={{ backgroundColor: "#f2f2f2", fontWeight: "bold" }}>
            <td colSpan="3" style={{ textAlign: "right" }}>Total</td>
            <td>800</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>

      <div className="footer">Director</div>
    </div>
    </div>
  );
}

export default CertificateCard;
