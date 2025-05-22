// import React, { useState } from 'react';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Mock ma'lumotlar - aslida bu API orqali keladi
// const mockPatientData = {
//   patientInfo: {
//     id: 'P-10023',
//     name: 'Fazliddin Soliyev',
//     age: 58,
//     gender: 'Erkak',
//     diagnosis: 'Gipertoniya 2 daraja',
//     doctor: 'Dr. Aliyev Sh.',
//     lastCheckup: '2023-05-15'
//   },
//   dailyStats: [
//     { date: '2023-05-01', bloodPressure: '130/85', temperature: 36.6, pulse: 72, mood: 'yaxshi', medication: 'Qabul qilindi', notes: '' },
//     { date: '2023-05-02', bloodPressure: '132/88', temperature: 36.7, pulse: 75, mood: 'yaxshi', medication: 'Qabul qilindi', notes: '' },
//     { date: '2023-05-03', bloodPressure: '128/82', temperature: 36.5, pulse: 70, mood: 'yaxshi', medication: 'Qabul qilindi', notes: '' },
//     { date: '2023-05-04', bloodPressure: '135/90', temperature: 36.8, pulse: 78, mood: 'o\'rtacha', medication: 'Qabul qilindi', notes: 'Yengil bosh og\'rig\'i' },
//     { date: '2023-05-05', bloodPressure: '140/92', temperature: 37.0, pulse: 80, mood: 'yomon', medication: 'Qabul qilinmadi', notes: 'Uyqusizlik' },
//     { date: '2023-05-06', bloodPressure: '138/89', temperature: 36.9, pulse: 76, mood: 'o\'rtacha', medication: 'Qabul qilindi', notes: '' },
//     { date: '2023-05-07', bloodPressure: '125/80', temperature: 36.6, pulse: 72, mood: 'yaxshi', medication: 'Qabul qilindi', notes: '' },
//   ]
// };

// // Mood uchun ranglar
// const moodColors = {
//   'yaxshi': 'bg-green-500',
//   'o\'rtacha': 'bg-yellow-500',
//   'yomon': 'bg-red-500'
// };

// // Qon bosimini pars qilish
// const parseBloodPressure = (bp) => {
//   const [systolic, diastolic] = bp.split('/').map(Number);
//   return { systolic, diastolic };
// };

// const PatientDailyMonitoring = () => {
//   const [selectedDate, setSelectedDate] = useState(mockPatientData.dailyStats[mockPatientData.dailyStats.length - 1].date);
//   const [showNotesInput, setShowNotesInput] = useState(false);
//   const [notes, setNotes] = useState('');

//   // Tanlangan kundagi ma'lumotlar
//   const selectedDayData = mockPatientData.dailyStats.find(day => day.date === selectedDate);
//   const bloodPressure = parseBloodPressure(selectedDayData.bloodPressure);

//   // Grafiklar uchun ma'lumotlarni tayyorlash
//   const chartData = mockPatientData.dailyStats.map(day => {
//     const bp = parseBloodPressure(day.bloodPressure);
//     return {
//       date: day.date,
//       systolic: bp.systolic,
//       diastolic: bp.diastolic,
//       temperature: day.temperature,
//       pulse: day.pulse
//     };
//   });

//   // Yangi eslatma qo'shish
//   const handleAddNote = () => {
//     if (notes.trim()) {
//       // Bu yerda API chaqiruvi bo'lishi kerak
//       selectedDayData.notes = notes;
//       setNotes('');
//       setShowNotesInput(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Bemor ma'lumotlari */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Bemor Ma'lumotlari</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <p className="text-gray-600">Ism:</p>
//             <p className="font-semibold">{mockPatientData.patientInfo.name}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Yosh:</p>
//             <p className="font-semibold">{mockPatientData.patientInfo.age}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Diagnoz:</p>
//             <p className="font-semibold">{mockPatientData.patientInfo.diagnosis}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Shifokor:</p>
//             <p className="font-semibold">{mockPatientData.patientInfo.doctor}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">So'nggi tekshiruv:</p>
//             <p className="font-semibold">{mockPatientData.patientInfo.lastCheckup}</p>
//           </div>
//         </div>
//       </div>

//       {/* Kundalik monitoring */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Kundalik Monitoring</h2>

