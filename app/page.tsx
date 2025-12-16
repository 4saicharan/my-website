export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full space-y-8 text-center">
          {/* Big Title */}
          <h1 className="text-6xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Sai&apos;s World
          </h1>
          
          {/* Short Bio */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              Hi! I&apos;m Sai, a 10-year-old student who loves learning new things, 
              exploring the world, and having fun with technology. Welcome to my corner 
              of the internet!
            </p>
          </div>
          
          {/* Contact Me Button */}
          <div className="pt-4">
            <a
              href="mailto:hello@sai.example"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/70 active:scale-95"
            >
              Contact Me
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
