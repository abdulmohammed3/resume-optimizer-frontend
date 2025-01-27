import { useState, useRef } from 'react';
import mammoth from 'mammoth';

interface DocxEditorProps {
  initialHtml?: string;
}

export default function DocxEditor({ initialHtml = '' }: DocxEditorProps) {
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
