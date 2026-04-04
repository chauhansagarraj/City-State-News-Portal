import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800 w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 text-center">
        <h1 className="font-bold mb-4 leading-tight text-[clamp(1.8rem,4vw,3rem)]">
          About Our News Portal
        </h1>
        <p className="max-w-2xl mx-auto leading-relaxed text-[clamp(1rem,1.5vw,1.3rem)]">
          Delivering trusted, fast, and local news from your city to your state.
        </p>
      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
          alt="news"
          className="rounded-2xl shadow-lg w-full h-auto object-cover"
        />

        <div>
          <h2 className="font-semibold mb-4 text-[clamp(1.5rem,3vw,2.2rem)]">
            Who We Are
          </h2>

          <p className="text-gray-600 leading-relaxed text-[clamp(0.95rem,1.2vw,1.1rem)]">
            Our City and State News Portal is a digital platform designed to
            provide real-time, reliable, and relevant news to users.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed text-[clamp(0.95rem,1.2vw,1.1rem)]">
            Our goal is to bridge the gap between people and authentic
            information by delivering news that truly matters.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <div className="bg-white py-16 px-4">
        <h2 className="text-center mb-8 font-semibold text-[clamp(1.5rem,3vw,2.2rem)]">
          Our Mission
        </h2>

        <p className="max-w-4xl mx-auto text-center text-gray-600 leading-relaxed text-[clamp(1rem,1.4vw,1.2rem)]">
          Our mission is to empower citizens with accurate, unbiased, and
          timely information while promoting awareness and transparency.
        </p>
      </div>

      {/* FEATURES */}
      <div className="bg-gray-100 py-16 px-4">
        <h2 className="text-center mb-10 font-semibold text-[clamp(1.5rem,3vw,2.2rem)]">
          What We Offer
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Latest News",
              desc: "Stay updated with real-time news from your city and state.",
            },
            {
              title: "Category-Based News",
              desc: "Browse news by categories like politics, sports, and more.",
            },
            {
              title: "User Interaction",
              desc: "Like, save, and explore news articles easily.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300"
            >
              <h3 className="font-semibold mb-3 text-[clamp(1.1rem,2vw,1.4rem)]">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-[clamp(0.9rem,1.1vw,1.05rem)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM */}
      <div className="bg-white py-16 px-4 text-center">
        <h2 className="mb-8 font-semibold text-[clamp(1.5rem,3vw,2.2rem)]">
          Our Team
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-[clamp(0.95rem,1.2vw,1.1rem)]">
          Our team consists of passionate developers and content creators
          dedicated to delivering meaningful news experiences.
        </p>

        <div className="mt-8">
          <p className="font-semibold text-[clamp(1rem,1.5vw,1.2rem)]">
            Chauhan Sagar S.
          </p>
          <p className="text-gray-500 text-sm">
            Developer & Project Creator
          </p>
        </div>
      </div>

      {/* CONTACT */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-4 text-center">
        <h2 className="mb-3 font-semibold text-[clamp(1.5rem,3vw,2.2rem)]">
          Get in Touch
        </h2>

        <p className="mb-3 text-[clamp(0.95rem,1.2vw,1.1rem)]">
          Have questions or suggestions? We'd love to hear from you.
        </p>

        <p className="text-[clamp(0.95rem,1.2vw,1.1rem)]">
          Email: support@newsportal.com
        </p>
      </div>
    </div>
  );
};

export default AboutUs;