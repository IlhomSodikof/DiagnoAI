const MessageBubble = ({ message, isDoctor }) => {
  return (
    <div className={`flex ${isDoctor ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${isDoctor ? 'bg-white border border-gray-200' : 'bg-blue-500 text-white'}`}
      >
        {message.attachment && (
          <div className="mb-2">
            {message.attachment.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(message.attachment)}
                alt="Xabar rasmi"
                className="max-w-full h-auto rounded"
              />
            ) : (
              <audio controls className="w-full">
                <source src={URL.createObjectURL(message.attachment)} type={message.attachment.type} />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        )}
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${isDoctor ? 'text-gray-500' : 'text-blue-100'}`}>
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;