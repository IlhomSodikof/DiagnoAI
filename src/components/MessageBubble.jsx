import { FiPaperclip } from 'react-icons/fi';

const MessageBubble = ({ message, isDoctor }) => {
  return (
    <div className={`flex ${isDoctor ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isDoctor ? 'bg-white border border-gray-200' : 'bg-blue-600 text-white'}`}
      >
        {message.attachment && (
          <div className="mb-2">
            {message.attachment.type === 'image' ? (
              <img
                src={message.attachment.preview}
                alt="Attachment"
                className="rounded-lg max-h-40 object-cover"
              />
            ) : message.attachment.type === 'video' ? (
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <FiPaperclip className="text-gray-400 mr-2" />
                <span>Video fayl</span>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-3 flex items-center">
                <FiPaperclip className="mr-2" />
                <span>Yuborilgan fayl</span>
              </div>
            )}
          </div>
        )}
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${isDoctor ? 'text-gray-500' : 'text-blue-200'}`}>
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;