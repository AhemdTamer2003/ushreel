import React, { useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function AddExperience() {
  const [newExperience, setNewExperience] = useState({ description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleSubmit = () => {
    if (newExperience.description.trim()) {
      // Add API call to save experience here (e.g., send to server)
      navigate('/usher-profile'); // Navigate to UsherProfile
    } else {
      alert('Please enter an experience');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C2A04C] flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#C2A04C] rounded-xl p-12 shadow-2xl hover:shadow-3xl transform transition-all duration-300 w-full max-w-4xl"
      >
        <h2 className="text-4xl font-bold mb-6 text-black drop-shadow-lg">Add Experience</h2>

        <p className="text-base mb-6 text-black drop-shadow-sm font-bold">
          Please provide a detailed description of your experience. Remember to keep it professional and concise. You may include your job title, responsibilities, and achievements.
        </p>

        <div className="mb-6">
          <label className="block mb-2 text-xl font-semibold text-black">Experience Description</label>
          <div className="flex items-start bg-gray-100 rounded-lg p-4 shadow-inner">
            <FaClipboardList className="mr-4 mt-1 text-[#C2A04C]" size={24} />
            <textarea
              name="description"
              value={newExperience.description}
              onChange={handleChange}
              className="bg-transparent w-full outline-none resize-none h-40 text-lg text-black transition-colors duration-300 focus:ring-2 focus:ring-[#C2A04C]"
              placeholder="Write about your experience..."
            />
          </div>
          <p className="text-xs mt-2 text-black font-bold">
            * Tips: It’s preferred to add your experience in this way:
            <br />1: State your job title and role.
            <br />2: Highlight your key achievements and responsibilities.
            <br />This will make it easier for companies to understand your background.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="bg-black text-[#C2A04C] px-8 py-4 rounded-full w-full transition-colors duration-300 flex justify-center items-center text-xl shadow-md"
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
}

export default AddExperience;