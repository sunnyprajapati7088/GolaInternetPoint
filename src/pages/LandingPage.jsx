import React, { useState ,useEffect} from 'react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import useScreenWidth from '../components/useScreenWidth';

// --- MOCK DATA ---
const courses = [
  // --- Original Courses ---
  { id: 1, title: "Web Development (MERN)", icon: "🌐", description: "Master React, Node.js, Express, and MongoDB for full-stack projects." },
  { id: 2, title: "Data Science with Python", icon: "🧠", description: "Learn data analysis, machine learning, and visualization using Python." },
  { id: 3, title: "Graphic Design (Adobe Suite)", icon: "🎨", description: "Creative skills in Photoshop, Illustrator, and InDesign for visual media." },
  { id: 4, title: "Digital Marketing Basics", icon: "📈", description: "SEO, social media, and paid advertising fundamentals." },

  // --- New Courses Added ---
  { id: 5, title: "CCC (Course on Computer Concepts)", icon: "💻", description: "Essential training on basic computer usage, operating systems, and internet skills." },
  { id: 6, title: "ADCA (Advanced Diploma in Computer Applications)", icon: "🎓", description: "A comprehensive, long-term program covering advanced software applications and programming basics." },
  { id: 7, title: "DCA (Diploma in Computer Applications)", icon: "📚", description: "Fundamental program covering key office tools, basic computing concepts, and practical software use." },
  { id: 8, title: "Tally Prime + GST", icon: "💰", description: "Master accounting, inventory management, and tax compliance using Tally Prime and GST laws." },
  { id: 9, title: "MS Office Suite", icon: "📄", description: "Proficiency in Word, Excel, PowerPoint, and Outlook for essential office productivity tasks." },
  { id: 10, title: "Computer Basics", icon: "🖱️", description: "Introduction to hardware, software, files management, and fundamental digital literacy." },
  // Note: Graphic Designing and Web Development are covered by ID 3 and ID 1, but added for completeness.
  { id: 11, title: "Graphic Designing", icon: "🖼️", description: "Advanced visualization and creative skills, including branding and UI/UX fundamentals." },
  { id: 12, title: "Web Development", icon: "⚙️", description: "Front-end and back-end basics using HTML, CSS, JavaScript, and database integration." },
];

const toppers = [
  { id: 1, name: "Aarav Sharma", course: "Web Development", score: "98%" },
  { id: 2, name: "Priya Singh", course: "Data Science", score: "96%" },
  { id: 3, name: "Vikram Yadav", course: "Graphic Design", score: "95%" },
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
      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10">
        &lt;
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10">
        &gt;
      </button>

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
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application Submitted:', formData);
    alert(`Thank you for applying for ${formData.course}! We will contact you shortly.`);
    setFormData({ name: '', email: '', course: '' });
  };

  return (
    <section id="apply" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8 border-b pb-3">Apply For a Course</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={formData.name} 
              onChange={handleChange} 
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Select Course</label>
            <select
              name="course" 
              id="course" 
              value={formData.course} 
              onChange={handleChange} 
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>-- Choose a course --</option>
              {courses.map(c => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

// 4. Courses Grid Section
const CoursesGrid = () => (
  <section id="courses" className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">Our Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <div className="text-4xl mb-4 text-indigo-600">{course.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
            <p className="text-gray-600 text-sm">{course.description}</p>
            <a href="#apply" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm">
              View Details &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 5. Topper Students Grid
const ToppersGrid = () => (
  <section id="toppers" className="py-16 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">Our Star Performers ✨</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {toppers.map(topper => (
          <div key={topper.id} className="bg-white p-6 rounded-xl shadow-2xl text-center border-t-4 border-yellow-500 transform hover:scale-[1.03] transition duration-300">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{topper.name}</h3>
            <p className="text-indigo-600 font-medium">{topper.course}</p>
            <p className="text-gray-700 mt-2 text-2xl font-extrabold">{topper.score}</p>
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