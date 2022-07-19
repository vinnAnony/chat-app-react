import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import {useEffect, useState} from 'react'
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync').then((response) => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    var pusher = new Pusher('0e6f8a1400d4484ca992', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    //cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])

  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
