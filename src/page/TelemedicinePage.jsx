import { useState } from 'react';
import DoctorsPage from './DoctorsPage';
import ChatPage from './ChatPage';

function TelemedicinePage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isVideoCall, setIsVideoCall] = useState(false);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsVideoCall(false);
  };

  const handleStartVideoCall = (doctor) => {
    setSelectedDoctor(doctor);
    setIsVideoCall(true);
  };

  const handleBackToList = () => {
    setSelectedDoctor(null);
    setIsVideoCall(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!selectedDoctor ? (
        <DoctorsPage
          onSelectDoctor={handleSelectDoctor}
          onStartVideoCall={handleStartVideoCall}
        />
      ) : isVideoCall ? (
        <div className="p-6">
          <button
            onClick={handleBackToList}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
          >
            ← Orqaga
          </button>
          <div className="bg-black rounded-xl p-4 text-white text-center">
            <h2 className="text-xl mb-4">Video konsultatsiya: {selectedDoctor.name}</h2>
            <p>Mock video qo'ng'iroq sahifasi</p>
          </div>
        </div>
      ) : (
        <ChatPage
          doctor={selectedDoctor}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}

export default TelemedicinePage;