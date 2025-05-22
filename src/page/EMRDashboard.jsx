import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { FiActivity, FiTrendingUp, FiTrendingDown, FiFilter, FiDownload, FiPrinter, FiAlertCircle, FiInfo } from 'react-icons/fi';
import BredCumb from '../components/BredCumb';

// Mock ma'lumotlar
const mockEMRData = {
  patientInfo: {
    id: 'MR-2023-0456',
    name: 'Aliyev Sherzod',
    age: 42,
    gender: 'Erkak',
    diagnosis: '2-turdagi diabet, Gipertoniya',
    doctor: 'Dr. Nodira X.',
    lastVisit: '2023-06-15',
    nextAppointment: '2023-07-10'
  },
  labResults: {
    bloodChemistry: [
      { name: 'Glukoza', value: 7.8, unit: 'mmol/L', normalRange: '3.9-6.1', status: 'high' },
      { name: 'HbA1c', value: 7.5, unit: '%', normalRange: '4.0-6.0', status: 'high' },
      { name: 'Kreatinin', value: 92, unit: 'μmol/L', normalRange: '62-106', status: 'normal' },
      { name: 'ALT', value: 34, unit: 'U/L', normalRange: '10-40', status: 'normal' },
      { name: 'AST', value: 28, unit: 'U/L', normalRange: '10-35', status: 'normal' },
      { name: 'Xolesterin', value: 5.2, unit: 'mmol/L', normalRange: '<5.2', status: 'borderline' }
    ],
    hematology: [
      { name: 'Leukositlar', value: 6.5, unit: '×10⁹/L', normalRange: '4.0-10.0', status: 'normal' },
      { name: 'Gemoglobin', value: 145, unit: 'g/L', normalRange: '130-170', status: 'normal' },
      { name: 'Trombositlar', value: 210, unit: '×10⁹/L', normalRange: '150-400', status: 'normal' },
      { name: 'Eritrositlar', value: 4.8, unit: '×10¹²/L', normalRange: '4.5-5.5', status: 'normal' }
    ],
    urineAnalysis: [
      { name: 'Protein', value: 'yo\'q', unit: '', normalRange: 'yo\'q', status: 'normal' },
      { name: 'Glukoza', value: '+', unit: '', normalRange: 'yo\'q', status: 'abnormal' },
      { name: 'Ketontanlar', value: 'yo\'q', unit: '', normalRange: 'yo\'q', status: 'normal' },
      { name: 'Leukositlar', value: '2-3', unit: 'ko\'rish', normalRange: '0-5', status: 'normal' }
    ]
  },
  trends: {
    glucose: [
      { date: '2023-01-15', fasting: 7.2, postPrandial: 9.5 },
      { date: '2023-02-15', fasting: 7.0, postPrandial: 9.0 },
      { date: '2023-03-15', fasting: 6.8, postPrandial: 8.7 },
      { date: '2023-04-15', fasting: 6.5, postPrandial: 8.5 },
      { date: '2023-05-15', fasting: 6.2, postPrandial: 8.0 },
      { date: '2023-06-15', fasting: 5.9, postPrandial: 7.8 }
    ],
    bloodPressure: [
      { date: '2023-01-15', systolic: 145, diastolic: 90 },
      { date: '2023-02-15', systolic: 142, diastolic: 88 },
      { date: '2023-03-15', systolic: 138, diastolic: 86 },
      { date: '2023-04-15', systolic: 135, diastolic: 85 },
      { date: '2023-05-15', systolic: 132, diastolic: 84 },
      { date: '2023-06-15', systolic: 130, diastolic: 82 }
    ]
  },
  medications: [
    { name: 'Metformin', dosage: '1000mg', frequency: 'kuniga 2 marta', status: 'active' },
    { name: 'Gliclazide', dosage: '60mg', frequency: 'kuniga 1 marta', status: 'active' },
    { name: 'Lisinopril', dosage: '10mg', frequency: 'kuniga 1 marta', status: 'active' },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'kechqurun', status: 'active' }
  ],
  alerts: [
    { type: 'warning', message: 'HbA1c darajasi yuqori (7.5%)', date: '2023-06-15' },
    { type: 'info', message: 'Keyingi tekshiruv 2023-07-10', date: '2023-06-15' },
    { type: 'warning', message: 'Siydikda glukoza aniqlangan', date: '2023-06-15' }
  ]
};

