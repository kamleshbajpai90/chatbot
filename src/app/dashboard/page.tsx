"use client";
import { useEffect, useState } from "react";

interface Feedback {
  _id: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-3xl font-bold mb-6">Feedback Dashboard</h1>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg bg-white dark:bg-zinc-900">
            <thead className="bg-gray-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Feedback</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
                  <td className="px-4 py-2 border text-center">{fb.rating} ★</td>
                  <td className="px-4 py-2 border">{fb.feedback}</td>
                  <td className="px-4 py-2 border">
                    {new Date(fb.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
