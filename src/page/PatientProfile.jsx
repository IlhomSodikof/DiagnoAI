import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaTimes, FaCheck } from 'react-icons/fa';


const PatientProfile = () => {
  // Mock patient data
  const [patient, setPatient] = useState({
    id: 'P123456',
    name: 'Aliyev Sherzod',
    photo: null,
    age: 42,
    weight: 78,
    height: 175,
    region: 'Tashkent',
    phone: '+99890 123 45 67',
    bloodType: 'B+',
    address: 'Yunusabad 12, Tashkent'
  });

  // Photo upload states
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    progress: 0,
    error: null,
    preview: null,
    cropMode: false,
    croppedImage: null
  });

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setUploadState({ ...uploadState, error: 'Faqat rasm fayllari qoʻllab-quvvatlanadi' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadState({ ...uploadState, error: 'Rasm hajmi 5MB dan oshmasligi kerak' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadState({
        ...uploadState,
        preview: event.target.result,
        cropMode: true,
        error: null
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle crop confirmation
  const handleCropConfirm = () => {
    if (!canvasRef.current || !uploadState.preview) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      // Calculate crop dimensions (square aspect ratio)
      const size = Math.min(image.width, image.height);
      canvas.width = 300;
      canvas.height = 300;

      // Draw cropped image
      ctx.drawImage(
        image,
        crop.x * image.width,
        crop.y * image.height,
        size,
        size,
        0,
        0,
        300,
        300
      );

      // Get cropped image data
      const croppedImageUrl = canvas.toDataURL('image/jpeg');

      // Simulate upload process
      setUploadState({ ...uploadState, isUploading: true, cropMode: false });

      // Simulate API call with progress
      let progress = 0;
      const uploadInterval = setInterval(() => {
        progress += 10;
        setUploadState(prev => ({ ...prev, progress }));

        if (progress >= 100) {
          clearInterval(uploadInterval);
          setTimeout(() => {
            setPatient({ ...patient, photo: croppedImageUrl });
            setUploadState({
              isUploading: false,
              progress: 0,
              error: null,
              preview: null,
              cropMode: false,
              croppedImage: croppedImageUrl
            });
          }, 500);
        }
      }, 200);
    };

    image.src = uploadState.preview;
  };

  // Handle crop cancel
  const handleCropCancel = () => {
    setUploadState({
      ...uploadState,
      preview: null,
      cropMode: false,
      error: null
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const event = { target: { files: [file] } };
      handleFileChange(event);
    }
  };

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
      { id: 1, name: 'Dr. Karimov', local: true },
      { id: 2, name: 'Dr. Tursunov', local: true }
    ],
    Endocrinology: [
      { id: 3, name: 'Dr. Abdullaeva', local: true },
      { id: 4, name: 'Dr. Nazarova', local: true }
    ],
    Pulmonology: [
      { id: 5, name: 'Dr. Yusupov', local: true },
      { id: 6, name: 'Dr. Rakhimov', local: true }
    ]
  };

  // International doctors
  const internationalDoctors = {
    Cardiology: [
      { id: 101, name: 'Prof. Michael Johnson (USA)', specialty: 'Cardiology', languages: ['English', 'Russian'], available: ['Mon', 'Wed', 'Fri'] },
      { id: 102, name: 'Dr. Hans Müller (Germany)', specialty: 'Cardiology', languages: ['German', 'English'], available: ['Tue', 'Thu'] }
    ],
    Oncology: [
      { id: 201, name: 'Prof. Chen Wei (China)', specialty: 'Oncology', languages: ['Chinese', 'English'], available: ['Mon', 'Wed'] },
      { id: 202, name: 'Dr. Raj Patel (India)', specialty: 'Oncology', languages: ['English', 'Hindi'], available: ['Tue', 'Thu', 'Sat'] }
    ],
    Neurology: [
      { id: 301, name: 'Prof. Sarah Smith (UK)', specialty: 'Neurology', languages: ['English'], available: ['Mon', 'Tue', 'Wed'] },
      { id: 302, name: 'Dr. Pierre Dubois (France)', specialty: 'Neurology', languages: ['French', 'English'], available: ['Thu', 'Fri'] }
    ]
  };

  const locations = [
    { id: 1, name: 'Markaziy Kasalxona, Toshkent' },
    { id: 2, name: 'Medical Center, Yunusobod' },
    { id: 3, name: 'City Clinic, Chilonzor' }
  ];

  // State for appointment form
  const [appointmentType, setAppointmentType] = useState('local'); // 'local' or 'international'
  const [appointment, setAppointment] = useState({
    specialty: '',
    doctor: '',
    condition: '',
    date: '',
    time: '',
    location: '',
    language: ''
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
    const appointmentData = {
      ...appointment,
      type: appointmentType,
      patientId: patient.id,
      status: 'scheduled'
    };
    console.log('New appointment:', appointmentData);
    alert(`Appointment ${appointmentType === 'local' ? 'scheduled' : 'booked'} successfully!`);
    setAppointment({
      specialty: '',
      doctor: '',
      condition: '',
      date: '',
      time: '',
      location: '',
      language: ''
    });
  };

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      type: 'local',
      doctor: 'Dr. Karimov (Cardiology)',
      date: '2023-06-15',
      time: '10:30',
      location: 'Markaziy kasalxona, Toshkent',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'international',
      doctor: 'Prof. Michael Johnson (USA)',
      date: '2023-06-20',
      time: '14:00',
      location: 'Online (Zoom)',
      status: 'confirmed'
    },
    {
      id: 3,
      type: 'international',
      doctor: 'Dr. Raj Patel (India)',
      date: '2023-07-05',
      time: '11:30',
      location: 'Online (Google Meet)',
      status: 'pending'
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-32 py-8">
      {/* Patient Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo Upload Section */}
              <div className="flex flex-col items-center">
                <div
                  className={`relative w-32 h-32 rounded-full border-4 ${uploadState.error ? 'border-red-500' : 'border-blue-100'} overflow-hidden mb-4`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {uploadState.cropMode ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="relative w-full h-full overflow-hidden rounded-full">
                        <img
                          src={uploadState.preview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                          style={{
                            transform: `translate(${crop.x * 100}%, ${crop.y * 100}%) scale(${zoom})`
                          }}
                        />
                        <div className="absolute inset-0 border-2 border-white rounded-full pointer-events-none"></div>
                      </div>
                    </div>
                  ) : patient.photo ? (
                    <img
                      src={patient.photo}
                      alt="Patient"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaCamera className="text-gray-400 text-2xl" />
                    </div>
                  )}

                  {uploadState.isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="w-20 h-1 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${uploadState.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {uploadState.cropMode ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCropCancel}
                      className="bg-red-100 text-red-600 p-2 rounded-full"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={handleCropConfirm}
                      className="bg-green-100 text-green-600 p-2 rounded-full"
                    >
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                  >
                    <FaCamera className="mr-2" />
                    {patient.photo ? "Suratni almashtirish" : "Surat yuklash"}
                  </button>
                )}

                {uploadState.error && (
                  <p className="mt-2 text-sm text-red-500">{uploadState.error}</p>
                )}
              </div>

              {/* ... (rest of your existing profile info code) */}
            </div>
          </div>

          {/* Hidden canvas for cropping */}
          <canvas ref={canvasRef} className="hidden" />

          {/* <div className="flex flex-col items-center">
            <div
              className={`relative w-32 h-32 rounded-full border-4 ${uploadState.error ? 'border-red-500' : 'border-blue-100'} overflow-hidden mb-4`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {uploadState.cropMode ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="relative w-full h-full overflow-hidden rounded-full">
                    <img
                      src={uploadState.preview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      style={{
                        transform: `translate(${crop.x * 100}%, ${crop.y * 100}%) scale(${zoom})`
                      }}
                    />
                    <div className="absolute inset-0 border-2 border-white rounded-full pointer-events-none"></div>
                  </div>
                </div>
              ) : patient.photo ? (
                <img
                  src={patient.photo}
                  alt="Patient"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FaCamera className="text-gray-400 text-2xl" />
                </div>
              )}

              {uploadState.isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="w-20 h-1 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${uploadState.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {uploadState.cropMode ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleCropCancel}
                  className="bg-red-100 text-red-600 p-2 rounded-full"
                >
                  <FaTimes />
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="bg-green-100 text-green-600 p-2 rounded-full"
                >
                  <FaCheck />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center"
              >
                <FaCamera className="mr-2" />
                {patient.photo ? "Suratni almashtirish" : "Surat yuklash"}
              </button>
            )}

            {uploadState.error && (
              <p className="mt-2 text-sm text-red-500">{uploadState.error}</p>
            )}
          </div> */}

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
          <div className="flex border-b mb-4">
            <button
              onClick={() => setAppointmentType('local')}
              className={`px-4 py-2 font-medium ${appointmentType === 'local' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Mahalliy doktor
            </button>
            <button
              onClick={() => setAppointmentType('international')}
              className={`px-4 py-2 font-medium ${appointmentType === 'international' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Xorijiy professorlar
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {appointmentType === 'local' ? "Do'ktor qabuliga murojat" : "Xalqaro konsultatsiya"}
          </h2>

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
                {Object.keys(appointmentType === 'local' ? doctorSpecialties : internationalDoctors).map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {appointmentType === 'local' ? 'Doktor' : 'Professor'}
              </label>
              <select
                name="doctor"
                value={appointment.doctor}
                onChange={handleAppointmentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!appointment.specialty}
              >
                <option value="">Tanlang</option>
                {appointment.specialty &&
                  (appointmentType === 'local'
                    ? doctorSpecialties[appointment.specialty]?.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))
                    : internationalDoctors[appointment.specialty]?.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} ({doctor.languages.join(', ')})
                      </option>
                    ))
                  )
                }
              </select>
            </div>

            {appointmentType === 'international' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Til</label>
                <select
                  name="language"
                  value={appointment.language}
                  onChange={handleAppointmentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Konsultatsiya tili</option>
                  <option value="english">English</option>
                  <option value="russian">Russian</option>
                  <option value="uzbek">Uzbek (tarjimon bilan)</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sana</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt</label>
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

            {appointmentType === 'local' ? (
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
            ) : (
              <div className="bg-blue-50 p-3 rounded-md text-sm">
                <p className="font-medium">Online konsultatsiya</p>
                <p>Video konferensiya havolasi sizga SMS orqali yuboriladi</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {appointmentType === 'local' ? 'Qabulga yozilish' : 'Konsultatsiyani bron qilish'}
            </button>
          </form>

          {/* Upcoming Appointments */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-3">Belgilangan ko'riklar</h3>
            <div className="space-y-3">
              {appointments.map(appt => (
                <div
                  key={appt.id}
                  className={`p-3 rounded-lg ${appt.type === 'international' ? 'bg-purple-50 border-l-4 border-purple-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{appt.doctor}</p>
                    <span className={`text-xs px-2 py-1 rounded ${appt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {appt.status === 'confirmed' ? 'Tasdiqlangan' : 'Kutilmoqda'}
                    </span>
                  </div>
                  <p className="text-sm">{appt.date}, {appt.time}</p>
                  <p className="text-sm text-gray-600">{appt.location}</p>
                  {appt.type === 'international' && (
                    <div className="mt-2 flex items-center text-sm">
                      <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Video konsultatsiya</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;