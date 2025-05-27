// import React, { useState, useRef } from 'react';
// import { FiUpload, FiZoomIn, FiZoomOut, FiRotateCw, FiDownload, FiEdit2, FiSave, FiX } from 'react-icons/fi';
// import BredCumb from '../components/BredCumb';
// import { div } from 'three/src/nodes/TSL.js';
// const defaultHealthyImage = "https://www.researchgate.net/publication/342210370/figure/fig2/AS:11431281386177858@1745063324315/Chest-Xray-of-a-a-healthy-person-and-b-a-person-suffering-from-pneumonia.tif";
// const defaultSickImage = "https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg";

// const XRayAnalyzer = () => {
//   // Mock rentgen tasvirlari
//   const mockXrays = [
//     { id: 1, name: "Bemor: Aliyev Sherzod - Ko'krak qafasi", date: "2023-05-15", imageUrl: "data:image/jpeg;base64,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", findings: "Norma", diagnosis: "Hech qanday patologiya aniqlanmadi" },
//     { id: 2, name: "Bemor: Aliyev Sherzod  - Metacarpal sinish ", date: "2023-06-20", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcU7rxgsOLDqDaebwZ2koHGWcExwr4bBteyHn6WJblfudzgS89io2TyRUhiZYFzKQ364&usqp=CAU", findings: "Suyak sinishi", diagnosis: "Radius suyagi sinishi" },
//     { id: 3, name: "Bemor: Aliyev Sherzod - Tizza bo'g'imi sili", date: "2023-07-10", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFCFk7fQWPTw5dRMeI8kJ0ieZnB2etJEybQx4gHBSRcE3VvdUEKVKmB6qIRRelOUwxLU&usqp=CAU", findings: "Artroz belgilari", diagnosis: "Tizzada artroz boshlang'ich bosqichi" },
//   ];

//   const [xrays, setXrays] = useState(mockXrays);
//   const [selectedXray, setSelectedXray] = useState(null);
//   const [scale, setScale] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedFindings, setEditedFindings] = useState("");
//   const [editedDiagnosis, setEditedDiagnosis] = useState("");
//   const [showAnnotations, setShowAnnotations] = useState(true);
//   const [annotations, setAnnotations] = useState([]);
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [currentTool, setCurrentTool] = useState("select"); // 'select', 'arrow', 'circle', 'text'

//   // Tasvirni tanlash
//   const handleSelectXray = (xray) => {
//     setSelectedXray(xray);
//     setEditedFindings(xray.findings);
//     setEditedDiagnosis(xray.diagnosis);
//     setScale(1);
//     setRotation(0);
//     setAnnotations([]);
//   };

//   // Zoom funksiyalari
//   const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
//   const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
//   const rotate = () => setRotation(prev => (prev + 90) % 360);

//   // Tahrirlash funksiyalari
//   const startEditing = () => setIsEditing(true);
//   const cancelEditing = () => setIsEditing(false);
//   const saveEdits = () => {
//     const updatedXrays = xrays.map(x =>
//       x.id === selectedXray.id
//         ? { ...x, findings: editedFindings, diagnosis: editedDiagnosis }
//         : x
//     );
//     setXrays(updatedXrays);
//     setSelectedXray({ ...selectedXray, findings: editedFindings, diagnosis: editedDiagnosis });
//     setIsEditing(false);
//   };

//   // Annotatsiyalar bilan ishlash
//   const handleCanvasMouseDown = (e) => {
//     if (currentTool === 'select' || !selectedXray) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setIsDrawing(true);

//     if (currentTool === 'arrow') {
//       setAnnotations([...annotations, {
//         type: 'arrow',
//         points: [{ x, y }],
//         color: '#FF0000',
//         strokeWidth: 2
//       }]);
//     } else if (currentTool === 'circle') {
//       setAnnotations([...annotations, {
//         type: 'circle',
//         center: { x, y },
//         radius: 0,
//         color: '#00FF00',
//         strokeWidth: 2
//       }]);
//     } else if (currentTool === 'text') {
//       const text = prompt("Annotatsiya matnini kiriting:", "");
//       if (text) {
//         setAnnotations([...annotations, {
//           type: 'text',
//           x,
//           y,
//           text,
//           color: '#0000FF',
//           fontSize: 16
//         }]);
//       }
//     }
//   };

//   const handleCanvasMouseMove = (e) => {
//     if (!isDrawing || !selectedXray) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const lastIndex = annotations.length - 1;
//     const lastAnnotation = annotations[lastIndex];

