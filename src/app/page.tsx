'use client';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-purple-50">
      <nav className="p-6 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          >
            Suarte
          </motion.h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-bold mb-6 text-gray-800">
            Craft Resumes That Get You Hired
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Designed by students, for students - turn your campus experience into career success
          </p>
        </motion.section>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-24"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          {['AI-Powered Templates', 'Industry-Specific Examples', 'Real-Time Feedback'].map((feature, i) => (
            <div key={feature} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow transformation transition duration-300 hover:scale-105">
              <div className={`h-2 mb-4 rounded-full ${i === 0 ? 'bg-purple-500' : i === 1 ? 'bg-blue-500' : 'bg-green-500'}`} />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature}</h3>
              <p className="text-gray-600">
                {i === 0
                  ? "Transform your experiences into compelling bullet points with our AI-powered resume builder."
                  : i === 1
                    ? "Access curated examples from top companies and tailor your resume to your target industry."
                    : "Get instant suggestions to improve your resume's impact and readability."}
              </p>
            </div>
          ))}
        </motion.div>

        <section className="text-center bg-white py-16 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Join 50,000+ Successful Students</h3>
          <button
            type="submit"
            className="flex text-blue-300 justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            onClick={() => window.open('http://localhost:5000','_blank')}
          >
            Get Started
            <svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
}
