import React, { useState ,useEffect} from 'react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import useScreenWidth from '../components/useScreenWidth';
import Topper1 from '../assets/Toper1.jpg';
import Topper2 from '../assets/Toper2.jpg';
import Topper3 from '../assets/Toper3.jpg';
import Topper4 from '../assets/Toper4.jpg';
import Topper5 from '../assets/Toper5.jpg';
import Topper6 from '../assets/Toper6.jpg';
import Topper7 from '../assets/Toper7.jpg';
import Topper8 from '../assets/Toper8.jpg';
import Topper9 from '../assets/Toper9.jpg';
import Topper10 from '../assets/Toper10.jpg';
import Topper11 from '../assets/Toper11.jpg';
import Tally from '../assets/Tally.jpg'
import DCA from '../assets/DCA.jpg'
import TallyPrime from '../assets/TallyPrime.jpg'


// --- MOCK DATA ---
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
    courseImg: DCA
  },
  { 
    id: 6, 
    title: "Tally Prime + GST", 
    icon: "💰", 
    description: "Master accounting, inventory management, and tax compliance using Tally Prime and GST laws.", 
    courseImg:TallyPrime,
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
    courseImg: Tally,
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

import pintu from'../assets/pintu.jpg'
const toppers = [
  { id: 1, name: "Aarav Sharma", course: "Web Development", score: "98%", imageUrl:Topper1 },
  { id: 2, name: "Priya Singh", course: "Data Science", score: "96%" , imageUrl:Topper2 },
  { id: 3, name: "Vikram Yadav", course: "Graphic Design", score: "95%", imageUrl:Topper3 },
  { id: 4, name: "Aarav Sharma", course: "Web Development", score: "98%", imageUrl:Topper4 },
  { id: 5, name: "Priya Singh", course: "Data Science", score: "96%" , imageUrl:Topper5 },
  { id: 6, name: "Vikram Yadav", course: "Graphic Design", score: "95%", imageUrl:Topper6 },
  { id: 7, name: "Aarav Sharma", course: "Web Development", score: "98%", imageUrl:Topper7 },
  { id: 8, name: "Priya Singh", course: "Data Science", score: "96%" , imageUrl:Topper8 },
  { id: 9, name: "Vikram Yadav", course: "Graphic Design", score: "95%", imageUrl:Topper9 },
  { id: 10, name: "Aarav Sharma", course: "Web Development", score: "98%", imageUrl:Topper10 },
  { id: 11, name: "Priya Singh", course: "Data Science", score: "96%" , imageUrl:Topper11 },
  


];

// --- COMPONENTS ---

// 1. Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'Courses', 'Apply', 'Toppers', 'Contact'];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <a href="#" className="flex-shrink-0 text-2xl font-bold text-indigo-600">
            [CT Center Name]
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <a 
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150"
              >
                {link}
              </a>
            ))}
            <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg pb-2">
          {navLinks.map(link => (
            <a 
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              {link}
            </a>
          ))}
          <div className="px-4 pt-2">
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};


function DirectorMessage() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
          Founder Director's Message
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-10 bg-white p-8 rounded-2xl shadow-xl">

          {/* ---- Left: Director Photo ---- */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <img 
              src={pintu} 
              alt="Founder Director"
              className="rounded-xl shadow-md w-80 h-[420px] object-cover"
            />
          </div>

          {/* ---- Right: Message ---- */}
          <div className="w-full lg:w-2/3">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Firstly, I would like to welcome you to our <strong>Gola Interpoint Institute of Computer Technology</strong>. We at Gola Interpoint Institute of Computer Technology have been equipped with the most advanced and professional courses offered in the field of Information Technology.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              A lot of young students like you have enrolled with Gola Interpoint Institute of Computer Technology and made a bright & successful career in fields like Computer Teaching, Graphic Designing, Web Development, Accounting, Programming, Hardware and Networking.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              I am gratified that you have chosen Gola Interpoint Institute of Computer Technology as your platform for a successful career. The IT industry has been witnessing tremendous growth and is becoming a knowledge-based global superpower.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              The rapid pace of development has created a strong demand for skilled professionals. Our programs are carefully designed to meet the needs of students as well as individuals seeking to upgrade their IT knowledge and skills.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              We have engaged an expert faculty and employ the latest communication and technological tools to deliver high-quality education across all our centers. Our mission is to provide you with the perfect launchpad to reach new heights in your career.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              I encourage you to make the most of this opportunity and build a proud career with Gola Interpoint Institute of Computer Technology. Wishing you all the best for a bright future!
            </p>

            <div className="mt-6">
              <h3 className="text-2xl font-bold text-indigo-700">Pintu Prajapati</h3>
              <p className="text-gray-600 text-lg font-medium">(Founder Director)</p>
              <p className="text-gray-700 font-semibold">
                Gola Interpoint Institute of Computer Technology
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

const bannerSlides = [
    { 
        title: "Future-Proof Your Career", 
        subtitle: "Expert-led training in top tech stacks.", 
        color: "bg-indigo-500",
        largeImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765092202/a4233470-384e-4fa5-8ef5-4041832f33ac_bkncyg.jpg", 
        smImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765094319/WhatsApp_Image_2025-11-16_at_6.13.48_AM_qwiwel.jpg"  
    },
    { 
        title: "Learn Data Science & AI", 
        subtitle: "Transform raw data into business insights.", 
        color: "bg-teal-500",
        largeImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765092202/a4233470-384e-4fa5-8ef5-4041832f33ac_bkncyg.jpg",
        smImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765094319/WhatsApp_Image_2025-11-16_at_6.13.48_AM_qwiwel.jpg"
    },
    { 
        title: "Master Modern Web Development", 
        subtitle: "Build responsive apps from scratch.", 
        color: "bg-purple-500",
        largeImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765092202/a4233470-384e-4fa5-8ef5-4041832f33ac_bkncyg.jpg",
        smImgUrl: "https://res.cloudinary.com/drz6fzlpu/image/upload/v1765094319/WhatsApp_Image_2025-11-16_at_6.13.48_AM_qwiwel.jpg"
    },
];
// 2. Carousel/Banner Section
const Banner = () => {
  const slides = bannerSlides;
  const [current, setCurrent] = useState(0);
  const isDesktop = useScreenWidth(640); // Check screen size for image switch

  const prevSlide = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  const nextSlide = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  
  // Auto-slide effect (Optional)
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, [current]);

  return (
    <section id="home" className="relative h-96 sm:h-[400px] lg:h-[500px] overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => {
          // Choose image and size based on screen width
          const imageUrl = isDesktop ? slide.largeImgUrl : slide.smImgUrl;
          const bgSize = isDesktop ? 'cover' : 'contain';

          return (
            <div 
              key={index}
              className={`min-w-full flex items-center justify-center text-center p-8 bg-center bg-no-repeat`}
              // Set responsive background image and size
              style={{ 
                backgroundImage: `url(${imageUrl})`, 
                backgroundSize: 'contain', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
              }}
            >
              {/* Content Overlay */}
              
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
     

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`h-2 w-2 rounded-full ${index === current ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </section>
  );
};
// 3. Apply-for-Course Form


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


// // 4. Courses Grid Section
// const CoursesGrid = () => (
//   <section id="courses" className="py-16">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">Our Available Courses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {courses.map(course => (
//           <div key={course.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
//             <div className="text-4xl mb-4 text-indigo-600">{course.icon}</div>
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
//             <p className="text-gray-600 text-sm">{course.description}</p>
//             <a href="#apply" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm">
//               View Details &rarr;
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );
const CoursesGrid = () => (
  <section id="courses" className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">Our Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map(course => (
          // 💡 Added transform and shadow-2xl for animation
          <div 
            key={course.id} 
            className="bg-white rounded-xl shadow-lg transition duration-300 border border-gray-100 
                       overflow-hidden transform hover:scale-[1.03] hover:shadow-2xl"
          >
            {/* 1. COURSE IMAGE (Conditional Rendering) */}
            {course.courseImg ? (
              <div className="h-40 w-full overflow-hidden">
                <img 
                  src={course.courseImg} 
                  alt={course.title}
                  // Using object-cover to make sure the image fills the container area
                  className="w-full h-full object-fit transition duration-300 group-hover:scale-110" 
                />
              </div>
            ) : (
              // Fallback to the large emoji icon if no image URL is provided
              <div className="p-6">
                <div className="text-4xl mb-4 text-indigo-600">{course.icon}</div>
              </div>
            )}

            {/* 2. TEXT CONTENT */}
            <div className="p-6 pt-3">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
              <p className="text-gray-600 text-sm">{course.description}</p>
              
              {/* Call-to-Action Link */}
              <a 
                href="#apply" 
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm transition duration-150"
              >
                View Details &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
// 5. Topper Students Grid
const ToppersGrid = () => (
  <section id="toppers" className="py-14 bg-gradient-to-b from-blue-50 to-indigo-50">
    <div className="max-w-4xl mx-auto px-8 sm:px-6 lg:px-2">

      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
        Our Star Performers ✨
      </h2>

      {/* Updated Grid: 2 columns on phone, 4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {toppers.map((topper, index) => (
          <div
            key={topper.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                       transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
          >

            {/* Image */}
            <div className="relative">
              <img
                src={topper.imageUrl}
                alt={topper.name}
                className="w-full h-40 object-contain bg-gray-100"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250')}
              />
            </div>

            {/* Content */}
         

          </div>
        ))}
      </div>
    </div>
  </section>
);


// 6. Footer
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


// --- MAIN LANDING PAGE COMPONENT ---
const ComputerTrainingLandingPage = () => {
  return (
    <div className="font-sans antialiased">
    
      <main>
        <Banner />
        <DirectorMessage/>
        <CoursesGrid />
        <ApplyForm />
        <ToppersGrid />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ComputerTrainingLandingPage;