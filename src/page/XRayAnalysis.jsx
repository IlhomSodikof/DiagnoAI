import React, { useState, useRef } from 'react';
import { FiUpload, FiZoomIn, FiZoomOut, FiRotateCw, FiDownload, FiEdit2, FiSave, FiX } from 'react-icons/fi';
const defaultHealthyImage = "https://www.researchgate.net/publication/342210370/figure/fig2/AS:11431281386177858@1745063324315/Chest-Xray-of-a-a-healthy-person-and-b-a-person-suffering-from-pneumonia.tif";
const defaultSickImage = "https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg";

const XRayAnalyzer = () => {
  // Mock rentgen tasvirlari
  const mockXrays = [
    { id: 1, name: "Bemor: Ali Valiyev - Ko'krak qafasi", date: "2023-05-15", imageUrl: "https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg", findings: "Norma", diagnosis: "Hech qanday patologiya aniqlanmadi" },
    { id: 2, name: "Bemor: Sevinch Qodirova - Qo'l suyagi", date: "2023-06-20", imageUrl: "https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg", findings: "Suyak sinishi", diagnosis: "Radius suyagi sinishi" },
    { id: 3, name: "Bemor: Jamshid Bekmurodov - Oyoq suyagi", date: "2023-07-10", imageUrl: "https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg", findings: "Artroz belgilari", diagnosis: "Tizzada artroz boshlang'ich bosqichi" },
  ];

  const [xrays, setXrays] = useState(mockXrays);
  const [selectedXray, setSelectedXray] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFindings, setEditedFindings] = useState("");
  const [editedDiagnosis, setEditedDiagnosis] = useState("");
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [annotations, setAnnotations] = useState([]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState("select"); // 'select', 'arrow', 'circle', 'text'

  // Tasvirni tanlash
  const handleSelectXray = (xray) => {
    setSelectedXray(xray);
    setEditedFindings(xray.findings);
    setEditedDiagnosis(xray.diagnosis);
    setScale(1);
    setRotation(0);
    setAnnotations([]);
  };

  // Zoom funksiyalari
  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const rotate = () => setRotation(prev => (prev + 90) % 360);

  // Tahrirlash funksiyalari
  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);
  const saveEdits = () => {
    const updatedXrays = xrays.map(x =>
      x.id === selectedXray.id
        ? { ...x, findings: editedFindings, diagnosis: editedDiagnosis }
        : x
    );
    setXrays(updatedXrays);
    setSelectedXray({ ...selectedXray, findings: editedFindings, diagnosis: editedDiagnosis });
    setIsEditing(false);
  };

  // Annotatsiyalar bilan ishlash
  const handleCanvasMouseDown = (e) => {
    if (currentTool === 'select' || !selectedXray) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);

    if (currentTool === 'arrow') {
      setAnnotations([...annotations, {
        type: 'arrow',
        points: [{ x, y }],
        color: '#FF0000',
        strokeWidth: 2
      }]);
    } else if (currentTool === 'circle') {
      setAnnotations([...annotations, {
        type: 'circle',
        center: { x, y },
        radius: 0,
        color: '#00FF00',
        strokeWidth: 2
      }]);
    } else if (currentTool === 'text') {
      const text = prompt("Annotatsiya matnini kiriting:", "");
      if (text) {
        setAnnotations([...annotations, {
          type: 'text',
          x,
          y,
          text,
          color: '#0000FF',
          fontSize: 16
        }]);
      }
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing || !selectedXray) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lastIndex = annotations.length - 1;
    const lastAnnotation = annotations[lastIndex];

    if (currentTool === 'arrow' && lastAnnotation?.type === 'arrow') {
      const updatedArrow = {
        ...lastAnnotation,
        points: [...lastAnnotation.points, { x, y }]
      };
      const updatedAnnotations = [...annotations];
      updatedAnnotations[lastIndex] = updatedArrow;
      setAnnotations(updatedAnnotations);
    } else if (currentTool === 'circle' && lastAnnotation?.type === 'circle') {
      const dx = x - lastAnnotation.center.x;
      const dy = y - lastAnnotation.center.y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      const updatedCircle = {
        ...lastAnnotation,
        radius
      };
      const updatedAnnotations = [...annotations];
      updatedAnnotations[lastIndex] = updatedCircle;
      setAnnotations(updatedAnnotations);
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  // Yuklab olish funksiyasi
  const downloadImage = () => {
    if (!selectedXray) return;

    const link = document.createElement('a');
    link.href = selectedXray.imageUrl;
    link.download = `rentgen_${selectedXray.name.replace(/ /g, '_')}.jpg`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Tasvirlar ro'yxati */}
      <div className="w-1/4 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Rentgen Tasvirlari</h2>
        <div className="space-y-3">
          {xrays.map(xray => (
            <div
              key={xray.id}
              className={`p-3 border rounded-lg cursor-pointer hover:bg-blue-50 ${selectedXray?.id === xray.id ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
              onClick={() => handleSelectXray(xray)}
            >
              <h3 className="font-medium text-gray-800">{xray.name}</h3>
              <p className="text-sm text-gray-500">{xray.date}</p>
              <p className={`text-sm mt-1 ${xray.diagnosis.includes('Norma') ? 'text-green-600' : 'text-red-600'}`}>
                {xray.diagnosis}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Asosiy ish maydoni */}
      <div className="flex-1 p-6 flex flex-col">
        {selectedXray ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedXray.name}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={downloadImage}
                  className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Yuklab olish"
                >
                  <FiDownload className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col">
              {/* Tasvir boshqaruv paneli */}
              <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={zoomIn}
                    className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Kattalashtirish"
                  >
                    <FiZoomIn className="text-gray-600" />
                  </button>
                  <button
                    onClick={zoomOut}
                    className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Kichiklashtirish"
                  >
                    <FiZoomOut className="text-gray-600" />
                  </button>
                  <button
                    onClick={rotate}
                    className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Aylantirish"
                  >
                    <FiRotateCw className="text-gray-600" />
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentTool('select')}
                    className={`p-2 border rounded-lg ${currentTool === 'select' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
                    title="Tanlash"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentTool('arrow')}
                    className={`p-2 border rounded-lg ${currentTool === 'arrow' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
                    title="Streлка"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentTool('circle')}
                    className={`p-2 border rounded-lg ${currentTool === 'circle' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
                    title="Doira"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentTool('text')}
                    className={`p-2 border rounded-lg ${currentTool === 'text' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
                    title="Matn"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowAnnotations(!showAnnotations)}
                    className={`p-2 border rounded-lg ${showAnnotations ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
                    title="Annotatsiyalarni ko'rsatish/yashirish"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tasvir va annotatsiyalar */}
              <div className="flex-1 overflow-auto p-4 flex justify-center items-center relative">
                <div
                  className="relative"
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <img
                    src={selectedXray.imageUrl}
                    alt={selectedXray.name}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                  {showAnnotations && (
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ pointerEvents: currentTool === 'select' ? 'none' : 'auto' }}
                      onMouseDown={handleCanvasMouseDown}
                      onMouseMove={handleCanvasMouseMove}
                      onMouseUp={handleCanvasMouseUp}
                      onMouseLeave={handleCanvasMouseUp}
                    />
                  )}
                </div>
              </div>

              {/* Tahlil va tashxis qismi */}
              <div className="bg-gray-50 p-4 border-t">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-800">Tahlil va Tashxis</h3>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEdits}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
                      >
                        <FiSave className="mr-1" /> Saqlash
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center"
                      >
                        <FiX className="mr-1" /> Bekor qilish
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={startEditing}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                    >
                      <FiEdit2 className="mr-1" /> Tahrirlash
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Topilmalar</label>
                      <textarea
                        value={editedFindings}
                        onChange={(e) => setEditedFindings(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tashxis</label>
                      <textarea
                        value={editedDiagnosis}
                        onChange={(e) => setEditedDiagnosis(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 h-24"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Topilmalar:</h4>
                      <p className="text-gray-800 mt-1 whitespace-pre-wrap">{selectedXray.findings}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Tashxis:</h4>
                      <p className={`mt-1 whitespace-pre-wrap ${selectedXray.diagnosis.includes('Norma') ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedXray.diagnosis}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-300 p-6">
            <FiUpload className="text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Rentgen tasvirini tanlang</h3>
            <p className="text-gray-500 text-center max-w-md">
              Chap tomondagi ro'yxatdan tahlil qilish uchun rentgen tasvirini tanlang yoki yangi tasvir yuklang.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default XRayAnalyzer;