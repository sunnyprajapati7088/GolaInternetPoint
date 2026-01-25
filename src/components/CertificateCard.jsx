import React from "react";
// import QRCode from "react-qr-code";
import "./Marksheet.css";
import Qbarcode from "./Qbarcode";
import QRCode from "react-qr-code";

function CertificateCard({ data }) {
  // Use passed data or fall back to empty defaults safely

  // const data = {
  //   institute: "  Gola Computer Education Skills Development Foundation ",
  //   course: "Advance Diploma in Computer Application",
  //   student: {
  //     name: "MOHIT KUMAR",
  //     regNo: "AICT1440519",
  //     fatherName: "JAHENDRA SINGH",
  //     dob: "01-Jun-2000",
  //     duration: "12 Months",
  //     session: "NOV-2024 TO OCT-2025",
  //   },
  //   subjects: [
  //     { code: "ADCA101", name: "Fundamental & Basic Computer", max: 100, marks: 90 },
  //     { code: "ADCA102", name: "Windows Operating System", max: 100, marks: 90 },
  //     { code: "ADCA103", name: "Microsoft Office", max: 100, marks: 88 },
  //     { code: "ADCA104", name: "Adobe Photoshop", max: 100, marks: 89 },
  //     { code: "ADCA105", name: "Page Maker & Corel Draw", max: 100, marks: 84 },
  //     { code: "ADCA106", name: "Internet & Email", max: 100, marks: 92 },
  //     { code: "ADCA107", name: "Tally Prime", max: 100, marks: 81 },
  //     { code: "ADCA108", name: "Project", max: 100, marks: 89 },
  //   ],
  // };



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
      <div className="marksheet border-4 border-double border-gray-800 p-4 max-w-4xl mx-auto relative pb-32 overflow-hidden">

        {/* WATERMARK LAYER (HTML TEXT) */}
        <div className="absolute inset-0 z-0 grid grid-cols-7  content-center justify-items-center pointer-events-none select-none overflow-hidden opacity-50">
          {Array.from({ length: 300 }).map((_, i) => (
            <span key={i} className=" text-lg whitespace-nowrap text-[#fcff55]" style={{ fontFamily: 'Arial' }}>
              GCE&SDF
            </span>
          ))}
        </div>

        {/* HEADER */}
        <div className="header flex justify-between items-center mb-2">
          <img src="/logoInternetPoint.png" alt="logo" className="logo h-[110px] w-auto object-contain" />

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
          <span className="text-[25px] font-bold   w-[900px] ml-[180px] mb-[-10px]">Authorized Study Center of</span>
          <span className="text-[44px] font-bold text-[#e65100]   ml-[150px] mb-[-10px] font-bahnschrift">GOLA COMPUTER </span>
          <span className="text-[25px] font-bold  text-[#e65100]  w-[900px] ml-[10px] font-bahnschrift">EDUCATION AND SKILL'S DEVELOPMENT FOUNDATION</span>
          <span className="text-[25px] font-bold text-center text-blue-900">An Organization Run & Registered By</span>
          <span className="text-md text-center font-bold">Registrar Firms, Societies and Chits, Government of UP</span>
          <span className="text-md text-center font-bold">Ministry of Corporate Affairs Govt. of India</span>
          <span className="text-md text-center font-bold">NITI Aayog & MSME – Govt. of India</span>
          <h5 className="reg font-bold mt-1 text-center">ISO 9001:2015 & 14001:2015 Certified</h5>
          <h5 className="reg font-bold mt-1 text-center text-blue-900 ">
            Registered Office: Near R.S.P. Inter College Road, Seohara (Bijnor)-246746 U.P India
          </h5>
        </div>

        {/* RIBBON */}
        <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768834916/MarksheetLogos_bonysb.png" className="h-14 w-[280px] ml-[210px] mt-1 mb-2" alt="" />

        <h4 className="course-title text-center text-xl font-bold uppercase  border-b-2 border-gray-300  mx-auto max-w-2xl">
          {courseId?.name || "Certificate Course"}
        </h4>

        {/* studentId INFO */}
        {/* studentId INFO */}
        <div className="w-full mb-4">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {/* Left Column */}
            <div className="space-y-2">
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">REGISTRATION NO.</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black">{studentId?.registrationId}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">STUDENT NAME</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black uppercase">{studentId?.name}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">COURSE CODE</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black">{courseId?.code || "ADCA"}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">DURATION</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black uppercase">{courseId?.duration || "12 Months"}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="">
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">MARKS SHEET NO.</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black">{studentId?.registrationId ? `MS${studentId.registrationId.slice(-6)}` : "N/A"}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">S/O, D/O, W/O</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black uppercase">{studentId?.studentProfile?.fatherName || "-"}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">DATE OF BIRTH</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black">{formatDate(studentId?.studentProfile?.dateOfBirth)}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-blue-900 w-40">SESSION</span>
                <span className="mx-2">:</span>
                <span className="font-bold text-black uppercase">{studentId?.studentProfile?.admissionYear || "2023-2024"}</span>
              </div>
            </div>
          </div>
        </div>



        {/* TABLE */}
        <table className="w-full border-collapse border border-gray-400 mb-1 text-xs [&_th]:!text-xs [&_td]:!text-xs">
          <thead className="text-center bg-[#5a7ec9]">
            <tr className="bg-[#5a7ec9] text-black">
              <th className="border border-gray-400 p-2 text-center w-16">SL. NO.</th>
              <th className="border border-gray-400 p-2 text-left">COURSE/SUBJECT/MODULES</th>
              <th className="border border-gray-400 p-2 text-center w-32">FULL MARKS</th>
              <th className="border border-gray-400 p-2 text-center w-32">MARKS SECURED</th>
            </tr>
          </thead>
          <tbody>
            {displaySubjects.map((s, i) => (
              <tr key={i}>
                <td className="border border-gray-400 p-2 text-center font-semibold">{i + 1}</td>
                <td className="border border-gray-400 p-2 uppercase !text-left pl-4">{s.subjectId?.name || s.name}</td>
                <td className="border border-gray-400 p-2 text-center font-semibold">{s.maxMarks}</td>
                <td className="border border-gray-400 p-2 text-center font-semibold">{s.marksObtained}</td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="text-black font-bold">
              <td colSpan="2" className="border border-gray-400 p-2 text-right pr-4 uppercase bg-[#5a7ec9]  ">Total</td>
              <td className="border border-gray-400 p-2 text-center bg-[#5a7ec9] text-black">{totalMarks}</td>
              <td className="border border-gray-400 p-2 text-center bg-[#5a7ec9] text-black">{totalObtained}</td>
            </tr>
          </tbody>
        </table>

        {/* PERCENTAGE & GRADE */}
        <div className="flex justify-between items-center mb-2 font-bold text-sm text-blue-900 uppercase ">
          <p>PERCENTAGE : <span className="text-black">{((totalObtained / totalMarks) * 100).toFixed(2)}%</span></p>
          <p>GRADE : <span className="text-black">{grade || "A"}</span></p>
        </div>

        {/* LEGEND & FOOTER */}
        <div className=" ">
          <div className="text-left text-[12px] font-bold text-black mb-1">
            Grade Distinction : (40% to 49%) D, (50% to 59%) C, (60% to 69%) B, (70% to 79%) A, (80% to 89%) A+,(90% to 100%) A++
          </div>
          <div className="text-left font-bold text-black text-lg">
            Website-www.golainternet.com
          </div>


        </div>
        <div className="flex justify-between items-end absolute bottom-5 left-0 w-full px-12">
          <div className="flex gap-4">

            <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768356535/msme_pohfbu.png" alt="" className="w-[90px] h-[90px]" />
            <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768357601/ISO_MarkSheet_yyte0p.png" alt="" className="w-[90px] h-[90px]" />

            <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768922275/Verified_jdhevq.jpg" alt="" className="w-[100px] h-[100px]" />
          </div>
          <img src="https://res.cloudinary.com/dfgdj0zcg/image/upload/v1768839355/Stamp_2_t76tzm.png" alt="" className="w-[250px]   h-[125px]   " />

        </div>
      </div>

    </div >
  );
}

export default CertificateCard;
