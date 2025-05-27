

import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BellIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import BredCumb from '../components/BredCumb';

// Mock ma'lumotlar
const mockPatientData = {
  patientInfo: {
    id: 'P-10023',
    name: 'Aliyev Sherzod',
    age: 58,
    gender: 'Erkak',
    diagnosis: '2-turdagi diabet, Gipertoniya 2 daraja',
    doctor: 'Dr. Aliyev Sh.',
    room: '405-xona',
    lastCheckup: '2023-05-15',
    diabetesType: '2-tur',
    hba1c: 7.2,
    targetGlucoseRange: '4.0-7.0 mmol/L'
  },
  hourlyStats: [
    {
      time: '08:00',
      bloodPressure: '130/85',
      temperature: 36.6,
      pulse: 72,
      oxygen: 98,
      glucose: 6.2,
      insulin: 8,
      medication: { taken: true, time: '08:00', type: 'Lisinopril 10mg, Metformin 1000mg' }
    },
    {
      time: '09:00',
      bloodPressure: '128/82',
      temperature: 36.5,
      pulse: 70,
      oxygen: 97,
      glucose: 5.8,
      insulin: null,
      medication: null
    },
    {
      time: '10:00',
      bloodPressure: '132/88',
      temperature: 36.7,
      pulse: 75,
      oxygen: 96,
      glucose: 6.5,
      insulin: null,
      medication: null
    },
    {
      time: '11:00',
      bloodPressure: '135/90',
      temperature: 36.8,
      pulse: 78,
      oxygen: 95,
      glucose: 7.8,
      insulin: 4,
      medication: { taken: false, time: '11:00', type: 'Amlodipine 5mg' }
    },
    {
      time: '12:00',
      bloodPressure: '125/80',
      temperature: 36.6,
      pulse: 72,
      oxygen: 97,
      glucose: 6.0,
      insulin: null,
      medication: null
    },
    {
      time: '13:00',
      bloodPressure: '130/85',
      temperature: 36.7,
      pulse: 74,
      oxygen: 98,
      glucose: 5.5,
      insulin: null,
      medication: { taken: true, time: '13:00', type: 'Metoprolol 25mg' }
    },
    {
      time: '14:00',
      bloodPressure: '128/82',
      temperature: 36.5,
      pulse: 71,
      oxygen: 97,
      glucose: 6.7,
      insulin: null,
      medication: null
    },
    {
      time: '15:00',
      bloodPressure: '140/92',
      temperature: 37.0,
      pulse: 80,
      oxygen: 94,
      glucose: 8.2,
      insulin: 6,
      medication: { taken: true, time: '15:00', type: 'Hydrochlorothiazide 12.5mg' }
    },
  ],
  treatmentSchedule: [
    { time: '08:00', type: 'Dori qabuli', medication: 'Lisinopril 10mg, Metformin 1000mg', completed: true },
    { time: '11:00', type: 'Dori qabuli', medication: 'Amlodipine 5mg', completed: false },
    { time: '12:00', type: 'Qon shakari', procedure: 'Qon shakarini o\'lchash', completed: true },
    { time: '13:00', type: 'Dori qabuli', medication: 'Metoprolol 25mg', completed: true },
    { time: '15:00', type: 'Dori qabuli', medication: 'Hydrochlorothiazide 12.5mg', completed: true },
    { time: '16:00', type: 'Fizioterapiya', procedure: 'Elektroforez', completed: false },
    { time: '18:00', type: 'Tekshiruv', procedure: 'Qon bosimi va qon shakari monitoringi', completed: false },
    { time: '20:00', type: 'Insulin', medication: 'Insulin glargin 12 birlik', completed: false },
  ],
  glucoseHistory: [
    { date: '2023-05-01', fasting: 6.5, postPrandial: 8.2, hba1c: 7.5 },
    { date: '2023-04-01', fasting: 6.8, postPrandial: 9.0, hba1c: 7.8 },
    { date: '2023-03-01', fasting: 7.2, postPrandial: 9.5, hba1c: 8.1 },
    { date: '2023-02-01', fasting: 7.0, postPrandial: 9.2, hba1c: 7.9 },
  ]
};

