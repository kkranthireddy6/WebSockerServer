import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(()=>{
    const newSocket = new WebSocket('ws://localhost:5000')
    setSocket(newSocket)

    newSocket.onopen=()=>{
      console.log('WebSocket connection established')
    }

    newSocket.onmessage=(event)=>{
      const message = event.data.toString()
      setMessages(prevMessages=>[...prevMessages, message])
    }

    newSocket.onclose=()=>{
      console.log('WebSocket connection closed')
    }

    newSocket.onerror=(error)=>{
      console.error(`Websocket, ${error}`)
    }

    return ()=>{
      newSocket.close()
    }

  }, [])

  const sendMessage = () => {
    if(input.trim() && socket.readyState === WebSocket.OPEN) {
      socket.send(input)
      setInput('')
    }
  };

  return (
    <div className="App">
     <div className='chat-window'>
        {messages.map((message, index)=>(
          <div key={index}>
              {message}
          </div>
        )
        )}
     </div>
     <input type='text' value={input} onChange={e=>setInput(e.target.value)} onKeyUp={e=>e.key === "Enter" && sendMessage()} />
    <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
