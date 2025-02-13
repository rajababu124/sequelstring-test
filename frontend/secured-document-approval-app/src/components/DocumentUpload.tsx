import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: ".pdf,.docx,.txt,.xlsx", // Modify as needed
  });

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        alert('Document uploaded successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('Error uploading file');
    }

    setUploading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 p-8 text-center cursor-pointer hover:bg-gray-700 transition"
      >
        <input {...getInputProps()} />
        <p className="text-gray-300">
          {file ? file.name : "Drag & drop a file here, or click to select one"}
        </p>
      </div>
      <button
        onClick={handleUpload}
        className={`w-full ${uploading ? 'bg-gray-600' : 'bg-blue-600'} text-white mt-4 py-2 rounded-md hover:bg-blue-700 transition`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default DocumentUpload;
