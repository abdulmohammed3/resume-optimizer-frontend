import { useState, useRef } from 'react';
import mammoth from 'mammoth';

interface DocxEditorProps {
  onSave: (htmlContent: string) => void;
  initialHtml?: string;
}

export default function DocxEditor({ onSave, initialHtml = '' }: DocxEditorProps) {
  const [htmlContent, setHtmlContent] = useState(initialHtml);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
    } catch (error) {
      console.error('Error converting DOCX:', error);
      alert('Error converting DOCX file');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          filename: 'optimized_resume.docx'
        }),
      });

      if (!response.ok) throw new Error('Optimization failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'optimized_resume.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Optimization error:', error);
      alert('Error optimizing resume. Please try again.');
    }
  };

  return (
    <div className="docx-editor">
      <input
        type="file"
        ref={fileInputRef}
        accept=".docx"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      
      <div className="toolbar">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload DOCX
        </button>
        
        {htmlContent && (
          <button
            onClick={handleSave}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Optimize Resume
          </button>
        )}
      </div>

      {htmlContent && (
        <div
          className="editor-content mt-4 p-4 border rounded bg-sky-100 text-black"
          contentEditable
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          onInput={(e) => setHtmlContent(e.currentTarget.innerHTML)}
        />
      )}
    </div>
  );
}
