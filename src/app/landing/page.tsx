'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-purple-50">
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
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Link href="/doc-editor">
              Optimize your resume
            </Link>
          </motion.button>
      </main>
    </div>
  );
}