//     if (currentTool === 'arrow' && lastAnnotation?.type === 'arrow') {
//       const updatedArrow = {
//         ...lastAnnotation,
//         points: [...lastAnnotation.points, { x, y }]
//       };
//       const updatedAnnotations = [...annotations];
//       updatedAnnotations[lastIndex] = updatedArrow;
//       setAnnotations(updatedAnnotations);
//     } else if (currentTool === 'circle' && lastAnnotation?.type === 'circle') {
//       const dx = x - lastAnnotation.center.x;
//       const dy = y - lastAnnotation.center.y;
//       const radius = Math.sqrt(dx * dx + dy * dy);

//       const updatedCircle = {
//         ...lastAnnotation,
//         radius
//       };
//       const updatedAnnotations = [...annotations];
//       updatedAnnotations[lastIndex] = updatedCircle;
//       setAnnotations(updatedAnnotations);
//     }
//   };

//   const handleCanvasMouseUp = () => {
//     setIsDrawing(false);
//   };

//   // Yuklab olish funksiyasi
//   const downloadImage = () => {
//     if (!selectedXray) return;

//     const link = document.createElement('a');
//     link.href = selectedXray.imageUrl;
//     link.download = `rentgen_${selectedXray.name.replace(/ /g, '_')}.jpg`;
//     link.click();
//   };

//   return (
//     <div >
//       <div className='my-8'>
//         <BredCumb page='Rentgen Tasvirlari' />
//       </div>
//       <div className="flex h-screen bg-gray-100">
//         {/* Tasvirlar ro'yxati */}
//         <div className="w-1/4 bg-white p-4 overflow-y-auto">
//           <h2 className="text-xl font-bold mb-4 text-gray-800">Rentgen Tasvirlari</h2>
//           <div className="space-y-3">
//             {xrays.map(xray => (
//               <div
//                 key={xray.id}
//                 className={`p-3 border rounded-lg cursor-pointer hover:bg-blue-50 ${selectedXray?.id === xray.id ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
//                 onClick={() => handleSelectXray(xray)}
//               >
//                 <h3 className="font-medium text-gray-800">{xray.name}</h3>
//                 <p className="text-sm text-gray-500">{xray.date}</p>
//                 <p className={`text-sm mt-1 ${xray.diagnosis.includes('Norma') ? 'text-green-600' : 'text-red-600'}`}>
//                   {xray.diagnosis}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Asosiy ish maydoni */}
//         <div className="flex-1 p-6 flex flex-col">
//           {selectedXray ? (
//             <>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-gray-800">{selectedXray.name}</h2>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={downloadImage}
//                     className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
//                     title="Yuklab olish"
//                   >
//                     <FiDownload className="text-gray-600" />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex-1 bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col">
//                 {/* Tasvir boshqaruv paneli */}
//                 <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={zoomIn}
//                       className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
//                       title="Kattalashtirish"
//                     >
//                       <FiZoomIn className="text-gray-600" />
//                     </button>
//                     <button
//                       onClick={zoomOut}
//                       className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
//                       title="Kichiklashtirish"
//                     >
//                       <FiZoomOut className="text-gray-600" />
//                     </button>
//                     <button
//                       onClick={rotate}
//                       className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
//                       title="Aylantirish"
//                     >
//                       <FiRotateCw className="text-gray-600" />
//                     </button>
//                   </div>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setCurrentTool('select')}
//                       className={`p-2 border rounded-lg ${currentTool === 'select' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
//                       title="Tanlash"
//                     >
//                       <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => setCurrentTool('arrow')}
//                       className={`p-2 border rounded-lg ${currentTool === 'arrow' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
//                       title="Streлка"
//                     >
//                       <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => setCurrentTool('circle')}
//                       className={`p-2 border rounded-lg ${currentTool === 'circle' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
//                       title="Doira"
//                     >
//                       <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => setCurrentTool('text')}
//                       className={`p-2 border rounded-lg ${currentTool === 'text' ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
//                       title="Matn"
//                     >
//                       <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => setShowAnnotations(!showAnnotations)}
//                       className={`p-2 border rounded-lg ${showAnnotations ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-300'}`}
//                       title="Annotatsiyalarni ko'rsatish/yashirish"
//                     >
//                       <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Tasvir va annotatsiyalar */}
//                 <div className="flex-1 overflow-auto p-4 flex justify-center items-center relative">
//                   <div
//                     className="relative"
//                     style={{
//                       transform: `scale(${scale}) rotate(${rotation}deg)`,
//                       transition: 'transform 0.3s ease'
//                     }}
//                   >
//                     <img
//                       src={selectedXray.imageUrl}
//                       alt={selectedXray.name}
//                       className="max-w-full max-h-[70vh] object-contain"
//                     />
//                     {showAnnotations && (
//                       <canvas
//                         ref={canvasRef}
//                         className="absolute top-0 left-0 w-full h-full"
//                         style={{ pointerEvents: currentTool === 'select' ? 'none' : 'auto' }}
//                         onMouseDown={handleCanvasMouseDown}
//                         onMouseMove={handleCanvasMouseMove}
//                         onMouseUp={handleCanvasMouseUp}
//                         onMouseLeave={handleCanvasMouseUp}
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* Tahlil va tashxis qismi */}
//                 <div className="bg-gray-50 p-4 border-t">
//                   <div className="flex justify-between items-center mb-3">
//                     <h3 className="font-bold text-gray-800">Tahlil va Tashxis</h3>
//                     {isEditing ? (
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={saveEdits}
//                           className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
//                         >
//                           <FiSave className="mr-1" /> Saqlash
//                         </button>
//                         <button
//                           onClick={cancelEditing}
//                           className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center"
//                         >
//                           <FiX className="mr-1" /> Bekor qilish
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         onClick={startEditing}
//                         className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
//                       >
//                         <FiEdit2 className="mr-1" /> Tahrirlash
//                       </button>
//                     )}
//                   </div>

