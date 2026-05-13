"use client";
import ChatbotWidget from "./components/ChatbotWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Header */}
      <header className="p-12 text-center">
        <h1 className="text-4xl font-bold">Kamlesh Bajpai</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Frontend Developer • React.js • Vue.js • Node.js • Next.js
        </p>
      </header>

      {/* About Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I am a frontend developer with over 5 years of experience building
          scalable, user-friendly web applications. Skilled in React.js, Vue.js,
          Node.js, and Next.js, I specialize in creating modern interfaces and
          full-stack solutions. Recently, I’ve built innovative projects like a
          chatbot and a resume enhancer powered by OpenAI.
        </p>
      </section>

      {/* Projects Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">AI Chatbot</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Built with Next.js and Node.js, integrated with OpenAI to provide
              conversational support and intelligent responses.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Resume Enhancer</h3>
            <p className="text-gray-700 dark:text-gray-300">
              A tool leveraging OpenAI APIs to generate professional resumes and
              cover letters, helping job seekers stand out.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Frontend Applications</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Developed multiple responsive, accessible, and scalable web apps
              using React.js and Vue.js for startups and enterprise clients.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Interested in collaborating or hiring me? Let’s connect!
        </p>
        <p className="mt-2 text-blue-600 dark:text-blue-400 font-medium">
          Email: kamleshbjp40@gmail.com 
        </p>
        <p className="mt-1 text-blue-600 dark:text-blue-400 font-medium">
          LinkedIn: linkedin.com/in/kamlesh-bajpai-23bb3066/
        </p>
        <p className="mt-1 text-blue-600 dark:text-blue-400 font-medium">
          GitHub: github.com/kamleshbajpai90
        </p>
      </section>

      {/* Chatbot Widget */}
      <ChatbotWidget isOpen={false} />
    </div>
  );
}