const EMRDashboard = () => {
  const [activeTab, setActiveTab] = useState('bloodChemistry');
  const [timeRange, setTimeRange] = useState('6m');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter results based on search and critical filter
  const filteredResults = mockEMRData.labResults[activeTab].filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCritical = showCriticalOnly ? item.status !== 'normal' : true;
    return matchesSearch && matchesCritical;
  });

  // Status colors
  const statusColors = {
    normal: 'bg-green-100 text-green-800',
    high: 'bg-red-100 text-red-800',
    low: 'bg-blue-100 text-blue-800',
    borderline: 'bg-yellow-100 text-yellow-800',
    abnormal: 'bg-orange-100 text-orange-800'
  };

  // Trend data based on selected time range
  const getTrendData = () => {
    switch (timeRange) {
      case '3m':
        return mockEMRData.trends.glucose.slice(-3);
      case '6m':
        return mockEMRData.trends.glucose;
      case '1y':
        // In a real app, this would fetch 12 months data
        return mockEMRData.trends.glucose;
      default:
        return mockEMRData.trends.glucose;
    }
  };

  // Blood pressure data for pie chart
  const bpCategories = [
    { name: 'Normal', value: 35 },
    { name: 'Elevated', value: 15 },
    { name: 'High', value: 50 }
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Bemor ma'lumotlari */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{mockEMRData.patientInfo.name}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
              <p className="text-gray-600"><span className="font-semibold">ID:</span> {mockEMRData.patientInfo.id}</p>
              <p className="text-gray-600"><span className="font-semibold">Yosh:</span> {mockEMRData.patientInfo.age}</p>
              <p className="text-gray-600"><span className="font-semibold">Diagnoz:</span> {mockEMRData.patientInfo.diagnosis}</p>
              <p className="text-gray-600"><span className="font-semibold">Shifokor:</span> {mockEMRData.patientInfo.doctor}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg">
                <p className="text-sm">Oxirgi tekshiruv</p>
                <p className="font-semibold">{mockEMRData.patientInfo.lastVisit}</p>
              </div>
              <div className="bg-green-50 text-green-800 px-4 py-2 rounded-lg">
                <p className="text-sm">Keyingi navbat</p>
                <p className="font-semibold">{mockEMRData.patientInfo.nextAppointment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BredCumb page="Labaratoya tahlili" />
      {/* Ogohlantirishlar */}
      {mockEMRData.alerts.length > 0 && (
        <div className="my-6 space-y-3">
          {mockEMRData.alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg flex items-start ${alert.type === 'warning' ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'}`}
            >
              <FiAlertCircle className={`mt-1 mr-3 flex-shrink-0 ${alert.type === 'warning' ? 'text-red-500' : 'text-blue-500'}`} />
              <div>
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm opacity-80">{alert.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asosiy kontent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chap panel - Laboratoriya natijalari */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">Laboratoriya Tahlillari</h2>
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0 sm:w-48">
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiFilter className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowCriticalOnly(!showCriticalOnly)}
                  className={`px-4 py-2 rounded-lg flex items-center ${showCriticalOnly ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  <FiAlertCircle className="mr-2" />
                  {showCriticalOnly ? 'Faqat ogohlantirishlar' : 'Barchasi'}
                </button>
              </div>
            </div>

            {/* Tablar */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('bloodChemistry')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'bloodChemistry' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Qon biokimyosi
                </button>
                <button
                  onClick={() => setActiveTab('hematology')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'hematology' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Gemotologiya
                </button>
                <button
                  onClick={() => setActiveTab('urineAnalysis')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'urineAnalysis' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Siydik tahlili
                </button>
              </nav>
            </div>

            {/* Tahlil natijalari jadvali */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahlil</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Natija</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Normal diapazon</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tendentsiya</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResults.map((test, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedTest?.name === test.name ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedTest(test)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{test.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 font-medium">{test.value} {test.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{test.normalRange}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[test.status]}`}>
                          {test.status === 'high' ? 'Yuqori' :
                            test.status === 'low' ? 'Past' :
                              test.status === 'borderline' ? 'Chegarada' :
                                test.status === 'abnormal' ? 'Normadan tashqari' : 'Normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index % 3 === 0 ? (
                          <FiTrendingDown className="text-green-500" />
                        ) : index % 3 === 1 ? (
                          <FiTrendingUp className="text-red-500" />
                        ) : (
                          <FiActivity className="text-gray-400" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tanlangan tahlil haqida batafsil */}
            {selectedTest && (
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{selectedTest.name}</h3>
                    <p className="text-gray-600">Oxirgi natija: <span className="font-medium">{selectedTest.value} {selectedTest.unit}</span></p>
                    <p className="text-gray-600">Normal diapazon: {selectedTest.normalRange}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedTest.status]}`}>
                    {selectedTest.status === 'high' ? 'Yuqori' :
                      selectedTest.status === 'low' ? 'Past' :
                        selectedTest.status === 'borderline' ? 'Chegarada' :
                          selectedTest.status === 'abnormal' ? 'Normadan tashqari' : 'Normal'}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-gray-700">
                    {selectedTest.name} {selectedTest.status === 'high' ? 'normadan yuqori ko\'rsatkich. ' :
                      selectedTest.status === 'low' ? 'normadan past ko\'rsatkich. ' :
                        selectedTest.status === 'borderline' ? 'norma chegarasida. ' :
                          selectedTest.status === 'abnormal' ? 'normadan tashqari ko\'rsatkich. ' : 'normal diapazonda. '}
                    {selectedTest.name === 'Glukoza' && 'Diabet dietasi va dori terapiyasiga rioya qilish tavsiya etiladi.'}
                    {selectedTest.name === 'HbA1c' && 'Oxirgi 3 oydagi o\'rtacha qon shakari darajasini ko\'rsatadi.'}
                    {selectedTest.name === 'Xolesterin' && 'Yurak-qon tomir kasalliklari riskini ko\'rsatadi.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tendentsiya grafiklari */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tendentsiyalar</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeRange('3m')}
                  className={`px-3 py-1 rounded-lg ${timeRange === '3m' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  3 oy
                </button>
                <button
                  onClick={() => setTimeRange('6m')}
                  className={`px-3 py-1 rounded-lg ${timeRange === '6m' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  6 oy
                </button>
                <button
                  onClick={() => setTimeRange('1y')}
                  className={`px-3 py-1 rounded-lg ${timeRange === '1y' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  1 yil
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qon shakari tendentsiyasi */}
              <div>
                <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                  <FiActivity className="text-blue-500 mr-2" /> Qon Shakari Tendentsiyasi
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getTrendData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[4, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="fasting" stroke="#3B82F6" name="Achchiq qon" />
                      <Line type="monotone" dataKey="postPrandial" stroke="#EC4899" name="Ovqatdan keyin" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Qon bosimi tendentsiyasi */}
              <div>
                <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                  <FiActivity className="text-red-500 mr-2" /> Qon Bosimi Tendentsiyasi
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockEMRData.trends.bloodPressure}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[70, 160]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="systolic" stroke="#EF4444" name="Sistolik" />
                      <Line type="monotone" dataKey="diastolic" stroke="#F59E0B" name="Diastolik" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* O'ng panel - Qo'shimcha ma'lumotlar */}
        <div className="space-y-6">
          {/* Dorilar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Davolash Rejasi</h2>
            <div className="space-y-4">
              {mockEMRData.medications.map((med, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{med.name}</h3>
                      <p className="text-sm text-gray-600">{med.dosage} · {med.frequency}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Faol</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qon bosimi kategoriyalari */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Qon Bosimi Holati</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bpCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {bpCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Normal</p>
              </div>
              <div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Elevated</p>
              </div>
              <div>
                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">High</p>
              </div>
            </div>
          </div>

          {/* Tekshiruvlar tarixi */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tekshiruvlar Tarixi</h2>
            <div className="space-y-4">
              {mockEMRData.trends.glucose.slice().reverse().map((test, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">{test.date}</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FiDownload className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FiPrinter className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Qon shakari</p>
                      <p className="font-medium">{test.fasting} mmol/L</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Qon bosimi</p>
                      <p className="font-medium">
                        {mockEMRData.trends.bloodPressure[mockEMRData.trends.bloodPressure.length - 1 - index]?.systolic || '--'}/
                        {mockEMRData.trends.bloodPressure[mockEMRData.trends.bloodPressure.length - 1 - index]?.diastolic || '--'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMRDashboard;