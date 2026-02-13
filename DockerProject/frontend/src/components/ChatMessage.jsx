// src/components/ChatMessage.jsx
export default function ChatMessage({ role, content }) {
  return (
    <div className={`message ${role}`}>
      <div>
        <div className="role">{role === 'user' ? 'You' : 'Bot'}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}