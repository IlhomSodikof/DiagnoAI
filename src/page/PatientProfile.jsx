import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PatientProfile = () => {
  // Mock patient data
  const [patient, setPatient] = useState({
    id: 'P123456',
    name: 'Aliyev Sherzod',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    age: 42,
    weight: 78,
    height: 175,
    region: 'Tashkent',
    phone: '+99890 123 45 67',
    bloodType: 'B+',
    address: 'Yunusabad 12, Tashkent'
  });

  // Mock medical history by year
  const medicalHistory = {
    2023: [
      { date: '2023-03-15', diagnosis: 'Gipertenziya', doctor: 'Dr. Karimov', treatment: 'Lisinopril kuniga 10 mg' },
      { date: '2023-07-22', diagnosis: '2-toifa diabet', doctor: 'Dr. Abdullaeva', treatment: 'Metformin kuniga ikki marta 500 mg' }
    ],
    2022: [
      { date: '2022-05-10', diagnosis: "O'tkir bronxit", doctor: 'Dr. Yusupov', treatment: 'Azitromitsin 5 kun davomida 500 mg' }
    ],
    2021: [
      { date: '2021-11-03', diagnosis: 'Mavsumiy allergiya', doctor: 'Dr. Khamidova', treatment: "Ketirizin kerak bo'lganda 10 mg" }
    ]
  };

  // Mock doctors grouped by specialty
  const doctorSpecialties = {
    Cardiology: [
      { id: 1, name: 'Dr. Karimov' },
      { id: 2, name: 'Dr. Tursunov' }
    ],
    Endocrinology: [
      { id: 3, name: 'Dr. Abdullaeva' },
      { id: 4, name: 'Dr. Nazarova' }
    ],
    Pulmonology: [
      { id: 5, name: 'Dr. Yusupov' },
      { id: 6, name: 'Dr. Rakhimov' }
    ]
  };

  const locations = [
    { id: 1, name: 'Markaziy Kasalxona, Toshkent' },
    { id: 2, name: 'Medical Center, Yunusobod' },
    { id: 3, name: 'City Clinic, Chilonzor' }
  ];

  // State for appointment form
  const [appointment, setAppointment] = useState({
    specialty: '',
    doctor: '',
    condition: '',
    date: '',
    time: '',
    location: ''
  });

  // State for selected year in medical history
  const [selectedYear, setSelectedYear] = useState(2023);

  // State for monitoring dropdown
  const [showMonitoringDropdown, setShowMonitoringDropdown] = useState(false);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      [name]: value,
      // Reset doctor when specialty changes
      ...(name === 'specialty' ? { doctor: '' } : {})
    }));
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    console.log('New appointment:', appointment);
    alert('Appointment scheduled successfully!');
    setAppointment({
      specialty: '',
      doctor: '',
      condition: '',
      date: '',
      time: '',
      location: ''
    });
  };

  return (
    <div className="container mx-auto px-32 py-8">
      {/* Patient Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <img
              src={patient.photo}
              alt="Patient"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 mb-4"
            />
            <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
              Suratni yangilash
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
              <p className="text-gray-600">Patient ID: {patient.id}</p>

              <div className="mt-4 space-y-2">
                <p><span className="font-medium">Yoshi:</span> {patient.age} years</p>
                <p><span className="font-medium">Og'irligi:</span> {patient.weight} kg</p>
                <p><span className="font-medium">Bo'yi:</span> {patient.height} cm</p>
              </div>
            </div>

            <div className="space-y-2 mt-16">
              <p><span className="font-medium">Hududi:</span> {patient.region}</p>
              <p><span className="font-medium">Tel:</span> {patient.phone}</p>
              <p><span className="font-medium">Qon gruppasi:</span> {patient.bloodType}</p>
              <p><span className="font-medium">Manzili:</span> {patient.address}</p>
            </div>
          </div>
        </div>

        {/* Monitoring Dropdown */}
        <div className="mt-6 relative">
          <button
            onClick={() => setShowMonitoringDropdown(!showMonitoringDropdown)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            Tibbiy ma'lumotlar
            <svg
              className={`ml-2 w-4 h-4 transition-transform ${showMonitoringDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showMonitoringDropdown && (
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg">
              <div className="py-1">
                <Link to="/monitoring" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Monitoring</Link>
                <Link to="/rentgen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rentgen</Link>
                <Link to="/analysis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ekg</Link>
                <Link to="/labaratory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Labaratoya taxlili</Link>
                <Link to="/parmacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dorixona</Link>
                <Link to="/statistic" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Statistika</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Medical History Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Bemorning kasalik tarixi</h2>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {Object.keys(medicalHistory).sort().map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg ${selectedYear == year ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {medicalHistory[selectedYear]?.length > 0 ? (
              medicalHistory[selectedYear].map((record, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start p-5">
                    <div>
                      <h3 className="font-medium text-gray-800">{record.diagnosis}</h3>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {record.doctor}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{record.treatment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No medical records found for {selectedYear}</p>
            )}
          </div>
        </div>

        {/* Appointment Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Do'ktor qabuliga murojat</h2>

          <form onSubmit={handleSubmitAppointment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Murojat sababi</label>
              <input
                type="text"
                name="condition"
                value={appointment.condition}
                onChange={handleAppointmentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mutaxassislik</label>
              <select
                name="specialty"
                value={appointment.specialty}
                onChange={handleAppointmentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Mutaxassislikni tanlang</option>
                {Object.keys(doctorSpecialties).map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doktor</label>
              <select
                name="doctor"
                value={appointment.doctor}
                onChange={handleAppointmentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!appointment.specialty}
              >
                <option value="">Doktorni tanlang</option>
                {appointment.specialty && doctorSpecialties[appointment.specialty]?.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt</label>
                <input
                  type="date"
                  name="date"
                  value={appointment.date}
                  onChange={handleAppointmentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soat</label>
                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleAppointmentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joylashuv</label>
              <select
                name="location"
                value={appointment.location}
                onChange={handleAppointmentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Joylashuvni kiriting</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Schedule Appointment
            </button>
          </form>

          {/* Upcoming Appointments */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-3">Belgilangan ko'riklar</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium">Dr Karimov (kardiologiya)</p>
                <p className="text-sm">2023-yil 15-iyun, soat 10:30</p>
                <p className="text-sm text-gray-600">Markaziy kasalxona, Toshkent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;