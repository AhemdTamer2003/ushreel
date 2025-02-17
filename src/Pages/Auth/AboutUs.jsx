import React from 'react';

function AboutUs() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 animate-fade-in"
         style={{
           background: 'linear-gradient(to top, #C2A04C 0%, #000000 100%)',
           backgroundAttachment: 'fixed'
         }}>
      <div className="bg-[#151515] bg-opacity-90 lg:w-2/3 w-full rounded-xl p-8 mt-6 shadow-lg border border-[#C2A04C]/20 
                      transform transition-all duration-500 hover:shadow-[0_0_15px_rgba(194,160,76,0.3)]
                      motion-safe:animate-fadeIn">
        <h2 className="text-4xl text-[#C2A04C] font-extrabold text-center mb-8 font-cairo 
                       animate-pulse duration-[3000ms]">
          About Us
        </h2>
        
        <p className="text-lg text-gray-200 mb-8 text-center leading-relaxed text-xl font-bold font-cairo 
                      transform transition-all duration-300 hover:text-[#C2A04C]
                      motion-safe:animate-fadeIn motion-safe:animate-delay-200">
          We are a passionate team dedicated to providing innovative solutions. 
          Our goal is to connect companies with talented professionals, whether 
          for offline or online events. We work hard to bring the best experiences 
          and match the right people with the right opportunities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black/50 p-6 rounded-lg border border-[#C2A04C]/20 
                          transform transition-all duration-300 hover:scale-[1.02] hover:border-[#C2A04C] 
                          hover:shadow-lg hover:shadow-[#C2A04C]/20
                          motion-safe:animate-fadeIn motion-safe:animate-delay-300">
            <h3 className="text-2xl text-[#C2A04C] font-semibold mb-4 font-cairo 
                          motion-safe:animate-slideInFromLeft">
              Our Mission
            </h3>
            <p className="text-gray-200 leading-relaxed text-xl font-bold font-cairo">
              Our mission is to empower companies by connecting them with skilled 
              ushers and content creators who can make their events stand out. 
              We strive to provide a seamless and efficient platform for talent 
              management.
            </p>
          </div>
          
          <div className="bg-black/50 p-6 rounded-lg border border-[#C2A04C]/20 
                          transform transition-all duration-300 hover:scale-[1.02] hover:border-[#C2A04C] 
                          hover:shadow-lg hover:shadow-[#C2A04C]/20
                          motion-safe:animate-fadeIn motion-safe:animate-delay-400">
            <h3 className="text-2xl text-[#C2A04C] font-semibold mb-4 font-cairo 
                          motion-safe:animate-slideInFromRight">
              Our Vision
            </h3>
            <p className="text-gray-200 leading-relaxed text-xl font-bold font-cairo">
              We envision a world where companies can effortlessly find the right 
              people for their events. Through our platform, we aim to make talent 
              discovery as simple and efficient as possible.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl text-[#C2A04C] font-semibold text-center mb-8 font-cairo 
                         motion-safe:animate-fadeIn motion-safe:animate-delay-500">
            Why Choose Us
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🤝",
                title: "Professional Network",
                description: "Access to a wide network of verified professionals",
                delay: "600"
              },
              {
                icon: "⚡",
                title: "Quick Matching",
                description: "Efficient system to match talents with opportunities",
                delay: "700"
              },
              {
                icon: "🔒",
                title: "Secure Platform",
                description: "Safe and secure environment for all users",
                delay: "800"
              }
            ].map((item, index) => (
              <div key={index} 
                   className={`text-center p-4 bg-black/50 rounded-lg border border-[#C2A04C]/20 
                              transform transition-all duration-300 hover:scale-[1.02] hover:border-[#C2A04C] 
                              hover:shadow-lg hover:shadow-[#C2A04C]/20 backdrop-blur-sm
                              motion-safe:animate-fadeIn motion-safe:animate-delay-[${item.delay}ms]`}>
                <div className="text-4xl mb-4 animate-bounce duration-[2000ms]">{item.icon}</div>
                <h4 className="text-xl text-[#C2A04C] font-semibold mb-2 font-cairo">
                  {item.title}
                </h4>
                <p className="text-gray-200 font-cairo">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;