//                   {isEditing ? (
//                     <div className="space-y-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Topilmalar</label>
//                         <textarea
//                           value={editedFindings}
//                           onChange={(e) => setEditedFindings(e.target.value)}
//                           className="w-full border border-gray-300 rounded-lg p-2 h-24"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Tashxis</label>
//                         <textarea
//                           value={editedDiagnosis}
//                           onChange={(e) => setEditedDiagnosis(e.target.value)}
//                           className="w-full border border-gray-300 rounded-lg p-2 h-24"
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       <div>
//                         <h4 className="text-sm font-medium text-gray-700">Topilmalar:</h4>
//                         <p className="text-gray-800 mt-1 whitespace-pre-wrap">{selectedXray.findings}</p>
//                       </div>
//                       <div>
//                         <h4 className="text-sm font-medium text-gray-700">Tashxis:</h4>
//                         <p className={`mt-1 whitespace-pre-wrap ${selectedXray.diagnosis.includes('Norma') ? 'text-green-600' : 'text-red-600'}`}>
//                           {selectedXray.diagnosis}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-300 p-6">
//               <FiUpload className="text-5xl text-gray-400 mb-4" />
//               <h3 className="text-xl font-medium text-gray-600 mb-2">Rentgen tasvirini tanlang</h3>
//               <p className="text-gray-500 text-center max-w-md">
//                 Chap tomondagi ro'yxatdan tahlil qilish uchun rentgen tasvirini tanlang yoki yangi tasvir yuklang.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>

//   );
// };

// export default XRayAnalyzer;


import React, { useState, useRef, useEffect } from 'react';
import { FiUpload, FiZoomIn, FiZoomOut, FiRotateCw, FiDownload, FiPlus } from 'react-icons/fi';
import BredCumb from '../components/BredCumb';

const defaultHealthyImage = "https://www.researchgate.net/publication/342210370/figure/fig2/AS:11431281386177858@1745063324315/Chest-X-ray-of-a-a-healthy-person-and-b-a-person-suffering-from-pneumonia.tif";
const defaultSickImage = "https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg";

