// src/components/LeftForm.jsx
import { useState } from 'react';

export default function LeftForm({ initialValues, onSubmit }) {
  const [form, setForm] = useState({
    name: initialValues?.name ?? '',
    topic: initialValues?.topic ?? '',
    details: initialValues?.details ?? '',
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(form);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <div className="label">Your name</div>
        <input
          className="input"
          placeholder="e.g., Sachi"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
        />
      </div>

      <div>
        <div className="Hobby">Topic</div>
        <input
          className="input"
          placeholder="e.g., Badminton"
          value={form.topic}
          onChange={(e) => update('topic', e.target.value)}
        />
      </div>

      <div>
        <div className="label">Additional details (Optional)</div>
        <textarea
          className="textarea"
          value={form.details}
          onChange={(e) => update('details', e.target.value)}
        />
      </div>

      <button className="button" type="submit">
        Save / Apply
      </button>

      <div className="small">
        This is a test form.
      </div>
    </form>
  );
}