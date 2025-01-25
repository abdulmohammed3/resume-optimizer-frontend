'use client';
import { motion } from 'framer-motion';
import DocxEditor from '@/components/DocxEditor';
import { useState } from 'react';
import mammoth from 'mammoth';

export default function Landing() {
  const [editorContent, setEditorContent] = useState<string>('');
  const [isEditingOptimized, setIsEditingOptimized] = useState(false);
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

        <section className="text-center bg-white py-16 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Resume Editor</h3>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 space-y-4">
          <label className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
            <span>Upload Resume to Optimize</span>
            <input
              type="file"
              accept=".docx,.pdf"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    const response = await fetch('http://localhost:5001/api/optimize', {
                      method: 'POST',
                      body: formData,
                    });

                    if (!response.ok) throw new Error('Optimization failed');
                    
                    const optimizedBlob = await response.blob();
                    const arrayBuffer = await optimizedBlob.arrayBuffer();
                    
                    // Convert optimized DOCX to HTML for editing
                    const result = await mammoth.convertToHtml({ arrayBuffer });
                    setEditorContent(result.value);
                    setIsEditingOptimized(true);
                    
                  } catch (error) {
                    console.error('Optimization error:', error);
                    alert('Error optimizing resume');
                  }
                }
              }}
            />
          </label>
          
          {isEditingOptimized && (
            <p className="text-green-600 font-medium">
              Editing optimized version - changes will be saved to new document
            </p>
          )}
        </div>

        <DocxEditor 
          key={editorContent} // Force re-render when content changes
          initialHtml={editorContent}
          onSave={async (htmlContent: string) => {
                try {
                  const response = await fetch('http://localhost:5001/api/convert', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      html: htmlContent,
                      filename: 'optimized_resume.docx'
                    })
                  });
                  
                  if (!response.ok) throw new Error('Conversion failed');
                  
                  const blob = await response.blob();
                  const downloadUrl = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = downloadUrl;
                  link.download = 'optimized_resume.docx';
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                } catch (error) {
                  console.error('Download failed:', error);
                  alert('Error generating DOCX file');
                }
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}