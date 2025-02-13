import React, { useEffect, useState } from "react";

interface Document {
  _id: string;
  name: string;
  fileType: string;
  status: "approved" | "pending";
  filePath: string;
}

const DocumentView = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleApprove = async (documentId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/approve/${documentId}`, {
        method: "PUT",
      });
      const data = await response.json();

      if (response.ok) {
        alert("Document approved!");
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc._id === documentId ? { ...doc, status: "approved" } : doc
          )
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error approving document:", error);
      alert("Error approving document.");
    }
  };


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
    console.log('file : ', filePath);
    
    window.location.href = `http://localhost:3000/${filePath}`; // Initiates the download
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
            console.log(doc),
            <tr
              key={doc._id}             
            >
              <td className="px-6 py-3">{doc.name}</td>
              <td className="px-6 py-3">{doc.fileType}</td>
              <td className="px-6 py-3">{doc.status}</td>
              <td>
              <button  onClick={() => handleDownload(doc.filePath)} className="px-6 py-3 text-blue-400 hover:text-blue-800 duration-300 cursor-pointer">View</button>
              <button
                  onClick={() => handleApprove(doc._id)}
                  className="ml-4 px-6 py-3 text-green-400 hover:text-green-800 duration-300 cursor-pointer"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentView;
