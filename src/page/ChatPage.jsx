import { useState, useEffect, useRef } from 'react';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import EmojiPicker from 'emoji-picker-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Ali Yusupov',
    specialty: 'Nevropatolog',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    online: true
  },
  {
    id: 2,
    name: 'Dr. Malika Xasanova',
    specialty: 'Kardiolog',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: false
  },
  {
    id: 3,
    name: 'Dr. Shoxruh Qodirov',
    specialty: 'Pediatr',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    online: true
  }
];

const mockMessages = [
  {
    doctorId: 1,
    messages: [
      {
        id: 1,
        sender: 'doctor',
        text: 'Salom! Sizga qanday yordam bera olaman?',
        time: '10:00',
        date: '2023-05-15'
      }
    ]
  },
  {
    doctorId: 2,
    messages: [
      {
        id: 1,
        sender: 'doctor',
        text: 'Assalomu alaykum! Kardiolog bo\'lib, sizga xizmat qilishdan mamnunman.',
        time: '09:30',
        date: '2023-05-16'
      }
    ]
  },
  {
    doctorId: 3,
    messages: [
      {
        id: 1,
        sender: 'doctor',
        text: 'Bolangizga qanday yordam kerak?',
        time: '11:15',
        date: '2023-05-17'
      }
    ]
  }
];

const medicalResponses = {
  "bosh og'rig'i": "Bosh og'rig'i turli sabablarga ko'ra bo'lishi mumkin: stress, uyqusizlik, migren yoki qon bosimi o'zgarishi. Agar og'riq qattiq bo'lsa yoki uzoq davom etsa, shifokorga ko'rinishingiz kerak.",
  "qon bosimi": "Normal qon bosimi 120/80 mmHg hisoblanadi. Agar sizda ko'p marta 140/90 dan yuqori bo'lsa, gipertoniya bo'lishi mumkin. Doktorga ko'rinish tavsiya etiladi.",
  "yurak og'rig'i": "Yurak sohasidagi og'riq jiddiy belgi bo'lishi mumkin. Darhol tekshiruvdan o'tishingiz kerak. Agar og'riq kuchli bo'lsa va 15 minutdan ortiq davom etsa, tez yordamga murojaat qiling.",
  "shamollash": "Shamollash belgilari: isitma, burun oqishi, tomoq og'rig'i. Ko'p suyuqlik ichish, dam olish va D vitamini qabul qilish tavsiya etiladi. Agar isitma 3 kundan ortiq davom etsa, doktorga ko'rinish kerak.",
  "allergiya": "Allergik reaksiyalar turli belgilar bilan namoyon bo'lishi mumkin: tomoq qichishishi, burun oqishi, ko'zlar yosh oqishi. Allergen bilan aloqani to'xtatish va antihistamin preparatlari qabul qilish tavsiya etiladi."
};

const ChatApp = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorList, setShowDoctorList] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Doktorlar ro'yxati */}
      {showDoctorList && (
        <div className="w-1/3 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Doktorlar</h2>
          </div>
          <div className="overflow-y-auto">
            {doctors.map(doctor => (
              <div
                key={doctor.id}
                className={`p-4 border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-50 ${selectedDoctor?.id === doctor.id ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setShowDoctorList(false);
                }}
              >
                <div className="relative">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${doctor.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat qismi */}
      {selectedDoctor && !showDoctorList && (
        <ChatPage
          doctor={selectedDoctor}
          onBack={() => setShowDoctorList(true)}
        />
      )}
    </div>
  );
};

const ChatPage = ({ doctor, onBack }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const conversation = mockMessages.find(c => c.doctorId === doctor.id);
    setMessages(conversation ? conversation.messages : []);
  }, [doctor]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getDoctorReply = (patientMessage) => {
    const lowerCaseMessage = patientMessage.toLowerCase();

    for (const [keyword, response] of Object.entries(medicalResponses)) {
      if (lowerCaseMessage.includes(keyword)) {
        return response;
      }
    }

    const generalReplies = [
      "Tushundim, davom etamiz...",
      "Qiziqarli, batafsilroq aytishingiz mumkinmi?",
      "Bu haqda qo'shimcha ma'lumot bera olasizmi?",
      "Tushunarli, keyingi qadam..."
    ];

    return generalReplies[Math.floor(Math.random() * generalReplies.length)];
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

    setTimeout(() => {
      const replyText = getDoctorReply(newMessage.text);
      const replyMsg = {
        id: messages.length + 2,
        sender: 'doctor',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <div className="relative">
          <img
            src={doctor?.avatar}
            alt={doctor?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${doctor.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        </div>
        <div className="ml-3">
          <h3 className="font-medium">{doctor?.name}</h3>
          <p className="text-sm text-gray-500">{doctor?.specialty}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map(msg => (
            <MessageBubble
              key={msg?.id}
              message={msg}
              isDoctor={msg?.sender === 'doctor'}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;