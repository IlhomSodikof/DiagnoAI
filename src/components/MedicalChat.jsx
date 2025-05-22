import { useState, useEffect, useRef } from 'react';

const MedicalChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Assalomu alaykum! Sog'liq masalalari bo'yicha online yordam xizmati. Savollaringizga javob beramiz.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock tibbiy javoblar
  const mockMedicalResponses = {
    "salom": "Assalomu alaykum! Sizga qanday yordam bera olamiz?",
    "yurak og'riyapti": "Yurak og'rig'i jiddiy belgi bo'lishi mumkin. Tez orada kardiologga ko'rinishingiz tavsiya etiladi. Nogironlaringiz bo'lsa, 103 raqamiga qo'ng'iroq qiling.",
    "boshim og'riyapti": "Bosh og'rig'ining ko'p sabablari bo'lishi mumkin: stress, charchoq, qon bosimi o'zgarishi. Agar og'riq kuchli bo'lsa yoki uzoq davom qilsa, shifokorga murojaat qiling.",
    "temperatura": "Kattalarda 38°C dan yuqori harorat yuqumli kasallik belgisi bo'lishi mumkin. Ko'p suyuqlik iching va dam oling. Agar 3 kundan ortiq davom qilsa, shifokorga ko'rinishingiz kerak.",
    "shifokor": "Texnik operator siz bilan bog'lanadi. Iltimos, telefon raqamingizni qoldiring va biz 5 daqiqa ichida qo'ng'iroq qilamiz."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Foydalanuvchi xabarini qo'shish
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Operator yozayotgan animatsiya
    setIsTyping(true);

    // Mock javob
    setTimeout(() => {
      setIsTyping(false);
      const lowerInput = inputValue.toLowerCase();
      let response = "Kechirasiz, savolingizni to'liq tushunmadim. Iltimos, batafsilroq yozing yoki shifokor bilan bog'lanish uchun telefon raqamingizni qoldiring.";

      Object.keys(mockMedicalResponses).forEach(key => {
        if (lowerInput.includes(key)) {
          response = mockMedicalResponses[key];
        }
      });

      const botMessage = {
        text: response,
        sender: 'bot',
        isMedical: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat tugmasi */}
      {!isOpen && (
        <div className="phoneee border-amber-300">

          <div onClick={() => setIsOpen(true)} className="">

            <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show ">
              <div className="coccoc-alo-ph-circle"></div>
              <div className="coccoc-alo-ph-circle-fill"></div>
              <div className="coccoc-alo-ph-img-circle flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>

            </div>
          </div>
        </div>
        // <button
        //   onClick={() => setIsOpen(true)}
        //   className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-xl transition-all duration-300"
        //   aria-label="Chatni ochish"
        // >
        //
        // </button>
      )}

      {/* Chat oynasi */}
      {isOpen && (
        <div className="w-80 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Chat sarlavhasi */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Tibbiy Yordam</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Xabarlar qismi */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-green-500 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}>
                  <p>{msg.text}</p>
                  {msg.isMedical && (
                    <p className="text-xs mt-1 text-gray-500 italic">Tibbiy maslahat - shaxsiy konsultatsiya uchun shifokorga murojaat qiling</p>
                  )}
                </div>
              </div>
            ))}

            {/* Operator yozayotgan animatsiya */}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input qismi */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Savolingizni yozing..."
                className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-lg"
                disabled={inputValue.trim() === ''}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Savollaringizga AI yoki shifokor javob beradi</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalChat;