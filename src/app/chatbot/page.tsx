"use client";
import { useState } from "react";
import ChatbotWidget from "../components/ChatbotWidget";

export default function Chatbot() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, feedback }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Thank you for your feedback!");
      setRating(0);
      setFeedback("");
    } else {
      alert("Error saving feedback: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <header className="p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to My Site</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore my work, rate your experience.
        </p>
      </header>

      {/* Rating Section */}
      <section className="max-w-2xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Rate My Work</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`text-3xl ${
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Feedback Textarea */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Leave your feedback..."
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rating === 0 || feedback.trim() === ""}
            className={`px-4 py-2 rounded-lg transition-colors ${
              rating === 0 || feedback.trim() === ""
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Submit Feedback
          </button>
        </form>
      </section>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
