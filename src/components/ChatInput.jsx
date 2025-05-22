import { useState, useRef } from 'react';
import { FiPaperclip, FiSend } from 'react-icons/fi';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage({
        text: message,
        attachments: [...attachments]
      });
      setMessage('');
      setAttachments([]);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      type: file.type.startsWith('image/') ? 'image' :
        file.type.startsWith('video/') ? 'video' : 'file',
      file,
      preview: URL.createObjectURL(file)
    }));
    setAttachments(newAttachments);
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      {attachments.length > 0 && (
        <div className="flex items-center mb-2 space-x-2">
          {attachments.map((att, idx) => (
            <div key={idx} className="relative">
              {att.type === 'image' ? (
                <img
                  src={att.preview}
                  alt="Preview"
                  className="h-16 w-16 object-cover rounded-lg"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FiPaperclip className="text-gray-400" />
                </div>
              )}
              <button
                onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center">
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <FiPaperclip className="w-5 h-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Xabar yozing..."
          className="flex-1 border-0 focus:ring-0 focus:outline-none mx-2"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() && attachments.length === 0}
          className={`p-2 rounded-full ${!message.trim() && attachments.length === 0 ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-100'}`}
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;