//         {/* Sana tanlash */}
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Sana tanlang:</label>
//           <div className="flex space-x-2 overflow-x-auto pb-2">
//             {mockPatientData.dailyStats.map((day) => (
//               <button
//                 key={day.date}
//                 onClick={() => setSelectedDate(day.date)}
//                 className={`px-4 py-2 rounded-lg ${selectedDate === day.date
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//               >
//                 {day.date}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tanlangan kundagi ma'lumotlar */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {/* Qon bosimi */}
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-blue-800 mb-2">Qon Bosimi</h3>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600">Sistolik</p>
//                 <p className="text-3xl font-bold text-blue-600">{bloodPressure.systolic} <span className="text-sm">mmHg</span></p>
//               </div>
//               <div className="text-4xl text-blue-400">/</div>
//               <div>
//                 <p className="text-gray-600">Diastolik</p>
//                 <p className="text-3xl font-bold text-blue-600">{bloodPressure.diastolic} <span className="text-sm">mmHg</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Tana harorati */}
//           <div className="bg-red-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-red-800 mb-2">Tana Harorati</h3>
//             <p className="text-3xl font-bold text-red-600">{selectedDayData.temperature} <span className="text-sm">°C</span></p>
//           </div>

//           {/* Puls */}
//           <div className="bg-green-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-green-800 mb-2">Puls</h3>
//             <p className="text-3xl font-bold text-green-600">{selectedDayData.pulse} <span className="text-sm">bpm</span></p>
//           </div>

//           {/* Kayfiyat */}
//           <div className="bg-yellow-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-yellow-800 mb-2">Kayfiyat</h3>
//             <div className="flex items-center">
//               <div className={`w-4 h-4 rounded-full ${moodColors[selectedDayData.mood]} mr-2`}></div>
//               <p className="text-xl font-semibold capitalize">{selectedDayData.mood}</p>
//             </div>
//           </div>

//           {/* Dorilar */}
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-purple-800 mb-2">Dorilar</h3>
//             <p className={`text-xl font-semibold ${selectedDayData.medication === 'Qabul qilindi' ? 'text-purple-600' : 'text-red-600'}`}>
//               {selectedDayData.medication}
//             </p>
//           </div>

//           {/* Harakatlar */}
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Harakatlar</h3>
//             <button
//               onClick={() => setShowNotesInput(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Eslatma qo'shish
//             </button>
//           </div>
//         </div>

//         {/* Eslatmalar */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Eslatmalar</h3>
//           {showNotesInput ? (
//             <div className="mb-4">
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 rows="3"
//                 placeholder="Bemor holati haqida eslatma..."
//               ></textarea>
//               <div className="flex space-x-2 mt-2">
//                 <button
//                   onClick={handleAddNote}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Saqlash
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowNotesInput(false);
//                     setNotes('');
//                   }}
//                   className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
//                 >
//                   Bekor qilish
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-gray-50 p-4 rounded-lg">
//               {selectedDayData.notes ? (
//                 <p className="text-gray-700">{selectedDayData.notes}</p>
//               ) : (
//                 <p className="text-gray-500 italic">Eslatmalar mavjud emas</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Grafiklar */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Qon bosimi grafigi */}
//           <div className="bg-white p-4 rounded-lg border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Qon Bosimi Tarixi</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="systolic" stroke="#3b82f6" name="Sistolik" />
//                   <Line type="monotone" dataKey="diastolic" stroke="#8b5cf6" name="Diastolik" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Puls va harorat grafigi */}
//           <div className="bg-white p-4 rounded-lg border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Puls va Harorat</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
//                   <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
//                   <Tooltip />
//                   <Legend />
//                   <Bar yAxisId="left" dataKey="pulse" fill="#10b981" name="Puls (bpm)" />
//                   <Bar yAxisId="right" dataKey="temperature" fill="#ef4444" name="Harorat (°C)" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDailyMonitoring;

// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { BellIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

