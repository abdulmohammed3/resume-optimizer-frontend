'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-50">
      <main className="max-w-6xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8 mt-40"
        >
          <h1 className="text-6xl text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Welcome to Resume Wave
          </h1>
          <p className="text-2xl text-white/90 font-bold">
            Transform your resume into a job-winning document
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Link href="/login">
              Get Started
            </Link>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
