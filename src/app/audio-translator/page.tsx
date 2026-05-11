"use client";
import { useState, useEffect } from "react";

export default function AudioTranslatorPage() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [sourceAudio, setSourceAudio] = useState<File | null>(null);
  const [targetLang, setTargetLang] = useState("");
  const [translatedAudioUrl, setTranslatedAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch language list dynamically
  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await fetch("/api/languages");
      const data = await res.json();
      setLanguages(data.languages);
    };
    fetchLanguages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSourceAudio(e.target.files[0]);
    }
  };

  const handleTranslate = async () => {
    if (!sourceAudio || !targetLang) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("audio", sourceAudio);
    formData.append("targetLang", targetLang);

    const res = await fetch("/api/translate-audio", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setTranslatedAudioUrl(data.translatedAudioUrl);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-zinc-900 font-sans">
      {/* Hero Section */}
      <header className="text-center py-16">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-400">
          Audio Translator
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Upload an audio file, listen to it, choose your target language, and get a translated version instantly.
        </p>
      </header>

      {/* Main Card */}
      <main className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 shadow-xl rounded-xl p-8">
        {/* Upload audio */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Audio File
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Play uploaded audio */}
          {sourceAudio && (
            <div className="mt-4">
              <h2 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Original Audio
              </h2>
              <audio
                controls
                src={URL.createObjectURL(sourceAudio)}
                className="w-full rounded-lg border"
              ></audio>
            </div>
          )}
        </div>

        {/* Language selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Language
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select target language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Translate button */}
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Translating..." : "Translate Audio"}
        </button>

        {/* Play translated audio */}
        {translatedAudioUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Translated Audio
            </h2>
            <audio
              controls
              src={translatedAudioUrl}
              className="w-full rounded-lg border"
            ></audio>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} Audio Translator • Powered by Next.js & OpenAI
      </footer>
    </div>
  );
}