// // Mock ma'lumotlar
// const mockPatientData = {
//   patientInfo: {
//     id: 'P-10023',
//     name: 'Fazliddin Soliyev',
//     age: 58,
//     gender: 'Erkak',
//     diagnosis: 'Gipertoniya 2 daraja',
//     doctor: 'Dr. Aliyev Sh.',
//     room: '405-xona',
//     lastCheckup: '2023-05-15'
//   },
//   hourlyStats: [
//     { time: '08:00', bloodPressure: '130/85', temperature: 36.6, pulse: 72, oxygen: 98, medication: { taken: true, time: '08:00', type: 'Lisinopril 10mg' } },
//     { time: '09:00', bloodPressure: '128/82', temperature: 36.5, pulse: 70, oxygen: 97, medication: null },
//     { time: '10:00', bloodPressure: '132/88', temperature: 36.7, pulse: 75, oxygen: 96, medication: null },
//     { time: '11:00', bloodPressure: '135/90', temperature: 36.8, pulse: 78, oxygen: 95, medication: { taken: false, time: '11:00', type: 'Amlodipine 5mg' } },
//     { time: '12:00', bloodPressure: '125/80', temperature: 36.6, pulse: 72, oxygen: 97, medication: null },
//     { time: '13:00', bloodPressure: '130/85', temperature: 36.7, pulse: 74, oxygen: 98, medication: { taken: true, time: '13:00', type: 'Metoprolol 25mg' } },
//     { time: '14:00', bloodPressure: '128/82', temperature: 36.5, pulse: 71, oxygen: 97, medication: null },
//     { time: '15:00', bloodPressure: '140/92', temperature: 37.0, pulse: 80, oxygen: 94, medication: { taken: true, time: '15:00', type: 'Hydrochlorothiazide 12.5mg' } },
//   ],
//   treatmentSchedule: [
//     { time: '08:00', type: 'Dori qabuli', medication: 'Lisinopril 10mg', completed: true },
//     { time: '11:00', type: 'Dori qabuli', medication: 'Amlodipine 5mg', completed: false },
//     { time: '13:00', type: 'Dori qabuli', medication: 'Metoprolol 25mg', completed: true },
//     { time: '15:00', type: 'Dori qabuli', medication: 'Hydrochlorothiazide 12.5mg', completed: true },
//     { time: '16:00', type: 'Fizioterapiya', procedure: 'Elektroforez', completed: false },
//     { time: '18:00', type: 'Tekshiruv', procedure: 'Qon bosimi monitoringi', completed: false },
//   ]
// };

// const PatientDailyMonitoring = () => {
//   const [selectedTime, setSelectedTime] = useState(mockPatientData.hourlyStats[0].time);
//   const [smsMessage, setSmsMessage] = useState('');
//   const [notifications, setNotifications] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Har bir soatda yangilash
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000); // Har minutda yangilash

//     return () => clearInterval(timer);
//   }, []);

//   // Tanlangan vaqt ma'lumotlari
//   const selectedHourData = mockPatientData.hourlyStats.find(hour => hour.time === selectedTime);
//   const bloodPressure = selectedHourData.bloodPressure.split('/').map(Number);

//   // Grafik ma'lumotlari
//   const chartData = mockPatientData.hourlyStats.map(hour => {
//     const bp = hour.bloodPressure.split('/').map(Number);
//     return {
//       time: hour.time,
//       systolic: bp[0],
//       diastolic: bp[1],
//       temperature: hour.temperature,
//       pulse: hour.pulse,
//       oxygen: hour.oxygen
//     };
//   });

//   // SMS jo'natish
//   const sendSmsReminder = () => {
//     if (!smsMessage.trim()) return;

//     // Mock SMS jo'natish
//     const newNotification = {
//       id: Date.now(),
//       time: currentTime.toLocaleTimeString(),
//       message: smsMessage,
//       read: false,
//       type: 'sms'
//     };

//     setNotifications([newNotification, ...notifications]);
//     setSmsMessage('');

//     // Bu yerda haqiqiy SMS API chaqiruvi bo'lishi kerak
//     console.log(`SMS jo'natildi: ${smsMessage}`);
//   };

//   // Davolanishni belgilash
//   const markTreatmentAsDone = (index) => {
//     const updatedSchedule = [...mockPatientData.treatmentSchedule];
//     updatedSchedule[index].completed = true;

//     // Mock ma'lumotni yangilash
//     mockPatientData.treatmentSchedule = updatedSchedule;

//     // Bildirishnoma qo'shish
//     const newNotification = {
//       id: Date.now(),
//       time: currentTime.toLocaleTimeString(),
//       message: `${updatedSchedule[index].type} (${updatedSchedule[index].medication || updatedSchedule[index].procedure}) belgilandi`,
//       read: false,
//       type: 'treatment'
//     };

//     setNotifications([newNotification, ...notifications]);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Bemor ma'lumotlari */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">{mockPatientData.patientInfo.name}</h2>
//             <div className="flex flex-wrap gap-x-6 gap-y-2">
//               <p className="text-gray-600"><span className="font-semibold">Yosh:</span> {mockPatientData.patientInfo.age}</p>
//               <p className="text-gray-600"><span className="font-semibold">Diagnoz:</span> {mockPatientData.patientInfo.diagnosis}</p>
//               <p className="text-gray-600"><span className="font-semibold">Shifokor:</span> {mockPatientData.patientInfo.doctor}</p>
//               <p className="text-gray-600"><span className="font-semibold">Xona:</span> {mockPatientData.patientInfo.room}</p>
//             </div>
//           </div>
//           <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
//             <p className="font-semibold">{currentTime.toLocaleTimeString()}</p>
//             <p className="text-sm">{currentTime.toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Asosiy monitoring paneli */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Soatlik Monitoring</h2>

