"use client";
import ChatbotWidget from "./components/ChatbotWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Header */}
      <header className="p-12 text-center">
        <h1 className="text-4xl font-bold">Kamlesh Kumar</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Frontend Developer • React.js • Vue.js • TypeScript • Tailwind CSS
        </p>
      </header>

      {/* About Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Frontend Developer with 8+ years of experience building scalable,
          responsive, and high-performance web applications. Strong expertise in
          React.js, Vue.js, JavaScript, TypeScript, HTML, CSS, and modern UI
          frameworks. Skilled in delivering user-friendly interfaces, optimizing
          performance, and collaborating in Agile environments.
        </p>
      </section>

      {/* Skills Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>
        <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
          <li>React.js, Vue.js, JavaScript, TypeScript</li>
          <li>HTML5, CSS3, Tailwind CSS, Bootstrap</li>
          <li>Nuxt.js, Vuetify, Bulma</li>
          <li>Node.js, OpenAI</li>
          <li>MySQL</li>
          <li>Git, Agile Development</li>
        </ul>
      </section>

      {/* Experience Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">Frontend Developer | Kellton Tech</h3>
            <p className="text-gray-700 dark:text-gray-300">Nov 2023 – Present</p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>Developed scalable frontend applications using React.js and Vue.js.</li>
              <li>Collaborated with backend teams to integrate REST APIs.</li>
              <li>Implemented responsive UI components with Tailwind CSS and Bootstrap.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Frontend Developer | Magic Software</h3>
            <p className="text-gray-700 dark:text-gray-300">Aug 2020 – May 2023</p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>Built enterprise-level applications with React.js and Vue.js.</li>
              <li>Optimized frontend performance and maintainability.</li>
              <li>Worked closely with cross-functional Agile teams.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Web Developer | Vinove Software & Services</h3>
            <p className="text-gray-700 dark:text-gray-300">Nov 2017 – Jul 2020</p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>Developed interactive web applications using Vue.js and JavaScript.</li>
              <li>Integrated backend services and maintained scalable architecture.</li>
              <li>Enhanced UI/UX with modern CSS frameworks.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">PHP Developer | Sparx IT Solutions</h3>
            <p className="text-gray-700 dark:text-gray-300">Sep 2015 – Nov 2017</p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>Worked on PHP-based web applications and frontend integrations.</li>
              <li>Maintained databases and supported client-side functionality.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Key Projects</h2>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Pearson – Learning platforms using React.js and Bootstrap.</li>
          <li>BCG Methane Lite App – Frontend for methane emission management.</li>
          <li>TERRA Global Capital App – Climate finance app with Vue.js + Tailwind CSS.</li>
          <li>Cimetrix Sapience Thoth App – Manufacturing automation UI with Vue.js.</li>
          <li>Bellxcel – Educational engagement platform using Vue.js + TypeScript.</li>
          <li>HelloPeter – Review and rating app with Vue.js, Laravel, MySQL.</li>
        </ul>
      </section>

      {/* Education Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
          <li>MCA – Computer Science | MJP Rohilkhand University, Bareilly | 2014</li>
          <li>BCA – Computer Science | UP Technical University | 2011</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300">Let’s connect!</p>
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
