import Link from "next/link";
import SpinningMeshCanvas from "./components/SpinningMeshCanvas";
import WeatherInfo from "./components/WeatherInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-4">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="z-10 text-center w-full">
        {/* The Big Title */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              TorqueTech
            </span>
          </h1>

          {/* The Bio */}
          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
            Turning gears into code. My work is built on engineering discipline and fueled by the latest Artificial Intelligence news.
          </p>
        </div>

        {/* Weather and 3D Mesh Section */}
        <div className="mb-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-center px-4">
          <WeatherInfo />
          <div className="flex-1 max-w-md">
            <SpinningMeshCanvas />
          </div>
        </div>

        {/* Scrolling Skills Bar */}
        <div className="mb-10 w-full overflow-hidden relative px-4">
          <div className="flex animate-scroll whitespace-nowrap gap-8">
            {/* First set of skills */}
            {[
              "JavaScript", "TypeScript", "Python", "React", "Next.js", 
              "Node.js", "AI/ML", "System Design", "Algorithms", "Data Structures",
              "Git", "Docker", "AWS", "API Development", "Full Stack",
              "Software Engineering", "Problem Solving", "Agile", "DevOps", "Database Design"
            ].map((skill, idx) => (
              <span 
                key={idx}
                className="px-6 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-300 font-semibold text-sm md:text-base whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
            {/* Duplicate set for seamless loop */}
            {[
              "JavaScript", "TypeScript", "Python", "React", "Next.js", 
              "Node.js", "AI/ML", "System Design", "Algorithms", "Data Structures",
              "Git", "Docker", "AWS", "API Development", "Full Stack",
              "Software Engineering", "Problem Solving", "Agile", "DevOps", "Database Design"
            ].map((skill, idx) => (
              <span 
                key={`dup-${idx}`}
                className="px-6 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-300 font-semibold text-sm md:text-base whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <a
            href="mailto:contact@saiasapu.com" // You can change this to your real email
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-700 hover:scale-105"
          >
            Contact Me
            <svg 
              className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
          <Link
            href="https://saiasapu.com/news"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105"
          >
            News
            <svg 
              className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
          <Link
            href="/world-clock"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-green-600 to-teal-600 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 hover:from-green-700 hover:to-teal-700 hover:scale-105"
          >
            World Clock
            <svg 
              className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </Link>
        </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-slate-500 text-sm">
        © 2025 Sai Asapu. Built with Next.js & Dokploy.
      </footer>
    </main>
  );
}