//             {/* Vaqt tanlash */}
//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">Soat tanlang:</label>
//               <div className="flex space-x-2 overflow-x-auto pb-2">
//                 {mockPatientData.hourlyStats.map((hour) => (
//                   <button
//                     key={hour.time}
//                     onClick={() => setSelectedTime(hour.time)}
//                     className={`px-3 py-1 rounded-lg text-sm ${selectedTime === hour.time
//                       ? 'bg-blue-600 text-white'
//                       : hour.medication && hour.medication.taken === false
//                         ? 'bg-red-100 text-red-700'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                   >
//                     {hour.time}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Tanlangan soat ma'lumotlari */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               {/* Qon bosimi */}
//               <div className="bg-blue-50 p-3 rounded-lg">
//                 <h3 className="text-sm font-semibold text-blue-800 mb-1">Qon Bosimi</h3>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {bloodPressure[0]}/{bloodPressure[1]} <span className="text-xs">mmHg</span>
//                 </p>
//               </div>

//               {/* Tana harorati */}
//               <div className="bg-red-50 p-3 rounded-lg">
//                 <h3 className="text-sm font-semibold text-red-800 mb-1">Harorat</h3>
//                 <p className="text-2xl font-bold text-red-600">
//                   {selectedHourData.temperature} <span className="text-xs">°C</span>
//                 </p>
//               </div>

//               {/* Puls */}
//               <div className="bg-green-50 p-3 rounded-lg">
//                 <h3 className="text-sm font-semibold text-green-800 mb-1">Puls</h3>
//                 <p className="text-2xl font-bold text-green-600">
//                   {selectedHourData.pulse} <span className="text-xs">bpm</span>
//                 </p>
//               </div>

//               {/* Kislorod */}
//               <div className="bg-purple-50 p-3 rounded-lg">
//                 <h3 className="text-sm font-semibold text-purple-800 mb-1">Kislorod</h3>
//                 <p className="text-2xl font-bold text-purple-600">
//                   {selectedHourData.oxygen} <span className="text-xs">%</span>
//                 </p>
//               </div>
//             </div>

//             {/* Dori qabuli */}
//             {selectedHourData.medication && (
//               <div className={`p-4 rounded-lg mb-6 ${selectedHourData.medication.taken ? 'bg-green-50' : 'bg-red-50'}`}>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold text-gray-800">Dori qabuli</h3>
//                     <p className={selectedHourData.medication.taken ? 'text-green-700' : 'text-red-700'}>
//                       {selectedHourData.medication.type} - {selectedHourData.medication.taken ? 'Qabul qilindi' : 'Qabul qilinmadi'}
//                     </p>
//                   </div>
//                   {!selectedHourData.medication.taken && (
//                     <button
//                       onClick={() => {
//                         selectedHourData.medication.taken = true;
//                         const newNotification = {
//                           id: Date.now(),
//                           time: currentTime.toLocaleTimeString(),
//                           message: `${selectedHourData.medication.type} qabul qilindi`,
//                           read: false,
//                           type: 'medication'
//                         };
//                         setNotifications([newNotification, ...notifications]);
//                       }}
//                       className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
//                     >
//                       Tasdiqlash
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Grafiklar */}
//             <div className="grid grid-cols-1 gap-6">
//               {/* Qon bosimi grafigi */}
//               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Qon Bosimi</h3>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="time" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey="systolic" stroke="#3b82f6" name="Sistolik" />
//                       <Line type="monotone" dataKey="diastolic" stroke="#8b5cf6" name="Diastolik" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Puls va kislorod grafigi */}
//               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Puls va Kislorod</h3>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="time" />
//                       <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
//                       <YAxis yAxisId="right" orientation="right" stroke="#6366f1" />
//                       <Tooltip />
//                       <Legend />
//                       <Bar yAxisId="left" dataKey="pulse" fill="#10b981" name="Puls (bpm)" />
//                       <Bar yAxisId="right" dataKey="oxygen" fill="#6366f1" name="Kislorod (%)" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Yon panel - Davolanish jadvali va SMS */}
//         <div className="space-y-6">
//           {/* Davolanish jadvali */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Davolanish Jadvali</h2>
//               <ClockIcon className="h-5 w-5 text-gray-500" />
//             </div>

//             <div className="space-y-3">
//               {mockPatientData.treatmentSchedule.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`p-3 rounded-lg border ${item.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-semibold">{item.time} - {item.type}</p>
//                       <p className="text-sm text-gray-600">
//                         {item.medication || item.procedure}
//                       </p>
//                     </div>
//                     {!item.completed ? (
//                       <button
//                         onClick={() => markTreatmentAsDone(index)}
//                         className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
//                       >
//                         <CheckCircleIcon className="h-5 w-5" />
//                       </button>
//                     ) : (
//                       <CheckCircleIcon className="h-5 w-5 text-green-500" />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SMS xabarnoma */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//               <BellIcon className="h-5 w-5 mr-2" /> SMS Eslatma
//             </h2>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Xabar matni:</label>
//               <textarea
//                 value={smsMessage}
//                 onChange={(e) => setSmsMessage(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 rows="3"
//                 placeholder="Masalan: Soat 11:00 da Amlodipine 5mg dori qabul qilishingiz kerak"
//               ></textarea>
//             </div>

//             <button
//               onClick={sendSmsReminder}
//               disabled={!smsMessage.trim()}
//               className={`w-full py-2 rounded-lg ${smsMessage.trim()
//                 ? 'bg-blue-600 text-white hover:bg-blue-700'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//             >
//               SMS Jo'natish
//             </button>
//           </div>

//           {/* Bildirishnomalar */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Bildirishnomalar</h2>

//             {notifications.length === 0 ? (
//               <p className="text-gray-500 text-center py-4">Bildirishnomalar mavjud emas</p>
//             ) : (
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {notifications.map((note) => (
//                   <div
//                     key={note.id}
//                     className={`p-3 rounded-lg border ${note.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'}`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-semibold">{note.message}</p>
//                         <p className="text-xs text-gray-500">{note.time}</p>
//                       </div>
//                       {note.type === 'sms' ? (
//                         <BellIcon className="h-4 w-4 text-blue-500" />
//                       ) : (
//                         <CheckCircleIcon className="h-4 w-4 text-green-500" />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDailyMonitoring;
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BellIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

// Mock data
const mockPatientData = {
  patientInfo: {
    id: 'P-10023',
    name: 'Fazliddin Soliyev',
    age: 58,
    gender: 'Erkak',
    diagnosis: 'Gipertoniya 2 daraja',
    doctor: 'Dr. Aliyev Sh.',
    room: '405-xona',
    lastCheckup: '2023-05-15'
  },
  hourlyStats: [
    { time: '08:00', bloodPressure: '130/85', temperature: 36.6, pulse: 72, oxygen: 98, medication: { taken: true, time: '08:00', type: 'Lisinopril 10mg' } },
    { time: '09:00', bloodPressure: '128/82', temperature: 36.5, pulse: 70, oxygen: 97, medication: null },
    { time: '10:00', bloodPressure: '132/88', temperature: 36.7, pulse: 75, oxygen: 96, medication: null },
    { time: '11:00', bloodPressure: '135/90', temperature: 36.8, pulse: 78, oxygen: 95, medication: { taken: false, time: '11:00', type: 'Amlodipine 5mg' } },
    { time: '12:00', bloodPressure: '125/80', temperature: 36.6, pulse: 72, oxygen: 97, medication: null },
    { time: '13:00', bloodPressure: '130/85', temperature: 36.7, pulse: 74, oxygen: 98, medication: { taken: true, time: '13:00', type: 'Metoprolol 25mg' } },
    { time: '14:00', bloodPressure: '128/82', temperature: 36.5, pulse: 71, oxygen: 97, medication: null },
    { time: '15:00', bloodPressure: '140/92', temperature: 37.0, pulse: 80, oxygen: 94, medication: { taken: true, time: '15:00', type: 'Hydrochlorothiazide 12.5mg' } },
  ],
  treatmentSchedule: [
    { time: '08:00', type: 'Dori qabuli', medication: 'Lisinopril 10mg', completed: true },
    { time: '11:00', type: 'Dori qabuli', medication: 'Amlodipine 5mg', completed: false },
    { time: '13:00', type: 'Dori qabuli', medication: 'Metoprolol 25mg', completed: true },
    { time: '15:00', type: 'Dori qabuli', medication: 'Hydrochlorothiazide 12.5mg', completed: true },
    { time: '16:00', type: 'Fizioterapiya', procedure: 'Elektroforez', completed: false },
    { time: '18:00', type: 'Tekshiruv', procedure: 'Qon bosimi monitoringi', completed: false },
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
      oxygen: hour.oxygen
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
            </div>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            <p className="font-semibold">{currentTime.toLocaleTimeString()}</p>
            <p className="text-sm">{currentTime.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

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

            {/* Selected hour data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

            {/* Charts */}
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