const PatientDailyMonitoring = () => {
  const [selectedTime, setSelectedTime] = useState(mockPatientData.hourlyStats[0].time);
  const [smsReminders, setSmsReminders] = useState([]);
  const [newSms, setNewSms] = useState({
    time: '',
    message: '',
    enabled: true
  });
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glucoseNote, setGlucoseNote] = useState('');
  const [showGlucoseInput, setShowGlucoseInput] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Check for reminders to send
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0');
    const currentMinute = now.getMinutes().toString().padStart(2, '0');
    const currentTimeStr = `${currentHour}:${currentMinute}`;

    smsReminders.forEach(reminder => {
      if (reminder.time === currentTimeStr && reminder.enabled && !reminder.sent) {
        // Send notification
        const newNotification = {
          id: Date.now(),
          time: currentTimeStr,
          message: `SMS eslatma: ${reminder.message}`,
          read: false,
          type: 'sms'
        };

        setNotifications([newNotification, ...notifications]);

        // Mark as sent
        const updatedReminders = smsReminders.map(r =>
          r.id === reminder.id ? { ...r, sent: true } : r
        );
        setSmsReminders(updatedReminders);

        console.log(`SMS sent: ${reminder.message}`);
      }
    });
  }, [currentTime, smsReminders]);

  // Selected hour data
  const selectedHourData = mockPatientData.hourlyStats.find(hour => hour.time === selectedTime);
  const bloodPressure = selectedHourData.bloodPressure.split('/').map(Number);

  // Chart data
  const chartData = mockPatientData.hourlyStats.map(hour => {
    const bp = hour.bloodPressure.split('/').map(Number);
    return {
      time: hour.time,
      systolic: bp[0],
      diastolic: bp[1],
      temperature: hour.temperature,
      pulse: hour.pulse,
      oxygen: hour.oxygen,
      glucose: hour.glucose,
      insulin: hour.insulin
    };
  });

  // Generate time options for dropdown
  const timeOptions = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeStr);
    }
  }

  // Add new SMS reminder
  const addSmsReminder = () => {
    if (!newSms.time || !newSms.message.trim()) return;

    const reminder = {
      id: Date.now(),
      time: newSms.time,
      message: newSms.message,
      enabled: newSms.enabled,
      sent: false
    };

    setSmsReminders([...smsReminders, reminder]);
    setNewSms({
      time: '',
      message: '',
      enabled: true
    });
  };

  // Toggle reminder status
  const toggleReminder = (id) => {
    setSmsReminders(smsReminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  // Remove reminder
  const removeReminder = (id) => {
    setSmsReminders(smsReminders.filter(reminder => reminder.id !== id));
  };

  // Mark treatment as done
  const markTreatmentAsDone = (index) => {
    const updatedSchedule = [...mockPatientData.treatmentSchedule];
    updatedSchedule[index].completed = true;

    // Mock data update
    mockPatientData.treatmentSchedule = updatedSchedule;

    // Add notification
    const newNotification = {
      id: Date.now(),
      time: currentTime.toLocaleTimeString(),
      message: `${updatedSchedule[index].type} (${updatedSchedule[index].medication || updatedSchedule[index].procedure}) belgilandi`,
      read: false,
      type: 'treatment'
    };

    setNotifications([newNotification, ...notifications]);
  };

  // Add glucose note
  const addGlucoseNote = () => {
    if (glucoseNote.trim()) {
      // In a real app, this would update the backend
      const newNotification = {
        id: Date.now(),
        time: currentTime.toLocaleTimeString(),
        message: `Qon shakari eslatmasi: ${glucoseNote}`,
        read: false,
        type: 'glucose'
      };
      setNotifications([newNotification, ...notifications]);
      setGlucoseNote('');
      setShowGlucoseInput(false);
    }
  };

  // Determine glucose status
  const getGlucoseStatus = (glucoseLevel) => {
    const targetRange = mockPatientData.patientInfo.targetGlucoseRange;
    const [min, max] = targetRange.split('-').map(parseFloat);

    if (glucoseLevel < min) return { status: 'past', color: 'bg-blue-500', text: 'Past' };
    if (glucoseLevel > max) return { status: 'high', color: 'bg-red-500', text: 'Yuqori' };
    return { status: 'normal', color: 'bg-green-500', text: 'Normal' };
  };

  const glucoseStatus = getGlucoseStatus(selectedHourData.glucose);


  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'uz-UZ'; // O'zbek tili uchun
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Ushbrauzer ovozli o'qishni qo'llab-quvvatlamaydi");
    }
  };
  return (

    <div className="container mx-auto p-4">

      {/* Patient information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{mockPatientData.patientInfo.name}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <p className="text-gray-600"><span className="font-semibold">Yosh:</span> {mockPatientData.patientInfo.age}</p>
              <p className="text-gray-600"><span className="font-semibold">Diagnoz:</span> {mockPatientData.patientInfo.diagnosis}</p>
              <p className="text-gray-600"><span className="font-semibold">Shifokor:</span> {mockPatientData.patientInfo.doctor}</p>
              <p className="text-gray-600"><span className="font-semibold">Xona:</span> {mockPatientData.patientInfo.room}</p>
              <p className="text-gray-600"><span className="font-semibold">Diabet turi:</span> {mockPatientData.patientInfo.diabetesType}</p>
              <p className="text-gray-600"><span className="font-semibold">HbA1c:</span> {mockPatientData.patientInfo.hba1c}%</p>
              <p className="text-gray-600"><span className="font-semibold">Qon shakari:</span> {mockPatientData.patientInfo.targetGlucoseRange}</p>
            </div>
          </div>

          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            <p className="font-semibold">{currentTime.toLocaleTimeString()}</p>
            <p className="text-sm">{currentTime.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <BredCumb page='Manitoring' />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main monitoring panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Soatlik Monitoring</h2>

            {/* Time selection */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Soat tanlang:</label>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {mockPatientData.hourlyStats.map((hour) => (
                  <button
                    key={hour.time}
                    onClick={() => setSelectedTime(hour.time)}
                    className={`px-3 py-1 rounded-lg text-sm ${selectedTime === hour.time
                      ? 'bg-blue-600 text-white'
                      : hour.medication && hour.medication.taken === false
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {hour.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected hour data - now with 6 metrics in 2 rows */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {/* Blood pressure */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800 mb-1">Qon Bosimi</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {bloodPressure[0]}/{bloodPressure[1]} <span className="text-xs">mmHg</span>
                </p>
              </div>

              {/* Temperature */}
              <div className="bg-red-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800 mb-1">Harorat</h3>
                <p className="text-2xl font-bold text-red-600">
                  {selectedHourData.temperature} <span className="text-xs">°C</span>
                </p>
              </div>

              {/* Pulse */}
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-green-800 mb-1">Puls</h3>
                <p className="text-2xl font-bold text-green-600">
                  {selectedHourData.pulse} <span className="text-xs">bpm</span>
                </p>
              </div>

              {/* Oxygen */}
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-purple-800 mb-1">Kislorod</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {selectedHourData.oxygen} <span className="text-xs">%</span>
                </p>
              </div>

              {/* Glucose */}
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800 mb-1">Qon Shakari</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {selectedHourData.glucose} <span className="text-xs">mmol/L</span>
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${glucoseStatus.color}`} title={glucoseStatus.text}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Maqsad: {mockPatientData.patientInfo.targetGlucoseRange}
                </p>
              </div>

              {/* Insulin */}
              <div className="bg-pink-50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-pink-800 mb-1">Insulin</h3>
                <p className="text-2xl font-bold text-pink-600">
                  {selectedHourData.insulin || '0'} <span className="text-xs">birlik</span>
                </p>
              </div>
            </div>

            {/* Glucose notes */}
            <div className="mb-6">
              {showGlucoseInput ? (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Qon Shakari Holati</h3>
                  <textarea
                    value={glucoseNote}
                    onChange={(e) => setGlucoseNote(e.target.value)}
                    className="w-full p-3 border border-yellow-300 rounded-lg mb-2"
                    rows="2"
                    placeholder="Qon shakari holati haqida eslatma..."
                  ></textarea>
                  <div className="flex space-x-2">
                    <button
                      onClick={addGlucoseNote}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                    >
                      Saqlash
                    </button>
                    <button
                      onClick={() => setShowGlucoseInput(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowGlucoseInput(true)}
                  className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 w-full"
                >
                  Qon Shakari Holati Haqida Eslatma Qo'shish
                </button>
              )}
            </div>

            {/* Medication */}
            {selectedHourData.medication && (
              <div className={`p-4 rounded-lg mb-6 ${selectedHourData.medication.taken ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">Dori qabuli</h3>
                    <p className={selectedHourData.medication.taken ? 'text-green-700' : 'text-red-700'}>
                      {selectedHourData.medication.type} - {selectedHourData.medication.taken ? 'Qabul qilindi' : 'Qabul qilinmadi'}
                    </p>
                  </div>
                  {!selectedHourData.medication.taken && (
                    <button
                      onClick={() => {
                        selectedHourData.medication.taken = true;
                        const newNotification = {
                          id: Date.now(),
                          time: currentTime.toLocaleTimeString(),
                          message: `${selectedHourData.medication.type} qabul qilindi`,
                          read: false,
                          type: 'medication'
                        };
                        setNotifications([newNotification, ...notifications]);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Tasdiqlash
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Charts - now with 3 charts */}
            <div className="grid grid-cols-1 gap-6">
              {/* Blood pressure chart */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Qon Bosimi</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="systolic" stroke="#3b82f6" name="Sistolik" />
                      <Line type="monotone" dataKey="diastolic" stroke="#8b5cf6" name="Diastolik" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Glucose and insulin chart */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Qon Shakari va Insulin</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" />
                      <YAxis yAxisId="right" orientation="right" stroke="#ec4899" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="glucose" stroke="#f59e0b" name="Qon Shakari (mmol/L)" />
                      <Line yAxisId="right" type="monotone" dataKey="insulin" stroke="#ec4899" name="Insulin (birlik)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pulse and oxygen chart */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Puls va Kislorod</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6366f1" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="pulse" fill="#10b981" name="Puls (bpm)" />
                      <Bar yAxisId="right" dataKey="oxygen" fill="#6366f1" name="Kislorod (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* HbA1c history */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">HbA1c Tarixi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPatientData.glucoseHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[5, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hba1c" stroke="#8b5cf6" name="HbA1c (%)" />
                    <Line type="monotone" dataKey="fasting" stroke="#3b82f6" name="Achchiq qon (mmol/L)" />
                    <Line type="monotone" dataKey="postPrandial" stroke="#f59e0b" name="Ovqatdan keyin (mmol/L)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Side panel - Treatment schedule and SMS */}
        <div className="space-y-6">
          {/* Treatment schedule */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Davolanish Jadvali</h2>
              <ClockIcon className="h-5 w-5 text-gray-500" />
            </div>

            {/* <div className="space-y-3">
              {mockPatientData.treatmentSchedule.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${item.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.time} - {item.type}</p>
                      <p className="text-sm text-gray-600">
                        {item.medication || item.procedure}
                      </p>
                    </div>
                    {!item.completed ? (
                      <button
                        onClick={() => markTreatmentAsDone(index)}
                        className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                    ) : (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div> */}
// Treatment schedule componentini yangilaymiz
            <div className="space-y-3">
              {mockPatientData.treatmentSchedule.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${item.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.time} - {item.type}</p>
                      <p className="text-sm text-gray-600">
                        {item.medication || item.procedure}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Ovozli o'qish tugmasi */}
                      <button
                        onClick={() => {
                          const textToSpeak = `${item.time} da ${item.type}: ${item.medication || item.procedure}`;
                          speakText(textToSpeak);
                        }}
                        className="p-1 rounded bg-purple-100 text-purple-600 hover:bg-purple-200"
                        title="Ovozli o'qish"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>

                      {!item.completed ? (
                        <button
                          onClick={() => markTreatmentAsDone(index)}
                          className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SMS reminders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BellIcon className="h-5 w-5 mr-2" /> SMS Eslatmalar
            </h2>

            {/* Add new reminder */}
            <div className="mb-4 space-y-3">
              <div>
                <label className="block text-gray-700 mb-1">Vaqt:</label>
                <select
                  value={newSms.time}
                  onChange={(e) => setNewSms({ ...newSms, time: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Vaqtni tanlang</option>
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Xabar matni:</label>
                <textarea
                  value={newSms.message}
                  onChange={(e) => setNewSms({ ...newSms, message: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="2"
                  placeholder="Masalan: Soat 11:00 da Amlodipine 5mg dori qabul qilishingiz kerak"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableSms"
                  checked={newSms.enabled}
                  onChange={(e) => setNewSms({ ...newSms, enabled: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="enableSms">Faollashtirilgan</label>
              </div>

              <button
                onClick={addSmsReminder}
                disabled={!newSms.time || !newSms.message.trim()}
                className={`w-full py-2 rounded-lg flex items-center justify-center ${newSms.time && newSms.message.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <PlusIcon className="h-4 w-4 mr-1" /> Qo'shish
              </button>
            </div>

            {/* Reminders list */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Faol eslatmalar</h3>

              {smsReminders.length === 0 ? (
                <p className="text-gray-500 text-center py-2">Eslatmalar mavjud emas</p>
              ) : (
                <div className="space-y-2">
                  {smsReminders.map(reminder => (
                    <div key={reminder.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{reminder.time}</p>
                          <p className="text-sm text-gray-600">{reminder.message}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleReminder(reminder.id)}
                            className={`p-1 rounded ${reminder.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}
                            title={reminder.enabled ? "O'chirish" : "Yoqish"}
                          >
                            {reminder.enabled ? (
                              <CheckCircleIcon className="h-4 w-4" />
                            ) : (
                              <ExclamationCircleIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => removeReminder(reminder.id)}
                            className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                            title="O'chirish"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        {reminder.sent && (
                          <span className="inline-flex items-center">
                            <CheckCircleIcon className="h-3 w-3 mr-1 text-green-500" />
                            Yuborilgan
                          </span>
                        )}
                        {!reminder.sent && reminder.enabled && (
                          <span className="inline-flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1 text-blue-500" />
                            Kutilyapti
                          </span>
                        )}
                        {!reminder.sent && !reminder.enabled && (
                          <span className="inline-flex items-center">
                            <ExclamationCircleIcon className="h-3 w-3 mr-1 text-gray-500" />
                            O'chirilgan
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Bildirishnomalar</h2>

            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Bildirishnomalar mavjud emas</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg border ${note.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{note.message}</p>
                        <p className="text-xs text-gray-500">{note.time}</p>
                      </div>
                      {note.type === 'sms' ? (
                        <BellIcon className="h-4 w-4 text-blue-500" />
                      ) : note.type === 'glucose' ? (
                        <svg className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      ) : (
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDailyMonitoring;