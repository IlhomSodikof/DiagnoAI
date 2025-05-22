import { FiVideo, FiMessageSquare } from 'react-icons/fi';

const DoctorCard = ({ doctor, onSelect, onVideoCall }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 flex items-start">
        <div className="relative">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {doctor.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-bold text-lg">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialty}</p>
          <div className="mt-2 flex items-center">
            <span className="text-yellow-500">★ {doctor.rating}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{doctor.experence} yillik tajriba</span>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => onSelect(doctor)}
              className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              <FiMessageSquare className="mr-1" />
              Chat
            </button>
            <button
              onClick={() => onVideoCall(doctor)}
              disabled={!doctor.online}
              className={`flex items-center px-3 py-1 rounded-md ${doctor.online ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-100 text-gray-400'}`}
            >
              <FiVideo className="mr-1" />
              Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;