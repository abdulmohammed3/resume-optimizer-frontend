import { useState, useRef } from 'react';
import mammoth from 'mammoth';
import HTMLToDocx from 'html-to-docx';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface DocxEditorProps {
  initialHtml?: string;
}

export default function DocxEditor({ initialHtml = '' }: DocxEditorProps) {
  const [htmlContent, setHtmlContent] = useState(initialHtml);
  const [isOptimized, setIsOptimized] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const uploadedFileName = file.name.replace('.docx', '');
      setFileName(uploadedFileName);
      setHtmlContent(result.value);
      // For demo purposes, setting isOptimized to true after 2 seconds
      // In real implementation, this would be set after actual optimization
      setTimeout(() => setIsOptimized(true), 2000);
    } catch (error) {
      console.error('Error converting DOCX:', error);
      alert('Error converting DOCX file');
    }
  };

  const handleDownload = async () => {
    try {
      const docxBuffer = await HTMLToDocx(htmlContent, {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 inch = 1440 twips
        orientation: 'portrait'
      });
      
      const blob = new Blob([docxBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName || 'resume'}_optimized.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Error creating optimized DOCX file');
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
      
      <div className="toolbar flex gap-4 items-center">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          Upload DOCX
        </button>
        
        {isOptimized && (
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Download Optimized Resume
          </button>
        )}
      </div>
      <div className="page-editor mt-4 p-6 bg-white rounded-lg shadow-md"></div>
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
