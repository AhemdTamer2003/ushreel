import React from 'react';
import { Link } from 'react-router-dom';

function Team() {
  const teamMembers = [
    {
      name: "Ahmed Tamer Ahmed",
      role: "Ui / Front-end Developer",
      description: "Develop a good and reliable UI"
    },
    {
      name: "Ahmed Magdy Gaber",
      role: "Cyber-Security",
      description: "Team Leader" 
    },
    {
      name: "Ahmed Abdelkader Kamal",
      role: "Flutter Developer",
      description: "Developing ui for Andriod"
    },
    {
      name: "Ammar Ahmed Mohamed",
      role: "Back-end Developer",
      description: "Implementing Back-end for our web"
    },
    {
      name: "Amira Tawfik Mohamed",
      role: "AI",
      description: "Development of AI system"
    },
    {
      name: "Mario Essam Fathy",
      role: "Cyber-Security",
      description: "Responsible for Safty and security"
    },
    {
      name: "Mohamed Tarek Mahmoud",
      role: "Back-end Node.js ",
      description: "Implementing The Back-end of our project"
    },
    {
      name: "Youana Mamdouh Fayez",
      role: "AI",
      description: "Computing AI System models"
    },
    {
      name: "Ziad Mohamed Magdy",
      role: "AI",
      description: "AI models and Training"
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 animate-fade-in font-bold"
         style={{
           background: 'linear-gradient(to top, #C2A04C 0%, #000000 100%)',
           backgroundAttachment: 'fixed'
         }}>
      <div className="bg-[#151515] bg-opacity-90 lg:w-4/5 w-full rounded-xl p-8 my-12 shadow-lg border border-[#C2A04C]/20">
        <h2 className="text-4xl text-[#C2A04C] font-extrabold text-center mb-12 font-cairo">
          Our Team
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} 
                 className="bg-black/50 p-6 rounded-lg border border-[#C2A04C]/20 
                            transform transition-all duration-300 hover:scale-[1.02] 
                            hover:border-[#C2A04C] hover:shadow-lg hover:shadow-[#C2A04C]/20">
              <div className="text-center">
                <h3 className="text-xl text-[#C2A04C] font-semibold mb-2 font-cairo font-bold">
                  {member.name}
                </h3>
                <h4 className="text-lg text-gray-300 mb-2 font-cairo font-bold">
                  {member.role}
                </h4>
                <p className="text-gray-400 text-sm font-cairo font-bold">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/about" 
                className="bg-[#C2A04C] text-black px-8 py-3 rounded-full font-bold 
                           transform transition-all duration-300 hover:scale-105 
                           hover:shadow-lg hover:shadow-[#C2A04C]/30">
            Back to About
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Team;