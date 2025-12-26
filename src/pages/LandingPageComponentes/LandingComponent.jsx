import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
const partnersData = [
  {
    id: 1,
    name: "NIELIT",
    logo: "/partners/nielit.png",
  },
  {
    id: 2,
    name: "Digital India",
    logo: "/partners/digital-india.png",
  },
  {
    id: 3,
    name: "NSDC",
    logo: "/partners/nsdc.png",
  },
  {
    id: 4,
    name: "ISO 9001",
    logo: "/partners/iso.png",
  },
  {
    id: 5,
    name: "NIELIT",
    logo: "/partners/nielit.png",
  },
  {
    id: 6,
    name: "Digital India",
    logo: "/partners/digital-india.png",
  },
];

const courses = [
  // --- Original Courses ---
  { 
    id: 1, 
    title: "ADCA (Advanced Diploma in Computer Applications)", 
    icon: "🎓", 
    description: "A comprehensive, long-term program covering advanced software applications and programming basics.", 
    courseImg: "https://www.godcomputerinstitute.com/assets/images/course/god-computer-training-institute-15052025190526.webp" 
  },
  
  { 
    id: 2, 
    title: "Video Editing", 
    icon: "🎬", 
    description: "Learn professional video editing techniques and software tools.", 
    courseImg: "https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/403/posts/107607/final_image/video_editing_03.jpg" 
  },
  
  { 
    id: 3, 
    title: "Digital Marketing Basics", 
    icon: "📈", 
    description: "SEO, social media, and paid advertising fundamentals.", 
    courseImg: "https://iidmc.org/blog/uploads/images/202403/image_870x_65f15d4f1255f.jpg" 
  },

  // --- New Courses Added ---
  { 
    id: 4, 
    title: "CCC (Course on Computer Concepts)", 
    icon: "💻", 
    description: "Essential training on basic computer usage, operating systems, and internet skills.", 
    courseImg: "https://www.vidyacomputers.com/uploads/course/material/7/V-008_logo.jpg" 
  },
  
  { 
    id: 5, 
    title: "DCA (Diploma in Computer Applications)", 
    icon: "📚", 
    description: "Fundamental program covering key office tools, basic computing concepts, and practical software use.", 
    // courseImg: DCA
  },
  { 
    id: 6, 
    title: "Tally Prime + GST", 
    icon: "💰", 
    description: "Master accounting, inventory management, and tax compliance using Tally Prime and GST laws.", 
    // courseImg:TallyPrime,
  },
  
  { 
    id: 7, 
    title: "MS Office Suite", 
    icon: "📄", 
    description: "Proficiency in Word, Excel, PowerPoint, and Outlook for essential office productivity tasks.", 
    courseImg: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 8, 
    title: "Computer Basics", 
    icon: "🖱️", 
    description: "Introduction to hardware, software, files management, and fundamental digital literacy.", 
    courseImg: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 9, 
    title: "Graphic Designing", 
    icon: "🖼️", 
    description: "Advanced visualization and creative skills, including branding and UI/UX fundamentals.", 
    courseImg: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 10, 
    title: "Web Development", 
    icon: "⚙️", 
    description: "Front-end and back-end basics using HTML, CSS, JavaScript, and database integration.", 
    courseImg: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 11, 
    title: "Tally ERP 9 With GST", 
    icon: "📊", 
    description: "Comprehensive training on Tally ERP 9 accounting software with GST implementation.", 
    // courseImg: Tally,
  },
  
  { 
    id: 12, 
    title: "Internet Course", 
    icon: "🌐", 
    description: "Complete guide to internet usage, browsing, online safety, and digital communication.", 
    courseImg: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 13, 
    title: "Hindi Typing", 
    icon: "⌨️", 
    description: "Learn to type efficiently in Hindi using various keyboard layouts and software.", 
    courseImg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 14, 
    title: "English Typing", 
    icon: "⌨️", 
    description: "Improve typing speed and accuracy in English with proper technique and practice.", 
    courseImg: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 15, 
    title: "CCA Course", 
    icon: "🎨", 
    description: "Computer Concepts and Applications course covering fundamental computer skills.", 
    courseImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 16, 
    title: "DFA Course", 
    icon: "📐", 
    description: "Diploma in Financial Accounting - comprehensive accounting and finance training.", 
    courseImg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80" 
  },
  
  { 
    id: 17, 
    title: "PGDCA", 
    icon: "🎓", 
    description: "Post Graduate Diploma in Computer Applications - advanced computer applications program.", 
    courseImg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 18, 
    title: "Photoshop", 
    icon: "🎨", 
    description: "Professional photo editing and graphic design using Adobe Photoshop.", 
    courseImg: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 19, 
    title: "Accountancy DCA 1 Year Course", 
    icon: "📊", 
    description: "One-year diploma combining computer applications with accounting principles.", 
    courseImg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80" 
  },
  
  { 
    id: 20, 
    title: "C++ Programming", 
    icon: "💻", 
    description: "Learn object-oriented programming and software development using C++.", 
    courseImg: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 21, 
    title: "Python Programming", 
    icon: "🐍", 
    description: "Beginner to advanced Python programming for applications and data science.", 
    courseImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/330px-Python-logo-notext.svg.png"
  },
  { 
    id: 22, 
    title: "Beautician Course", 
    icon: "💄", 
    description: "Professional beauty and skincare training for salon and spa careers.", 
    courseImg: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60" 
  },
  

  
  { 
    id: 25, 
    title: "Data Entry Operator Course", 
    icon: "⌨️", 
    description: "Training in fast and accurate data entry, keyboard skills, and office software.", 
    courseImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60" 
  },
  
  { 
    id: 26, 
    title: "Diploma in Multimedia", 
    icon: "🎥", 
    description: "Comprehensive multimedia training including animation, video, and audio production.", 
    courseImg: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80" 
  }
];
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
function PartnersCarousel() {
  return (
    <section className="bg-indigo-900 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="inline-block bg-black/40 text-white text-xl sm:text-2xl font-semibold px-6 py-2 rounded">
            OUR PARTNERS
          </h2>
          <div className="flex justify-center mt-3">
            <span className="w-10 h-[3px] bg-orange-500 rounded"></span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-partners gap-10 items-center">

            {/* Duplicate list for seamless loop */}
            {[...partnersData, ...partnersData].map((partner, index) => (
              <div
                key={index}
                className="
                  bg-white 
                  rounded-lg 
                  shadow-md 
                  flex 
                  items-center 
                  justify-center 
                  w-40 
                  h-28 
                  sm:w-44 
                  sm:h-32 
                  px-4
                "
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes partners-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-partners {
            animation: partners-scroll 35s linear infinite;
          }
        `}
      </style>
    </section>
  );
}



const carouselData = [
  {
    id: 1,
    title: "Admissions Open 2025",
    subtitle: "Computer Education & Online Services",
    image: "/slide1.jpg",
  },
//   {
//     id: 2,
//     title: "ISO 9001:2015 Certified Institute",
//     subtitle: "Trusted & Recognized Education Center",
//     image: "/carousel/slide2.jpg",
//   },
//   {
//     id: 3,
//     title: "All Government Services Available",
//     subtitle: "Jan Seva Kendra | Online Forms",
//     image: "/carousel/slide3.jpg",
//   },
];


function DirectorMessage() {
  return (
    <section className="sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10">
          Founder Director&apos;s Message
        </h2>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

            {/* Image Column */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="/Pintu.jpg"
                alt="Founder Director"
                className="
                  rounded-2xl 
                  shadow-lg
                  w-60 
                  sm:w-72 
                  md:w-80
                  h-auto
                  object-cover
                "
              />
            </div>

            {/* Text Column */}
            <div className="lg:col-span-2 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                Firstly, I would like to welcome you to our{" "}
                <strong>  GCE &amp; SDF 
            Gola Computer Education
            Education &amp; Skills Development Foundation</strong>.
                We are equipped with the most advanced and professional courses
                offered in the field of Information Technology.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                Many young students have enrolled with us and built successful
                careers in Computer Teaching, Graphic Designing, Web Development,
                Accounting, Programming, Hardware, and Networking.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                I am gratified that you have chosen our institute as your platform
                for success. The IT industry is growing rapidly and creating a
                strong demand for skilled professionals.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                Our programs are designed to meet the needs of students and working
                professionals seeking to upgrade their technical knowledge and skills.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-6">
                With expert faculty and modern technology, we ensure high-quality
                education and provide the perfect launchpad for your career.
              </p>

              {/* Signature */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-700">
                  Pintu Prajapati
                </h3>
                <p className="text-gray-600 text-sm sm:text-base font-medium">
                  Founder Director
                </p>
                <p className="text-gray-700 text-sm sm:text-base font-semibold">
                  GCE &amp; SDF 
           (Gola Computer Education
            Education &amp; Skills Development Foundation)
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
const ApplyForm = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    course: '' 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare formData for Web3Forms
    const sendData = new FormData();
    sendData.append("access_key", "d94072f8-28ac-4a04-a1c8-d506c74779fd");  // <--- ADD YOUR KEY HERE
    sendData.append("name", formData.name);
    sendData.append("email", formData.email);
    sendData.append("phone", formData.phone);
    sendData.append("course", formData.course);

    // Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: sendData
    });

    const result = await response.json();
    setLoading(false);

    if (result.success) {
      alert(`Thank you ${formData.name}! Your application for ${formData.course} has been submitted.`);
      setFormData({ name: "", email: "", phone: "", course: "" });
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <section id="apply" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
        
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide border-b pb-4">
          Apply For a Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="Enter 10-digit mobile number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Course</label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>-- Choose a course --</option>
              {courses.map(c => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-semibold text-white 
                       bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-gray-800 text-white py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Center Info */}
      <div className="md:col-span-2">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Gola Internet Point</h3>
        <p className="text-gray-400 text-sm">Empowering the next generation of tech professionals through expert training and certification.</p>
      </div>

      {/* Contact Details */}
      <div>
        <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Contact Us</h3>
        <p className="text-gray-400 text-sm mb-2">📞 +91 7017906951</p>
        <p className="text-gray-400 text-sm mb-2">📧 helpgola@gmail.com</p>
        <p className="text-gray-400 text-sm">📍 पता:- आर.एस.पी.इण्टर कॉलेज रोड, स्योहारा (बिजनौर)-246746</p>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition"><FaFacebook size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition"><FaTwitter size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-blue-700 transition"><FaLinkedin size={24} /></a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
      &copy; {new Date().getFullYear()} Gola Internet Point. All rights reserved.
    </div>
  </footer>
);

// 7. Fixed WhatsApp Button
const WhatsAppButton = () => (
    <a 
        href="https://wa.me/917017906951" // Replace with your WhatsApp number
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-110"
        title="Chat with us on WhatsApp"
    >
        <FaWhatsapp size={32} />
    </a>
);


const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Red Line */}
      <div className="h-[25px] bg-red-600" />

      {/* Header */}
      <header className="bg-white px-4 sm:px-6 md:px-10 py-5 flex flex-col lg:flex-row items-center justify-between shadow-md gap-6">
        {/* Logo */}
        <div className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-auto">
          <img
            src="/logoInternetPoint.png"
            alt="Logo"
            className="h-[180px] sm:h-[120px] md:h-[200px] w-auto"
          />
        </div>

        {/* Center Content */}
        <div className="text-center flex-1 px-2">
          <h1 className="text-[30px] sm:text-[18px] md:text-[22px] font-bold text-orange-600 uppercase">
            Gola Internet Point
          </h1>

          <h2 className="text-[20px] sm:text-[50px] md:text-[20px] font-bold text-blue-900 uppercase mt-1">
<h1 className="text-[30px] font-bold bg-gradient-to-r from-red-600 to-red-600 text-transparent bg-clip-text">
  GCE &amp; SDF
</h1>
            Gola Computer Education <br />
            Education &amp; Skills Development Foundation
          </h2>

          <p className="text-xs sm:text-sm text-gray-700 mt-2">
            An Organization Run &amp; Registered By
          </p>

          <p className="text-xs sm:text-sm font-semibold text-black">
            Ministry of Corporate Affairs Govt. Of India
          </p>

          <p className="text-xs sm:text-sm text-gray-700">
            Department of Labour, Govt. of NCT, New Delhi NITI Aayog, Govt. of India.
          </p>

          <p className="text-xs sm:text-sm text-gray-700">
            ISO 9001:2015 Certified Institute
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full sm:w-auto justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm px-4 py-2 rounded">
            📞 Call Request
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm px-4 py-2 rounded">
            ✉️ Enquiry
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm px-4 py-2 rounded">
            🏢 Franchise Enquiry
          </button>
        </div>
      </header>

      {/* 🔴 Marquee */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 font-semibold text-sm sm:text-base">
          <span>
            🚀 Admissions Open | Computer Courses | Online Services | Government Forms | ISO Certified Institute | Call Now 📞
          </span>
          <span>
            🚀 Admissions Open | Computer Courses | Online Services | Government Forms | ISO Certified Institute | Call Now 📞
          </span>
        </div>
      </div>

      {/* 🎞️ Carousel Section */}
<section
  className="
    relative 
    w-full 
    overflow-hidden
    h-[220px] 
    sm:h-[300px] 
    md:h-[420px] 
    lg:h-[550px] 
    xl:h-[700px]
  "
>
  {carouselData.map((item, index) => (
    <div
      key={item.id}
      className={`
        absolute inset-0 
        flex items-center justify-center
        transition-opacity duration-1000 ease-in-out
        ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}
      `}
    >
      {/* Fully responsive image – NO crop */}
      <img
        src={item.image}
        alt={item.title}
        className="
          max-w-full 
          max-h-full
          w-auto 
          h-auto 
          object-contain
        "
      />
    </div>
  ))}
</section>

          <DirectorMessage/>
          <ApplyForm/>
            <PartnersCarousel />
           <Footer />
      <WhatsAppButton />
    
      {/* Animations */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default Header;
