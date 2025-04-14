import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:5000');

    ws.current.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(input);
      setMessages(prev => [...prev, `You: ${input}`]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>
      <div style={{ border: '1px solid #ccc', height: 300, overflowY: 'auto', padding: 10 }}>
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
