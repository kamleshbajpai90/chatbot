"use client";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

export default function ResumeEnhancer() {
  const [enhanced, setEnhanced] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    const res = await fetch("/api/resume-enhancer", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setEnhanced(data.enhancedResume);
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const lines = doc.splitTextToSize(enhanced, 500);
    doc.text(lines, 40, 60);

    doc.save("enhanced_resume.pdf");
  };

  const handleClear = () => {
    setEnhanced("");
    setFileSelected(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="w-full max-w-2xl p-6 border rounded-lg bg-white dark:bg-zinc-900 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Resume Enhancer</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          ref={fileInputRef}
          type="file"
          name="resume"
          accept=".txt,.doc,.docx,.pdf"
          className="border rounded px-3 py-2"
          required
          onChange={(e: any) => setFileSelected(e?.target?.files?.length > 0)}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Enhancing..." : "Upload & Enhance"}
          </button>
          {fileSelected && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Clear Resume
            </button>
          )}
        </div>
      </form>

      {enhanced && (
        <div
          className="mt-6 p-4 bg-gray-50 dark:bg-zinc-800 rounded 
                  max-h-[500px] overflow-y-auto 
                  whitespace-pre-wrap break-words"
        >
          <ReactMarkdown>
            {enhanced}
          </ReactMarkdown>
          <button
            onClick={handleDownloadPDF}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </section>
  );
}