const XRayAnalyzer = () => {
  // Mock rentgen tasvirlari
  const [xrays, setXrays] = useState([
    { id: 1, name: "Bemor: Aliyev Sherzod - Ko'krak qafasi", date: "2023-05-15", imageUrl: defaultHealthyImage, findings: "Norma", diagnosis: "Hech qanday patologiya aniqlanmadi" },
    { id: 2, name: "Bemor: Aliyev Sherzod - Metacarpal sinish", date: "2023-06-20", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcU7rxgsOLDqDaebwZ2koHGWcExwr4bBteyHn6WJblfudzgS89io2TyRUhiZYFzKQ364&usqp=CAU", findings: "Suyak sinishi", diagnosis: "Radius suyagi sinishi" },
    { id: 3, name: "Bemor: Aliyev Sherzod - Tizza bo'g'imi sili", date: "2023-07-10", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFCFk7fQWPTw5dRMeI8kJ0ieZnB2etJEybQx4gHBSRcE3VvdUEKVKmB6qIRRelOUwxLU&usqp=CAU", findings: "Artroz belgilari", diagnosis: "Tizzada artroz boshlang'ich bosqichi" },
  ]);

  const [selectedXray, setSelectedXray] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [annotations, setAnnotations] = useState([]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState("select"); // 'select', 'arrow', 'circle', 'text'
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Tasvirni tanlash
  const handleSelectXray = (xray) => {
    setSelectedXray(xray);
    setScale(1);
    setRotation(0);
    setAnnotations([]);
  };

  // Zoom funksiyalari
  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const rotate = () => setRotation(prev => (prev + 90) % 360);

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

  // Rasm yuklash funksiyasi
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Mock API call - real loyihada bu yerda serverga yuborish kerak
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newId = Math.max(...xrays.map(x => x.id)) + 1;
        const newXray = {
          id: newId,
          name: `Bemor: Yangi bemor - ${file.name}`,
          date: new Date().toISOString().split('T')[0],
          imageUrl: event.target.result,
          findings: "Yangi tasvir tahlili",
          diagnosis: generateDiagnosis(file.name)
        };

        setXrays([...xrays, newXray]);
        setSelectedXray(newXray);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  // Avtomatik tashxis generatsiyasi (mock function)
  const generateDiagnosis = (filename) => {
    const lowerName = filename.toLowerCase();

    if (lowerName.includes('chest') || lowerName.includes('ko\'krak')) {
      return "Ko'krak qafasi rentgeni: Norma";
    } else if (lowerName.includes('arm') || lowerName.includes('qo\'l')) {
      return "Qo'l suyaklari rentgeni: Sinish belgilari";
    } else if (lowerName.includes('leg') || lowerName.includes('oyoq')) {
      return "Oyoq suyaklari rentgeni: Artroz belgilari";
    } else if (lowerName.includes('head') || lowerName.includes('bosh')) {
      return "Bosh suyagi rentgeni: Norma";
    }

    return "Norma - Patologiya aniqlanmadi";
  };

  // Canvasni chizish
  useEffect(() => {
    if (!canvasRef.current || !selectedXray) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas o'lchamlarini tasvirga moslashtirish
    const img = new Image();
    img.src = selectedXray.imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      drawAnnotations();
    };

    const drawAnnotations = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      annotations.forEach(annotation => {
        ctx.strokeStyle = annotation.color;
        ctx.lineWidth = annotation.strokeWidth;
        ctx.fillStyle = annotation.color;

        if (annotation.type === 'arrow') {
          ctx.beginPath();
          annotation.points.forEach((point, i) => {
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();

          // Strekka boshi
          if (annotation.points.length > 1) {
            const lastPoint = annotation.points[annotation.points.length - 1];
            const prevPoint = annotation.points[annotation.points.length - 2];

            const angle = Math.atan2(lastPoint.y - prevPoint.y, lastPoint.x - prevPoint.x);
            const arrowSize = 10;

            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(
              lastPoint.x - arrowSize * Math.cos(angle - Math.PI / 6),
              lastPoint.y - arrowSize * Math.sin(angle - Math.PI / 6)
            );
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(
              lastPoint.x - arrowSize * Math.cos(angle + Math.PI / 6),
              lastPoint.y - arrowSize * Math.sin(angle + Math.PI / 6)
            );
            ctx.stroke();
          }
        } else if (annotation.type === 'circle') {
          ctx.beginPath();
          ctx.arc(annotation.center.x, annotation.center.y, annotation.radius, 0, Math.PI * 2);
          ctx.stroke();
        } else if (annotation.type === 'text') {
          ctx.font = `${annotation.fontSize}px Arial`;
          ctx.fillText(annotation.text, annotation.x, annotation.y);
        }
      });
    };

    drawAnnotations();
  }, [annotations, selectedXray]);

  return (
    <div>
      <div className='my-8'>
        <BredCumb page='Rentgen Tasvirlari' />
      </div>
      <div className="flex h-screen bg-gray-100">
        {/* Tasvirlar ro'yxati */}
        <div className="w-1/4 bg-white p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Rentgen Tasvirlari</h2>
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              title="Yangi tasvir yuklash"
            >
              <FiPlus className="mr-1" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {isUploading && (
            <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded-lg text-center">
              Tasvir yuklanmoqda...
            </div>
          )}

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
                  <h3 className="font-bold text-gray-800 mb-3">Tahlil va Tashxis</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Topilmalar:</h4>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-gray-800 whitespace-pre-wrap">{selectedXray.findings}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Tashxis:</h4>
                      <div className={`bg-white p-3 rounded-lg border ${selectedXray.diagnosis.includes('Norma') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                        <p className={`whitespace-pre-wrap ${selectedXray.diagnosis.includes('Norma') ? 'text-green-700' : 'text-red-700'}`}>
                          {selectedXray.diagnosis}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-300 p-6">
              <FiUpload className="text-5xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Rentgen tasvirini tanlang</h3>
              <p className="text-gray-500 text-center max-w-md mb-4">
                Chap tomondagi ro'yxatdan tahlil qilish uchun rentgen tasvirini tanlang yoki yangi tasvir yuklang.
              </p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              >
                <FiPlus className="mr-2" />
                Tasvir yuklash
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default XRayAnalyzer;