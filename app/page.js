import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-purple-50">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-6 text-gray-900">
          Hi, I'm Brayden!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          I am a software engineer. I feel confident in my abilities to create solutions that are both efficient and effective. I am passionate about learning new technologies and continuously improving my skills.
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <Link href="/about" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">About Me</Link>
          <Link href="/projects" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Projects</Link>
          <Link href="/contact" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Contact</Link>
        </div>
        <div className="bg-purple-100 border-2 border-purple-200 rounded-lg p-6 text-left">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">
            Welcome!
          </h2>
          <ul className="space-y-2 text-purple-800">
            <li>✨ Explore my projects and see what I've built</li>
            <li>✨ Learn more about me and my skills</li>
            <li>✨ Get in touch for collaboration or questions</li>
          </ul>
        </div>
        <div className="mt-8 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <p className="text-yellow-900 font-semibold">
            💡 Tip: Check the README.md for detailed instructions and examples!
          </p>
        </div>
      </div>
    </div>
  );
}
