import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaChalkboardTeacher, FaLaptopCode, FaUserGraduate, FaBars, FaTimes } from 'react-icons/fa';
import useScreenWidth from "../../components/useScreenWidth";

// --- Data Constants ---
const partnersData = [
  { id: 1, name: "NIELIT", logo: "/nelit.jpg" },
  { id: 2, name: "Digital India", logo: "/digitalIndia.jpg" },
  { id: 3, name: "NSDC", logo: "/nsdc.jpg" },
  { id: 4, name: "ISO 9001", logo: "/iso.jpg" },
];

const courses = [
  { id: 1, title: "ADCA (Advanced Diploma)", icon: "🎓", description: "Comprehensive long-term program covering advanced software & programming.", courseImg: "https://www.godcomputerinstitute.com/assets/images/course/god-computer-training-institute-15052025190526.webp" },
  { id: 2, title: "Video Editing", icon: "🎬", description: "Learn professional video editing techniques and software tools like Premiere Pro.", courseImg: "https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/403/posts/107607/final_image/video_editing_03.jpg" },
  { id: 3, title: "Digital Marketing", icon: "📈", description: "Master SEO, social media marketing, and paid advertising strategies.", courseImg: "https://iidmc.org/blog/uploads/images/202403/image_870x_65f15d4f1255f.jpg" },
  { id: 4, title: "CCC (Computer Concepts)", icon: "💻", description: "Essential training on basic computer usage, OS, and internet skills.", courseImg: "https://www.vidyacomputers.com/uploads/course/material/7/V-008_logo.jpg" },
  { id: 5, title: "DCA (Diploma)", icon: "📚", description: "Fundamental program covering office tools and basic computing concepts." },
  { id: 6, title: "Tally Prime + GST", icon: "💰", description: "Master accounting, inventory, and taxation with Tally Prime." },
  { id: 7, title: "MS Office Suite", icon: "📄", description: "Proficiency in Word, Excel, PowerPoint for office productivity.", courseImg: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60" },
  { id: 8, title: "Computer Basics", icon: "🖱️", description: "Intro to hardware, software, file management, and digital literacy.", courseImg: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60" },
  { id: 9, title: "Graphic Designing", icon: "🖼️", description: "Visual communication skills using Photoshop, CorelDraw, and Illustrator.", courseImg: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60" },
  { id: 10, title: "Web Development", icon: "⚙️", description: "Build websites with HTML, CSS, JavaScript, and backend integration.", courseImg: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60" },
  { id: 11, title: "Tally ERP 9 + GST", icon: "📊", description: "Classic accounting training with GST compliance functionality." },
  { id: 12, title: "Internet Course", icon: "🌐", description: "Guide to safe browsing, email, and effective online communication.", courseImg: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60" },
  { id: 13, title: "Hindi Typing", icon: "⌨️", description: "type efficiently in Hindi using various keyboard layouts." },
  { id: 14, title: "English Typing", icon: "⌨️", description: "Improve typing speed and accuracy in English with proper technique." },
  { id: 15, title: "CCA Course", icon: "🎨", description: "Certificate in Computer Applications for beginners." },
  { id: 16, title: "DFA (Financial Acct)", icon: "📐", description: "Diploma in Financial Accounting covering finance principles.", courseImg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80" },
  { id: 17, title: "PGDCA", icon: "🎓", description: "Post Graduate Diploma for advanced IT career prospects.", courseImg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" },
  { id: 18, title: "Photoshop", icon: "🎨", description: "Master image editing and manipulation with Adobe Photoshop.", courseImg: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60" },
  { id: 19, title: "Accountancy DCA", icon: "📊", description: "1-Year Diploma combining computer apps with accounting.", courseImg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80" },
  { id: 20, title: "C++ Programming", icon: "💻", description: "Object-oriented programming logic and development in C++.", courseImg: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60" },
  { id: 21, title: "Python Programming", icon: "🐍", description: "Versatile language for web, data science, and automation.", courseImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/330px-Python-logo-notext.svg.png" },
  { id: 22, title: "Beautician Course", icon: "💄", description: "Vocational training for beauty and wellness industry careers.", courseImg: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60" },
  { id: 25, title: "Data Entry Operator", icon: "⌨️", description: "Speed and accuracy training for data processing jobs.", courseImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60" },
  { id: 26, title: "Diploma in Multimedia", icon: "🎥", description: "Animation, audio-video production, and visual effects.", courseImg: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80" }
];

const bannerSlides = [
  {
    title: "Future-Proof Your Career",
    subtitle: "Expert-led training in top tech stacks.",
    color: "bg-indigo-600",
    largeImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765092202/a4233470-384e-4fa5-8ef5-4041832f33ac_bkncyg.jpg",
    smImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765094319/WhatsApp_Image_2025-11-16_at_6.13.48_AM_qwiwel.jpg"
  },
  {
    title: "Learn Data Science & AI",
    subtitle: "Transform raw data into business insights.",
    color: "bg-teal-600",
    largeImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765092202/a4233470-384e-4fa5-8ef5-4041832f33ac_bkncyg.jpg",
    smImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765094319/WhatsApp_Image_2025-11-16_at_6.13.48_AM_qwiwel.jpg"
  },
  {
    title: "Master Modern Web Dev",
    subtitle: "Build responsive apps from scratch.",
    color: "bg-purple-600",
    largeImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765092202/a4233470-384e-4fa5-8ef5-4041832f33ac_bkncyg.jpg",
    smImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765094319/WhatsApp_Image_2025-11-16_at_6.13.48_AM_qwiwel.jpg"
  },
];

const carouselData = [
  { id: 1, title: "Admissions Open 2025", subtitle: "Computer Education & Online Services" },
];

// --- Sub-Components ---

const Marquee = () => (
  <div className="bg-red-600 text-white py-2 overflow-hidden relative z-20">
    <div className="flex w-max animate-marquee gap-10 font-semibold text-sm sm:text-base tracking-wide">
      {[1, 2, 3, 4].map((i) => (
        <span key={i}>
          🚀 Admissions Open | Computer Courses | Online Services | Government Forms | ISO Certified Institute | Call Now 📞
        </span>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
    `}</style>
  </div>
);

const Header = () => {
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gray-900 text-gray-300 py-2 text-xs sm:text-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <FaMapMarkerAlt className="text-indigo-400" /> Bijnor, UP
            </span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <FaEnvelope className="text-indigo-400" /> helpgola@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">ISO 9001:2015</span>
            <span className="hidden sm:inline">Govt. Regd. Institute</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Brand Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                {/* Logo Highlight Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-indigo-600 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
                <img src="/logoInternetPoint.png" alt="Gola Logo" className="h-14 w-auto relative z-10 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 bg-[length:200%_auto] animate-gradient-x">
                  Gola Internet Point
                </span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] border-l-2 border-orange-500 pl-2 mt-1 group-hover:text-indigo-600 transition-colors">
                  Education & Skills
                </span>
              </div>
            </motion.div>

            {/* Desktop Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              {/* Call Button (Icon on mobile, Text on desktop) */}
              <button
                onClick={() => window.location.href = 'tel:+917017906951'}
                className="group flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium text-sm"
                title="Call Us"
              >
                <FaPhoneAlt className="text-sm sm:mr-2" />
                <span className="hidden sm:inline">7017906951</span>
              </button>

              {/* Login Link */}
              <Link
                to="/login"
                className="hidden sm:block text-gray-600 hover:text-indigo-600 font-semibold text-sm transition-colors"
              >
                Student Login
              </Link>

              {/* Apply Button */}
              <button
                onClick={() => document.getElementById('apply').scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </header>
    </>
  );
};

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const isDesktop = useScreenWidth(640);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full h-auto"
        >
          <img
            src={isDesktop ? bannerSlides[current].largeImgUrl : bannerSlides[current].smImgUrl}
            alt={bannerSlides[current].title}
            className="w-full h-auto block"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {bannerSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const PartnersCarousel = () => (
  <section className="py-10  border-b border-gray-100 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
      <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Trusted Partners</p>
    </div>
    <div className="relative w-full">
      <div className="flex w-max animate-partners gap-16 items-center px-4">
        {[...partnersData, ...partnersData, ...partnersData].map((partner, index) => (
          <div key={index} className=" transition-all duration-300  hover:opacity-100">
            <img src={partner.logo} alt={partner.name} className="h-12 w-auto object-cover" />
          </div>
        ))}
      </div>
    </div>
    <style>{`
        @keyframes partners-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-partners {
          animation: partners-scroll 40s linear infinite;
        }
      `}</style>
  </section>
);

const CoursesGrid = () => (
  <section id="courses" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-gray-900 mb-4"
        >
          Explore Our Courses
        </motion.h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From basic computer skills to advanced programming, we have the right course to elevate your career.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {courses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Image Area */}
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              {course.courseImg ? (
                <img
                  src={course.courseImg}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-6xl">
                  {course.icon}
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{!course.courseImg && course.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6 min-h-[40px]">
                {course.description}
              </p>
              <button onClick={() => document.getElementById('apply').scrollIntoView({ behavior: 'smooth' })} className="w-full py-2.5 rounded-lg border border-indigo-100 text-indigo-600 font-semibold text-sm hover:bg-indigo-600 hover:text-white transition-all duration-300">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const DirectorMessage = () => (
  <section className="py-20 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute -left-20 top-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
    <div className="absolute -right-20 bottom-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Text Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">From the Desk of</h3>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">The Founder Director</h2>

            <div className="prose text-gray-600 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Welcome to <strong>Gola Computer Education & Skills Development Foundation</strong>.
                We are driven by a singular mission: to empower the youth of our nation with cutting-edge
                Information Technology skills that are pertinent to today's digital economy.
              </p>
              <p>
                Thousands of our students have successfully transitioned into rewarding careers in
                Graphic Design, Web Development, Accounting, and Network Engineering. We believe that
                quality education is the bridge between potential and success.
              </p>
              <p className="hidden sm:block">
                With our expert faculty and state-of-the-art infrastructure, we are committed to providing
                a learning environment that fosters innovation, critical thinking, and professional growth.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="text-2xl font-caveat text-indigo-800 font-bold">Pintu Prajapati</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">Founder Director, GCE & SDF</p>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-600 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20" />
              <img
                src="/Pintu.jpg"
                alt="Pintu Prajapati"
                className="relative rounded-[2rem] shadow-lg w-72 sm:w-80 object-cover aspect-[3/4] z-10 transform group-hover:-translate-y-2 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);

const ApplyForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const sendData = new FormData();
    sendData.append("access_key", "d94072f8-28ac-4a04-a1c8-d506c74779fd");
    Object.keys(formData).forEach(key => sendData.append(key, formData[key]));

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: sendData });
      const result = await response.json();
      if (result.success) {
        alert(`Thank you ${formData.name}! Application submitted.`);
        setFormData({ name: "", email: "", phone: "", course: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="py-24 bg-indigo-900 relative">
      {/* Decorative BG */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* Left Side: Info */}
          <div className="bg-indigo-600 p-10 md:w-1/3 flex flex-col justify-between text-white">
            <div>
              <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                Fill out the form to book your seat. We will get back to you within 24 hours.
              </p>
            </div>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center gap-3"><FaPhoneAlt /> +91 7017906951</div>
              <div className="flex items-center gap-3"><FaEnvelope /> helpgola@gmail.com</div>
              <div className="flex items-center gap-3"><FaMapMarkerAlt /> Bijnor, UP</div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10 md:w-2/3 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required pattern="[0-9]{10}"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Interested Course</label>
                <select name="course" value={formData.course} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="" disabled>Select a course...</option>
                  {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2 space-y-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">Gola Internet Point</h3>
        <p className="text-sm leading-relaxed max-w-sm">
          Empowering the next generation with future-ready skills. Join us to transform your digital literacy and career prospects.
        </p>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-4 text-lg">Quick Contact</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-indigo-400 mt-1">📍</span>
            <span>R.S.P Inter College Road, Syohara (Bijnor) - 246746</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-indigo-400">📞</span>
            <span>+91 7017906951</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-indigo-400">📧</span>
            <span>helpgola@gmail.com</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-4 text-lg">Socials</h4>
        <div className="flex gap-4">
          {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
      &copy; {new Date().getFullYear()} Gola Computer Education & Skills Development Foundation. All rights reserved.
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a
    href="https://wa.me/917017906951"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 p-4 bg-green-500 text-white rounded-full shadow-[0_4px_14px_0_rgba(72,187,120,0.5)] hover:bg-green-600 hover:scale-110 active:scale-95 transition-all duration-300"
  >
    <FaWhatsapp size={32} />
  </a>
);

// --- Main Page Component ---
export default function LandingComponent() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Marquee />
      <Header />
      <main className="flex-grow">
        <Banner />
        <DirectorMessage />
        <CoursesGrid />
        <ApplyForm />
        <PartnersCarousel />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
