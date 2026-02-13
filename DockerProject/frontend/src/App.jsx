// src/App.jsx
import { useState } from 'react';
import './App.css';
import LeftForm from './components/LeftForm';
import Chatbot from './components/Chatbot';

function App() {
  const [context, setContext] = useState({
    name: '',
    topic: '',
    details: '',
  });

  return (
    <div className="app-container">
      <aside className="left-pane">
        <h2>Settings / Form</h2>
        <LeftForm
          initialValues={context}
          onSubmit={(values) => setContext(values)}
        />
      </aside>

      <main className="right-pane">
        <h2>Chatbot</h2>
        <Chatbot context={context} />
      </main>
    </div>
  );
}

export default App;