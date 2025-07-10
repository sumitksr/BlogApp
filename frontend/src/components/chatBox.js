import React, { useState, useRef, useEffect } from 'react';
import { BACKEND_URL } from '../utils/config';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/upload/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg.text }),
      });
      const data = await res.json();
      const fullAnswer = data.answer || 'Sorry, I could not get an answer.';
      // Typing effect: character by character
      let i = 0;
      setMessages((prev) => [...prev, { sender: 'ai', text: '' }]);
      function typeNextChar() {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: fullAnswer.slice(0, i + 1),
          };
          return updated;
        });
        i++;
        if (i < fullAnswer.length) {
          setTimeout(typeNextChar, 18);
        } else {
          setLoading(false);
        }
      }
      typeNextChar();
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Error contacting AI service.' }]);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        {open ? (
          <div className="w-80 bg-white rounded-xl shadow-2xl border border-purple-200 flex flex-col overflow-hidden animate-fade-in-up">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold text-lg">Ask a Question</span>
              <button onClick={() => setOpen(false)} className="text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-80 bg-purple-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-[75%] text-sm shadow ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border border-purple-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSend} className="flex border-t border-purple-100 bg-white">
              <input
                type="text"
                className="flex-1 px-3 py-2 focus:outline-none text-sm"
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                autoFocus={open}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-tr-xl disabled:opacity-60"
                disabled={loading || !input.trim()}
              >
                {loading ? <span className="animate-spin">⏳</span> : 'Send'}
              </button>
            </form>
          </div>
        ) : (
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:scale-105 transition-transform"
            onClick={() => setOpen(true)}
            aria-label="Open chat box"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span className="font-semibold">Ask a Question</span>
          </button>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </>
  );
}
