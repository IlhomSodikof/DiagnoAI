import { useState } from 'react';
import { doctors } from '../mock/doctors'; // Assuming you have a data file with doctor information
import DoctorCard from '../components/DoctorCard';

const DoctorsPage = ({ onSelectDoctor, onStartVideoCall }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Shifokorlar</h1>
        <input
          type="text"
          placeholder="Qidirish..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onSelect={onSelectDoctor}
            onVideoCall={onStartVideoCall}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;