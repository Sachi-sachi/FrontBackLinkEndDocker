// src/components/Chatbot.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';

export default function Chatbot({ context }) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hellooooo!!! Type something plzz' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const chatRef = useRef(null);

  const apiBase = import.meta.env.VITE_API_BASE_URL ?? '/api'; // e.g., http://localhost:8000
  
  const isApiConfigured = typeof apiBase === 'string' && apiBase.trim().length > 0;

  const contextSummary = useMemo(() => {
    const { name, topic } = context || {};
    const parts = [];
    if (name) parts.push(`Name: ${name}`);
    if (topic) parts.push(`Topic: ${topic}`);
    return parts.join(' • ');
  }, [context]);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  async function mockBotReply(userText) {
    // Simulate “thinking”
    await new Promise((r) => setTimeout(r, 600));
    const name = context?.name ? ` ${context.name}` : '';
    const topicSuffix = context?.topic ? ` (topic: ${context.topic})` : '';
    return `Thanks${name}! This is a reply from FRONTEND: "${userText}".${topicSuffix} [Backend not linked]`;
  }

  async function callApi(userText) {
  try {
    const res = await fetch(`${apiBase}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText, context }),
    });

    if (!res.ok) {
      // non-2xx → treat as failure
      return null;
    }

    // parse JSON
    const data = await res.json().catch(() => null);
    if (!data || typeof data.reply !== 'string') return null;

    return data.reply;
  } catch (err) {
    console.error('callApi error:', err);
    // IMPORTANT: return null to trigger fallback
    return null;
  }
}

async function sendMessage() {
  const trimmed = input.trim();
  if (!trimmed || sending) return;

  setMessages((msgs) => [...msgs, { role: 'user', content: trimmed }]);
  setInput('');
  setSending(true);

  try {
    let botReply = null;

    if (isApiConfigured) {
      botReply = await callApi(trimmed);
      if (botReply == null) {
        // backend down → fallback to mock
        botReply = await mockBotReply(trimmed);
      }
    } else {
      // no API configured → mock directly
      botReply = await mockBotReply(trimmed);
    }

    setMessages((msgs) => [...msgs, { role: 'bot', content: botReply }]);
  } finally {
    setSending(false);
  }
}

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <div className="small">
        <p>Hi! I am a chatbot named Pixie. Please talk to me.</p>
      </div>

      <div className="chat-window" ref={chatRef} aria-live="polite">
        {messages.map((m, idx) => (
          <ChatMessage key={idx} role={m.role} content={m.content} />
        ))}
      </div>

      <div className="chat-input-row">
        <textarea
          className="textarea"
          placeholder="Type a message and press Enter…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="button" onClick={sendMessage} disabled={sending}>
          {sending ? 'Sending…' : 'Send'}
        </button>
      </div>
    </>
  );
}