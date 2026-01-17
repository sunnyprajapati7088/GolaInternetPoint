import React from "react";
// import QRCode from "react-qr-code";
import "./Marksheet.css";
import Qbarcode from "./Qbarcode";
import QRCode from "react-qr-code";

function CertificateCard({ data }) {
  // Use passed data or fall back to empty defaults safely
  const { studentId, courseId, subjects, subjectMarks, totalMarks, totalObtained, grade } = data || {};

  console.log(studentId, courseId, subjects, subjectMarks, totalMarks, totalObtained, grade);
  const displaySubjects = subjectMarks || subjects || [];

  const total = displaySubjects.reduce((a, b) => a + (Number(b.marksObtained) || 0), 0);

  // Helper date formatter
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).toUpperCase();
  };

  return (
    <div className="marksheet-container bg-white text-black p-4">
      <div className="marksheet border-4 border-double border-gray-800 p-4 max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="header flex justify-between items-center mb-6">
          <img src="/logoInternetPoint.png" alt="logo" className="logo h-[151px] w-auto object-contain" />

          <div className="qr-boxdata text-right">
            <div className="qr-reg text-xl">
              Reg. No: <span className="text-red-600">MBD/BIJ/0073759</span>
            </div>
            <div className="w-24 h-24 ml-auto">
              <QRCode
                value={`https://gola-internet-point.vercel.app/scanid/${data?._id}`}
                size={90}              // 🔥 SAME AS MARKSHEET
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>
        </div>

        {/* CENTER AUTHORITY */}
        <div className="mt-[-70px] flex flex-col gap-[-10px]">
          <span className="text-[25px] font-bold   w-[900px] ml-[190px] mb-[-10px]">Authorized Study Center of</span>
          <span className="text-[44px] font-bold text-[#e65100]   ml-[150px] mb-[-10px]">GOLA COMPUTER </span>
          <span className="text-[25px] font-bold  text-[#e65100]  w-[900px] ml-[35px]">EDUCATION AND SKILL DEVELOPMENT FOUNDATION</span>
          <span className="text-[25px] font-bold text-center text-blue-900">An Organization Run & Registered By</span>

          <span className="text-md text-center font-bold">Ministry of Corporate Affairs Govt. of India</span>
          <span className="text-md text-center font-bold">NITI Aayog & MSME – Govt. of India</span>
          <h5 className="reg font-bold mt-1 text-center">ISO 9001:2015 & 14001:2015 Certified</h5>
          <h5 className="address text-md font-bold mt-1 text-center">
            R.S.P. Inter College Road, Seohara (Bijnor)-246746 U.P India
          </h5>
        </div>

        {/* RIBBON */}
        <div className="ribbon bg-blue-900 text-white text-center py-2 font-bold text-xl mb-6 mx-auto w-64 rounded-full">
          MARKSHEET
        </div>

        <h4 className="course-title text-center text-xl font-bold uppercase mb-8 border-b-2 border-gray-300 pb-2 mx-auto max-w-2xl">
          {courseId?.name || "Certificate Course"}
        </h4>

        {/* studentId INFO */}
        <div className="studentId-info grid grid-cols-2 gap-x-8 gap-y-2 mb-8 text-sm">
          <p><b className="min-w-[120px] inline-block">Name:</b> {studentId?.name}</p>
          <p><b className="min-w-[120px] inline-block">Registration No:</b> {studentId?.registrationId}</p>
          <p><b className="min-w-[120px] inline-block">Father Name:</b> {studentId?.studentProfile?.fatherName || "-"}</p>
          <p><b className="min-w-[120px] inline-block">DOB:</b> {formatDate(studentId?.studentProfile?.dateOfBirth)}</p>
          <p><b className="min-w-[120px] inline-block">Duration:</b> {courseId?.duration || "12 Months"}</p>
          <p><b className="min-w-[120px] inline-block">Session:</b> {studentId?.studentProfile?.admissionYear || "2025-2026"}</p>
        </div>



        {/* TABLE */}
        <table className="w-full border-collapse border border-gray-400 mb-2 text-sm">
          <thead>
            <tr className="bg-[#5a7ec9] text-black">
              <th className="border border-gray-400 p-2 text-center w-16">SL. NO.</th>
              <th className="border border-gray-400 p-2 text-left">COURSE/SUBJECT/MODULES</th>
              <th className="border border-gray-400 p-2 text-center">PAPER CODE</th>
              <th className="border border-gray-400 p-2 text-center">FULL MARKS</th>
              <th className="border border-gray-400 p-2 text-center">MARKS SECURED</th>
            </tr>
          </thead>
          <tbody>
            {displaySubjects.map((s, i) => (
              <tr key={i}>
                <td className="border border-gray-400 p-2 text-center font-bold">{i + 1}</td>
                <td className="border border-gray-400 p-2 font-bold uppercase">{s.subjectId?.name || s.name}</td>
                <td className="border border-gray-400 p-2 text-center font-bold">FT</td>
                <td className="border border-gray-400 p-2 text-center font-bold">{s.maxMarks}</td>
                <td className="border border-gray-400 p-2 text-center font-bold">{s.marksObtained}</td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-[#5a7ec9] text-black font-bold">
              <td colSpan="3" className="border border-gray-400 p-2 text-right pr-4 uppercase">Total</td>
              <td className="border border-gray-400 p-2 text-center">{totalMarks}</td>
              <td className="border border-gray-400 p-2 text-center">{totalObtained}</td>
            </tr>
          </tbody>
        </table>

        {/* PERCENTAGE & GRADE */}
        <div className="flex justify-between items-center mb-2 font-bold text-sm text-blue-900 uppercase">
          <p>PERCENTAGE : <span className="text-black">{((totalObtained / totalMarks) * 100).toFixed(2)}%</span></p>
          <p>GRADE : <span className="text-black">{grade || "A"}</span></p>
        </div>

        {/* LEGEND & FOOTER */}
        <div className=" ">
          <div className="text-left text-[10px] font-bold text-black mb-1">
            Grade Distinction (above 90%) A+, (89% to 70%) A, (69 to 50%) B, (49% to 45%) C, Failed F
          </div>
          <div className="text-left font-bold text-black text-lg">
            Website-www.golainternet.com
          </div>

          <div className="flex justify-between items-end px-8 ">
            <div className="flex gap-4">

              <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768356535/msme_pohfbu.png" alt="" className="w-[75px] h-[75px]" />
              <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768357601/ISO_MarkSheet_yyte0p.png" alt="" className="w-[75px] h-[75px]" />
            </div>
            <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768357489/stamp_xldm5g.png" alt="" className="w-[150px]   h-[110px] absolute bottom-4 right-0" />

          </div>
        </div>

      </div>
    </div >
  );
}

export default CertificateCard;
