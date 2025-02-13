import React, { useEffect, useState } from "react";

interface Document {
  id: string;
  name: string;
  fileType: string;
  status: "approved" | "pending";
  filePath: string;
}

const DocumentView = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/documents');
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = (filePath: string) => {
    window.location.href = `http://localhost:5000/${filePath}`; // Initiates the download
  };

  return (
    <div className="overflow-x-auto w-full p-6 bg-gray-800 rounded-lg shadow-lg">
      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-6 py-3 text-left">Document Name</th>
            <th className="px-6 py-3 text-left">File Type</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              // className="hover:bg-gray-700 cursor-pointer transition"
              onClick={() => handleDownload(doc.filePath)}
            >
              <td className="px-6 py-3">{doc.name}</td>
              <td className="px-6 py-3">{doc.fileType}</td>
              <td className="px-6 py-3">{doc.status}</td>
              <td className="px-6 py-3 text-blue-400 hover:text-blue-800 duration-300">Download</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentView;
