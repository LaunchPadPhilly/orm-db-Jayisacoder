export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">About Me</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-6xl">👤</span>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Hello!</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                I&apos;m Jeremy Green, a dedicated Launchpad Philly intern with a passion for technology and hardware troubleshooting. 
                I love diagnosing and fixing hardware issues, whether it&apos;s a malfunctioning computer or a broken gadget. 
                I&apos;m constantly learning and building my skills in both software development and hardware repair, 
                working toward a career where I can solve problems and innovate in the tech industry.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">My Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              Python
            </span>
            <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
              HTML
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              CSS
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
              JavaScript
            </span>
            <span className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full font-semibold">
              React
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              Figma
            </span>
            <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-semibold">
              UI Design
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
              Team Collaboration
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
              Technical Communication
            </span>
            <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
              Project Management
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">My Goals</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔧</span>
              <span>Work in hardware troubleshooting and repair</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💻</span>
              <span>Learn all about computer systems and hardware</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎓</span>
              <span>Further my education in computer science and engineering</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <span>Become a professional hardware troubleshooter</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
