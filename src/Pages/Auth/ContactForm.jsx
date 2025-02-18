import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage("Your message has been sent successfully!");
      console.log("Form Submitted:", formData);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8" 
         style={{
           background: 'linear-gradient(to top, #C2A04C 0%, #000000 100%)',
           backgroundAttachment: 'fixed'
         }}>
      <div className="bg-[#151515]/80 backdrop-blur-sm lg:w-1/2 w-full rounded-xl p-8 border border-[#C2A04C]/20 shadow-lg">
        <h2 className="text-4xl text-[#C2A04C] font-extrabold text-center mb-8 font-cairo">
          Contact Us
        </h2>
        
        {successMessage && (
          <div className="bg-[#C2A04C]/10 border border-[#C2A04C] text-[#C2A04C] px-4 py-3 rounded-lg mb-6 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#C2A04C] font-semibold mb-2 font-cairo">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-black/30 border border-[#C2A04C]/20 rounded-lg text-white focus:border-[#C2A04C] focus:outline-none transition-colors duration-300"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 mt-1 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-[#C2A04C] font-semibold mb-2 font-cairo">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-black/30 border border-[#C2A04C]/20 rounded-lg text-white focus:border-[#C2A04C] focus:outline-none transition-colors duration-300"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 mt-1 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-[#C2A04C] font-semibold mb-2 font-cairo">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 bg-black/30 border border-[#C2A04C]/20 rounded-lg text-white focus:border-[#C2A04C] focus:outline-none transition-colors duration-300"
              placeholder="Enter your message"
            />
            {errors.message && (
              <p className="text-red-400 mt-1 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#C2A04C] text-[#151515] py-3 px-6 rounded-lg font-bold hover:bg-[#C2A04C]/90 transition-colors duration-300 font-cairo"
          >
            Send Message
          </button>
        </form>

        {/* Additional Contact Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-black/20 rounded-lg border border-[#C2A04C]/10">
            <div className="text-[#C2A04C] text-2xl mb-2">📍</div>
            <h4 className="text-[#C2A04C] font-semibold mb-1 font-cairo">Address</h4>
            <p className="text-gray-300">123 Business Street, Suite 100</p>
          </div>
          <div className="p-4 bg-black/20 rounded-lg border border-[#C2A04C]/10">
            <div className="text-[#C2A04C] text-2xl mb-2">📧</div>
            <h4 className="text-[#C2A04C] font-semibold mb-1 font-cairo">Email</h4>
            <p className="text-gray-300">contact@ushereel.com</p>
          </div>
          <div className="p-4 bg-black/20 rounded-lg border border-[#C2A04C]/10">
            <div className="text-[#C2A04C] text-2xl mb-2">📱</div>
            <h4 className="text-[#C2A04C] font-semibold mb-1 font-cairo">Phone</h4>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}