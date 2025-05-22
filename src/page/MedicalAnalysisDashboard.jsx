import React, { useState, useEffect } from 'react';
import {
  FiHeart, FiDroplet, FiActivity, FiTrendingUp,
  FiTrendingDown, FiAlertCircle, FiCheckCircle,
  FiEdit2, FiSave, FiPrinter, FiDownload, FiPlus
} from 'react-icons/fi';

const MedicalAnalysisDashboard = () => {
  // Mock bemor ma'lumotlari
  const mockPatient = {
    id: '12345',
    name: 'Ali Valiyev',
    age: 42,
    gender: 'Erkak',
    lastVisit: '2023-11-15',
    doctor: 'Dr. Nodira Xalilova'
  };

  // Mock EKG ma'lumotlari
  const initialEkgData = {
    date: '2023-11-15',
    rate: 72, // bpm
    rhythm: 'Normal sinus rhythm',
    prInterval: 160, // ms
    qrsDuration: 90, // ms
    qtInterval: 380, // ms
    axis: 45, // degrees
    interpretation: 'Normal EKG',
    abnormalities: 'Yo\'q',
    imageUrl: 'https://example.com/ekg-wave.png'
  };

  // Mock qon tahlillari
  const initialBloodTests = {
    date: '2023-11-15',
    wbc: 6.5, // 10^3/µL
    rbc: 5.2, // 10^6/µL
    hemoglobin: 14.5, // g/dL
    hematocrit: 42.5, // %
    platelets: 250, // 10^3/µL
    glucose: 95, // mg/dL
    cholesterol: 180, // mg/dL
    hdl: 55, // mg/dL
    ldl: 110, // mg/dL
    triglycerides: 120 // mg/dL
  };

  // Mock qon bosimi
  const initialBloodPressure = {
    date: '2023-11-15',
    systolic: 120, // mmHg
    diastolic: 80, // mmHg
    pulse: 72, // bpm
    position: 'O\'tirgan holda',
    notes: 'Normal bosim'
  };

  const [patient, setPatient] = useState(mockPatient);
  const [ekgData, setEkgData] = useState(initialEkgData);
  const [bloodTests, setBloodTests] = useState(initialBloodTests);
  const [bloodPressure, setBloodPressure] = useState(initialBloodPressure);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('ekg');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, text: 'Bemorda yurak urish tezligi normal dozada', date: '2023-11-15 09:30', doctor: 'Dr. Nodira Xalilova' },
    { id: 2, text: 'Qon tahlillarida glyukoza normal diapazonda', date: '2023-11-15 10:15', doctor: 'Dr. Nodira Xalilova' }
  ]);

  // Qon bosimini baholash
  const evaluateBloodPressure = (systolic, diastolic) => {
    if (systolic < 90 || diastolic < 60) return { category: 'Past', color: 'text-blue-600' };
    if (systolic < 120 && diastolic < 80) return { category: 'Normal', color: 'text-green-600' };
    if (systolic < 130 && diastolic < 80) return { category: 'Yuqori normal', color: 'text-yellow-600' };
    if (systolic < 140 || diastolic < 90) return { category: '1-bosqich gipertoniya', color: 'text-orange-600' };
    if (systolic < 180 || diastolic < 120) return { category: '2-bosqich gipertoniya', color: 'text-red-600' };
    return { category: 'Gipertonik krizis', color: 'text-purple-600' };
  };

  // Qon tahlillarini baholash
  const evaluateBloodTest = (test, value) => {
    const ranges = {
      wbc: { min: 4.5, max: 11.0 },
      rbc: { min: 4.5, max: 5.9 },
      hemoglobin: { min: 13.5, max: 17.5 },
      hematocrit: { min: 38.8, max: 50.0 },
      platelets: { min: 150, max: 450 },
      glucose: { min: 70, max: 100 },
      cholesterol: { min: 0, max: 200 },
      hdl: { min: 40, max: 60 },
      ldl: { min: 0, max: 100 },
      triglycerides: { min: 0, max: 150 }
    };

    if (value < ranges[test].min) return { status: 'Past', icon: <FiTrendingDown className="text-blue-500" /> };
    if (value > ranges[test].max) return { status: 'Yuqori', icon: <FiTrendingUp className="text-red-500" /> };
    return { status: 'Normal', icon: <FiCheckCircle className="text-green-500" /> };
  };

  // EKG parametrlarini baholash
  const evaluateEkgParam = (param, value) => {
    const ranges = {
      rate: { min: 60, max: 100 },
      prInterval: { min: 120, max: 200 },
      qrsDuration: { min: 80, max: 100 },
      qtInterval: { min: 350, max: 440 }
    };

    if (param in ranges) {
      if (value < ranges[param].min) return { status: 'Past', icon: <FiTrendingDown className="text-blue-500" /> };
      if (value > ranges[param].max) return { status: 'Yuqori', icon: <FiTrendingUp className="text-red-500" /> };
      return { status: 'Normal', icon: <FiCheckCircle className="text-green-500" /> };
    }
    return { status: '', icon: null };
  };

  // Yangi eslatma qo'shish
  const addNote = () => {
    if (newNote.trim() === '') return;

    const note = {
      id: notes.length + 1,
      text: newNote,
      date: new Date().toISOString(),
      doctor: 'Joriy foydalanuvchi'
    };

    setNotes([...notes, note]);
    setNewNote('');
  };

  // Hisobotni yuklab olish
  const downloadReport = () => {
    const reportContent = `
      Bemor: ${patient.name}
      Yosh: ${patient.age}
      Jins: ${patient.gender}

      EKG Tahlili:
      Sana: ${ekgData.date}
      Yurak urishi: ${ekgData.rate} bpm
      Ritm: ${ekgData.rhythm}
      PR intervali: ${ekgData.prInterval} ms
      QRS davomiyligi: ${ekgData.qrsDuration} ms
      QT intervali: ${ekgData.qtInterval} ms
      O'q: ${ekgData.axis} gradus
      Tahlil: ${ekgData.interpretation}
      Anomaliyalar: ${ekgData.abnormalities}

      Qon Tahlillari:
      Sana: ${bloodTests.date}
      Oq qon tanachalari (WBC): ${bloodTests.wbc} 10^3/µL
      Qizil qon tanachalari (RBC): ${bloodTests.rbc} 10^6/µL
      Gemoglobin: ${bloodTests.hemoglobin} g/dL
      Gematokrit: ${bloodTests.hematocrit} %
      Trombotsitlar: ${bloodTests.platelets} 10^3/µL
      Glyukoza: ${bloodTests.glucose} mg/dL
      Xolesterin: ${bloodTests.cholesterol} mg/dL
      HDL: ${bloodTests.hdl} mg/dL
      LDL: ${bloodTests.ldl} mg/dL
      Triglitseridlar: ${bloodTests.triglycerides} mg/dL

      Qon Bosimi:
      Sana: ${bloodPressure.date}
      Sistolik: ${bloodPressure.systolic} mmHg
      Diastolik: ${bloodPressure.diastolic} mmHg
      Puls: ${bloodPressure.pulse} bpm
      Holat: ${bloodPressure.position}
      Izohlar: ${bloodPressure.notes}

      Shifokor eslatmalari:
      ${notes.map(note => `- ${note.date}: ${note.text}`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bemor_${patient.name.replace(/ /g, '_')}_tahlil_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bemor sarlavhasi */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                <span>Yosh: {patient.age}</span>
                <span>Jins: {patient.gender}</span>
                <span>Oxirgi tashrif: {patient.lastVisit}</span>
                <span>Shifokor: {patient.doctor}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={downloadReport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiDownload className="mr-2" /> Yuklab olish
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                <FiPrinter className="mr-2" /> Chop etish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tab navigatsiya */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('ekg')}
              className={`${activeTab === 'ekg' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FiHeart className="inline mr-2" /> EKG Tahlili
            </button>
            <button
              onClick={() => setActiveTab('blood')}
              className={`${activeTab === 'blood' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FiDroplet className="inline mr-2" /> Qon Tahlillari
            </button>
            <button
              onClick={() => setActiveTab('pressure')}
              className={`${activeTab === 'pressure' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FiActivity className="inline mr-2" /> Qon Bosimi
            </button>
          </nav>
        </div>

        {/* EKG Tahlili */}
        {activeTab === 'ekg' && (
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <FiHeart className="inline mr-2 text-red-500" /> EKG Tahlili - {ekgData.date}
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  {isEditing ? <FiSave className="mr-1" /> : <FiEdit2 className="mr-1" />}
                  {isEditing ? 'Saqlash' : 'Tahrirlash'}
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* EKG tasviri */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <img
                      src={ekgData.imageUrl}
                      alt="EKG tasviri"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500">EKG tasviri</h4>
                    <div className="mt-1 flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">Kattalashtirish</button>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Yuklab olish</button>
                    </div>
                  </div>
                </div>

                {/* EKG parametrlari */}
                <div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="text-xs font-medium text-gray-500">Yurak urishi</h4>
                        <div className="mt-1 flex items-baseline">
                          <span className="text-2xl font-semibold">{ekgData.rate}</span>
                          <span className="ml-1 text-sm text-gray-500">bpm</span>
                          {evaluateEkgParam('rate', ekgData.rate).icon}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{evaluateEkgParam('rate', ekgData.rate).status}</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="text-xs font-medium text-gray-500">PR intervali</h4>
                        <div className="mt-1 flex items-baseline">
                          <span className="text-2xl font-semibold">{ekgData.prInterval}</span>
                          <span className="ml-1 text-sm text-gray-500">ms</span>
                          {evaluateEkgParam('prInterval', ekgData.prInterval).icon}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{evaluateEkgParam('prInterval', ekgData.prInterval).status}</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="text-xs font-medium text-gray-500">QRS davomiyligi</h4>
                        <div className="mt-1 flex items-baseline">
                          <span className="text-2xl font-semibold">{ekgData.qrsDuration}</span>
                          <span className="ml-1 text-sm text-gray-500">ms</span>
                          {evaluateEkgParam('qrsDuration', ekgData.qrsDuration).icon}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{evaluateEkgParam('qrsDuration', ekgData.qrsDuration).status}</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Ritm</h4>
                      <p className="mt-1 text-gray-900">{ekgData.rhythm}</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Tahlil</h4>
                      {isEditing ? (
                        <textarea
                          value={ekgData.interpretation}
                          onChange={(e) => setEkgData({ ...ekgData, interpretation: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          rows="3"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{ekgData.interpretation}</p>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Anomaliyalar</h4>
                      {isEditing ? (
                        <textarea
                          value={ekgData.abnormalities}
                          onChange={(e) => setEkgData({ ...ekgData, abnormalities: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          rows="2"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{ekgData.abnormalities}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Qon Tahlillari */}
        {activeTab === 'blood' && (
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <FiDroplet className="inline mr-2 text-red-500" /> Qon Tahlillari - {bloodTests.date}
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  {isEditing ? <FiSave className="mr-1" /> : <FiEdit2 className="mr-1" />}
                  {isEditing ? 'Saqlash' : 'Tahrirlash'}
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Umumiy qon tahlili */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Umumiy qon tahlili</h4>
                  <div className="space-y-4">
                    {Object.entries({
                      wbc: 'Oq qon tanachalari (WBC)',
                      rbc: 'Qizil qon tanachalari (RBC)',
                      hemoglobin: 'Gemoglobin',
                      hematocrit: 'Gematokrit',
                      platelets: 'Trombotsitlar'
                    }).map(([key, label]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-500">{label}</h5>
                            <div className="mt-1 flex items-baseline">
                              <span className="text-xl font-semibold">{bloodTests[key]}</span>
                              <span className="ml-1 text-sm text-gray-500">
                                {key === 'wbc' && '10^3/µL'}
                                {key === 'rbc' && '10^6/µL'}
                                {key === 'hemoglobin' && 'g/dL'}
                                {key === 'hematocrit' && '%'}
                                {key === 'platelets' && '10^3/µL'}
                              </span>
                            </div>
                          </div>
                          {evaluateBloodTest(key, bloodTests[key]).icon}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {evaluateBloodTest(key, bloodTests[key]).status}
                          {key === 'wbc' && ' (Normal: 4.5-11.0 10^3/µL)'}
                          {key === 'rbc' && ' (Normal: 4.5-5.9 10^6/µL)'}
                          {key === 'hemoglobin' && ' (Normal: 13.5-17.5 g/dL)'}
                          {key === 'hematocrit' && ' (Normal: 38.8-50.0%)'}
                          {key === 'platelets' && ' (Normal: 150-450 10^3/µL)'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qon biokimyosi */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Qon biokimyosi</h4>
                  <div className="space-y-4">
                    {Object.entries({
                      glucose: 'Glyukoza',
                      cholesterol: 'Xolesterin',
                      hdl: 'HDL',
                      ldl: 'LDL',
                      triglycerides: 'Triglitseridlar'
                    }).map(([key, label]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-500">{label}</h5>
                            <div className="mt-1 flex items-baseline">
                              <span className="text-xl font-semibold">{bloodTests[key]}</span>
                              <span className="ml-1 text-sm text-gray-500">
                                {['glucose', 'cholesterol', 'hdl', 'ldl', 'triglycerides'].includes(key) && 'mg/dL'}
                              </span>
                            </div>
                          </div>
                          {evaluateBloodTest(key, bloodTests[key]).icon}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {evaluateBloodTest(key, bloodTests[key]).status}
                          {key === 'glucose' && ' (Normal: 70-100 mg/dL)'}
                          {key === 'cholesterol' && ' (Normal: <200 mg/dL)'}
                          {key === 'hdl' && ' (Normal: 40-60 mg/dL)'}
                          {key === 'ldl' && ' (Normal: <100 mg/dL)'}
                          {key === 'triglycerides' && ' (Normal: <150 mg/dL)'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">Shifokor izohlari</h4>
                    {isEditing ? (
                      <textarea
                        value={bloodTests.notes || ''}
                        onChange={(e) => setBloodTests({ ...bloodTests, notes: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows="3"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{bloodTests.notes || 'Izohlar mavjud emas'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Qon Bosimi */}
        {activeTab === 'pressure' && (
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  <FiActivity className="inline mr-2 text-red-500" /> Qon Bosimi - {bloodPressure.date}
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  {isEditing ? <FiSave className="mr-1" /> : <FiEdit2 className="mr-1" />}
                  {isEditing ? 'Saqlash' : 'Tahrirlash'}
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Qon bosimi ko'rsatkichlari */}
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-gray-500">Sistolik bosim</h4>
                      <div className="mt-2 flex justify-center items-baseline">
                        <span className="text-4xl font-bold">
                          {bloodPressure.systolic}
                        </span>
                        <span className="ml-1 text-lg text-gray-500">mmHg</span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${evaluateBloodPressure(bloodPressure.systolic, bloodPressure.diastolic).color}`}>
                          {evaluateBloodPressure(bloodPressure.systolic, bloodPressure.diastolic).category}
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-gray-500">Diastolik bosim</h4>
                      <div className="mt-2 flex justify-center items-baseline">
                        <span className="text-4xl font-bold">
                          {bloodPressure.diastolic}
                        </span>
                        <span className="ml-1 text-lg text-gray-500">mmHg</span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-gray-500">Puls</h4>
                      <div className="mt-2 flex justify-center items-baseline">
                        <span className="text-4xl font-bold">
                          {bloodPressure.pulse}
                        </span>
                        <span className="ml-1 text-lg text-gray-500">bpm</span>
                      </div>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bloodPressure.pulse < 60 ? 'text-blue-600' : bloodPressure.pulse > 100 ? 'text-red-600' : 'text-green-600'}`}>
                          {bloodPressure.pulse < 60 ? 'Bradikardiya' : bloodPressure.pulse > 100 ? 'Taxikardiya' : 'Normal'}
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">O'lcham holati</h4>
                      <p className="mt-1 text-gray-900">{bloodPressure.position}</p>
                    </div>
                  </div>

                  <div className="mt-6 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">Izohlar</h4>
                    {isEditing ? (
                      <textarea
                        value={bloodPressure.notes}
                        onChange={(e) => setBloodPressure({ ...bloodPressure, notes: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows="3"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{bloodPressure.notes}</p>
                    )}
                  </div>
                </div>

                {/* Qon bosimi diagrammasi */}
                <div>
                  <div className="border border-gray-200 rounded-lg p-4 h-full">
                    <h4 className="text-sm font-medium text-gray-500">Qon bosimi diagrammasi</h4>
                    <div className="mt-4 h-64 bg-gray-50 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-gray-400">Diagramma joylashuvi</div>
                        <div className="mt-2 text-sm text-gray-500">Bu yerda qon bosimi tarixi diagrammasi ko'rsatiladi</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Past</span>
                        <span>Normal</span>
                        <span>Yuqori</span>
                      </div>
                      <div className="mt-1 relative h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full">
                        <div
                          className="absolute top-0 h-2 bg-gray-200 rounded-full"
                          style={{
                            left: `${Math.min(Math.max(bloodPressure.systolic / 2, 5), 95)}%`,
                            width: '4px',
                            marginLeft: '-2px'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shifokor eslatmalari */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Shifokor eslatmalari</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {notes.map(note => (
                <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="text-sm text-gray-500">{note.date} - {note.doctor}</div>
                  <p className="mt-1 text-gray-800">{note.text}</p>
                </div>
              ))}

              <div className="mt-4">
                <label htmlFor="new-note" className="block text-sm font-medium text-gray-700">Yangi eslatma qo'shish</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="new-note"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    placeholder="Eslatma matnini kiriting"
                  />
                  <button
                    onClick={addNote}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAnalysisDashboard;