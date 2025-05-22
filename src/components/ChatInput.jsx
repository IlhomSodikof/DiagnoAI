// import { useState, useRef, useCallback } from 'react';
// import { PaperClipIcon, MicrophoneIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

// const ChatInput = ({ onSendMessage }) => {
//   const [message, setMessage] = useState('');
//   const [attachments, setAttachments] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleSubmit = useCallback((e) => {
//     e.preventDefault();
//     if (message.trim() || attachments.length > 0) {
//       onSendMessage({
//         text: message,
//         attachments: attachments
//       });
//       setMessage('');
//       setAttachments([]);
//     }
//   }, [message, attachments, onSendMessage]);

//   const handleAttachmentChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setAttachments(files.slice(0, 1)); // Faqat 1 ta fayl qabul qilamiz
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="bg-white border-t border-gray-200 p-4">
//       {attachments.length > 0 && (
//         <div className="flex items-center mb-2">
//           <span className="text-sm text-gray-500 mr-2">Fayl tanlangan:</span>
//           <span className="text-sm font-medium">{attachments[0].name}</span>
//           <button
//             onClick={() => setAttachments([])}
//             className="ml-2 text-red-500 hover:text-red-700"
//           >
//             ×
//           </button>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="flex items-center">
//         <div className="flex space-x-2 mr-2">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current.click()}
//             className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
//             title="Fayl qo'shish"
//           >
//             <PaperClipIcon className="h-5 w-5" />
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleAttachmentChange}
//               className="hidden"
//               accept="image/*, .pdf, .doc, .docx"
//             />
//           </button>

//           <button
//             type="button"
//             className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
//             title="Ovozli xabar"
//           >
//             <MicrophoneIcon className="h-5 w-5" />
//           </button>

//           <button
//             type="button"
//             className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
//             title="Emoji"
//           >
//             <FaceSmileIcon className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="flex-1 relative">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Xabar yozing..."
//             rows="1"
//             className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={!message.trim() && attachments.length === 0}
//           className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
//           title="Yuborish"
//         >
//           <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatInput;
import { useState, useRef, useCallback } from 'react';
import { PaperClipIcon, MicrophoneIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const audioRecorderRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage({
        text: message,
        attachments: attachments
      });
      setMessage('');
      setAttachments([]);
      setShowEmojiPicker(false);
    }
  }, [message, attachments, onSendMessage]);

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Faqat rasm va audio fayllar
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/wav'];
      const filteredFiles = files.filter(file => allowedTypes.includes(file.type));

      setAttachments(filteredFiles.slice(0, 1));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  const startRecording = () => {
    setIsRecording(true);
    // Bu yerda ovoz yozish logikasi bo'lishi kerak
    // Misol uchun:
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        audioRecorderRef.current = new MediaRecorder(stream);
        const audioChunks = [];

        audioRecorderRef.current.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };

        audioRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioFile = new File([audioBlob], 'voice-message.wav', { type: 'audio/wav' });
          setAttachments([audioFile]);
        };

        audioRecorderRef.current.start();
      })
      .catch(err => {
        console.error('Ovoz yozishda xatolik:', err);
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      audioRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 relative">
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={400} />
        </div>
      )}

      {attachments.length > 0 && (
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500 mr-2">
            {attachments[0].type.startsWith('image/') ? 'Rasm' : 'Ovozli xabar'} tanlangan:
          </span>
          <span className="text-sm font-medium">
            {attachments[0].type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(attachments[0])}
                alt="Tanlangan rasm"
                className="h-10 w-10 object-cover rounded"
              />
            ) : attachments[0].name}
          </span>
          <button
            onClick={() => setAttachments([])}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex space-x-2 mr-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            title="Fayl qo'shish"
          >
            <PaperClipIcon className="h-5 w-5" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAttachmentChange}
              className="hidden"
              accept="image/*, audio/*"
            />
          </button>

          <button
            type="button"
            className={`p-2 rounded-full hover:bg-gray-100 ${isRecording ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
            title="Ovozli xabar"
            onClick={isRecording ? stopRecording : startRecording}
          >
            <MicrophoneIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            title="Emoji"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FaceSmileIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Xabar yozing..."
            rows="1"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim() && attachments.length === 0}
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          title="Yuborish"
        >
          <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;