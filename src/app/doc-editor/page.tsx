'use client'
import DocxEditor from "@/components/DocxEditor"
import mammoth from "mammoth"
import { useState } from "react";

export default function DocEditor() {
    const [editorContent, setEditorContent] = useState<string>('');
    const [isEditingOptimized, setIsEditingOptimized] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-purple-50">
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
    </div>
  )
}