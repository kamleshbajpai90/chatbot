"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle } from "lucide-react";

interface ChatbotWidgetProps {
  className?: string;
  isOpen?: boolean; // new prop
}

export default function ChatbotWidget({ className, isOpen = true }: ChatbotWidgetProps) {
  // initialize state from prop
  const [open, setOpen] = useState(isOpen);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open Chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chatbot widget */}
      {open && (
        <div
          aria-label="Chatbot Widget"
          className={`fixed bottom-6 right-6 w-[26rem] h-[70vh] flex flex-col border rounded-xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden ${className ?? ""}`}
        >
          {/* Header with close button */}
          <header className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </header>

          {/* Chat area */}
          <main
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-zinc-800"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <article
                key={i}
                className={`p-3 rounded-lg shadow-sm max-w-[80%] prose prose-sm dark:prose-invert ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-100 text-blue-900 text-right"
                    : "mr-auto bg-gray-200 text-gray-900 text-left"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </article>
            ))}
            {loading && (
              <article className="mr-auto bg-gray-200 text-gray-900 p-2 rounded-lg flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
              </article>
            )}
          </main>

          {/* Footer */}
          <footer className="flex items-center gap-2 p-3 border-t bg-white dark:bg-zinc-900">
            <input
              id="chat-input"
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </footer>
        </div>
      )}
    </>
  );
}
