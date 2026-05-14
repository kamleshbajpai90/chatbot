"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, Send, Mic, Volume2 } from "lucide-react";

interface ChatbotWidgetProps {
  className?: string;
  isOpen?: boolean;
}

export default function ChatbotWidget({
  className,
  isOpen = true,
}: ChatbotWidgetProps) {
  const [open, setOpen] = useState(isOpen);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };

      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

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

      // Speak the assistant's reply
      speakText(data.reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = 0;
        textareaRef.current.selectionEnd = 0;
      }
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors sm:bottom-6 sm:right-6 cursor-pointer"
          aria-label="Open Chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {open && (
        <div
          aria-label="Chatbot Widget"
          className={`fixed bottom-0 left-4 right-4 h-[60vh] 
          sm:bottom-6 sm:right-6 sm:left-auto sm:w-[22rem] sm:h-[70vh] 
          md:w-[26rem] md:h-[75vh] 
          flex flex-col border rounded-t-xl sm:rounded-xl 
          bg-zinc-900 text-gray-100 shadow-2xl overflow-hidden ${
            className ?? ""
          }`}
        >
          <header className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 cursor-pointer"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </header>

          <main
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-800"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <article
                key={i}
                className={`p-3 rounded-lg shadow-sm max-w-[80%] prose prose-sm dark:prose-invert whitespace-pre-wrap break-words ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-700 text-white text-right"
                    : "mr-auto bg-zinc-700 text-gray-100 text-left"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </article>
            ))}
            {loading && (
              <article className="mr-auto bg-zinc-700 text-gray-100 p-2 rounded-lg flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </article>
            )}
          </main>

          <footer className="flex items-center gap-2 p-4 border-t border-zinc-700 bg-zinc-900">
            <textarea
              ref={textareaRef}
              id="chat-input"
              className="flex-1 border border-zinc-600 rounded-lg px-3 py-3 min-h-[3rem] sm:min-h-[4rem] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-800 text-gray-100 placeholder-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), sendMessage())
              }
              rows={2}
            />

            {/* Mic button for voice input */}
            <button
              onClick={startListening}
              disabled={listening} // disable while active
              className={`p-3 rounded-full ${
                listening ? "bg-red-600 animate-pulse" : "bg-gray-600"
              } text-white hover:bg-gray-700 transition-colors flex items-center justify-center ${
                listening ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-label="Voice Input"
            >
              <Mic size={20} />
            </button>

            {/* Send button */}
            <button
              onClick={sendMessage}
              className={`p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-transform transform hover:scale-105 flex items-center justify-center ${
                input.trim() && !loading ? "cursor-pointer" : "cursor-default"
              }`}
              aria-label="Send Message"
              disabled={!input.trim() || loading}
            >
              <Send size={20} />
            </button>
          </footer>
        </div>
      )}
    </>
  );
}
