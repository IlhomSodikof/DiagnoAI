import { useState, useEffect, useRef } from 'react';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import { mockMessages } from '../mock/message';

const ChatPage = ({ doctor, onBack }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Find conversation with this doctor
    const conversation = mockMessages.find(c => c.doctorId === doctor.id);
    setMessages(conversation ? conversation.messages : []);
  }, [doctor]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (newMessage) => {
    const newMsg = {
      id: messages.length + 1,
      sender: 'patient',
      text: newMessage.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      attachment: newMessage.attachments.length > 0 ? newMessage.attachments[0] : null
    };

    setMessages([...messages, newMsg]);

    // Mock doctor reply after 1-3 seconds
    setTimeout(() => {
      const replies = [
        "Tushundim, davom etamiz...",
        "Qiziqarli, batafsilroq aytishingiz mumkinmi?",
        "Bu haqda qo'shimcha ma'lumot bera olasizmi?",
        "Tushunarli, keyingi qadam..."
      ];
      const replyMsg = {
        id: messages.length + 2,
        sender: 'doctor',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-medium">{doctor.name}</h3>
          <p className="text-sm text-gray-500">{doctor.specialty}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map(msg => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isDoctor={msg.sender === 'doctor'}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;