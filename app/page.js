import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-6 text-gray-900">
          Hi, I&apos;m Jeremy Green!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Great projects come with tenacity and patience. Welcome to my portfolio!
        </p>

        <div className="flex gap-4 justify-center mb-8">
          <Link href="/about" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition">
            About Me
          </Link>
          <Link href="/projects" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition">
            View Projects
          </Link>
          <Link href="/contact" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
            Contact
          </Link>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-left">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            What I Do
          </h2>
          <ul className="space-y-2 text-blue-800">
            <li>💻 Build modern web applications</li>
            <li>🎨 Create responsive and beautiful designs</li>
            <li>🚀 Learn new technologies and frameworks</li>
            <li>🤝 Collaborate on exciting projects</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
