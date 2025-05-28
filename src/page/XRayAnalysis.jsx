// import React, { useState, useRef } from 'react';
// import { FiUpload, FiZoomIn, FiZoomOut, FiRotateCw, FiDownload, FiEdit2, FiSave, FiX } from 'react-icons/fi';
// import BredCumb from '../components/BredCumb';


// const XRayAnalyzer = () => {
//   // Mock rentgen tasvirlari
//   const mockXrays = [
//     { id: 1, name: "Bemor: Aliyev Sherzod - Ko'krak qafasi", date: "2023-05-15", imageUrl: "data:image/jpeg;base64.jpg", findings: "Norma", diagnosis: "Hech qanday patologiya aniqlanmadi" },
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
import { FiUpload, FiZoomIn, FiZoomOut, FiRotateCw, FiDownload, FiEdit2, FiSave, FiX, FiPlus } from 'react-icons/fi';
import BredCumb from '../components/BredCumb';

const XRayAnalyzer = () => {
  // Mock rentgen tasvirlari
  const mockXrays = [
    { id: 1, name: "Bemor: Aliyev Sherzod - Ko'krak qafasi", date: "2023-05-15", imageUrl: "data:image/jpeg;base64.jpg", findings: "Norma", diagnosis: "Hech qanday patologiya aniqlanmadi" },
    { id: 2, name: "Bemor: Aliyev Sherzod  - Metacarpal sinish ", date: "2023-06-20", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcU7rxgsOLDqDaebwZ2koHGWcExwr4bBteyHn6WJblfudzgS89io2TyRUhiZYFzKQ364&usqp=CAU", findings: "Suyak sinishi", diagnosis: "Radius suyagi sinishi" },
    { id: 3, name: "Bemor: Aliyev Sherzod - Tizza bo'g'imi sili", date: "2023-07-10", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFCFk7fQWPTw5dRMeI8kJ0ieZnB2etJEybQx4gHBSRcE3VvdUEKVKmB6qIRRelOUwxLU&usqp=CAU", findings: "Artroz belgilari", diagnosis: "Tizzada artroz boshlang'ich bosqichi" },
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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newImage, setNewImage] = useState({
    name: "",
    date: new Date().toISOString().split('T')[0],
    file: null,
    preview: ""
  });
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

  // Rasm yuklash funksiyalari
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage({
          ...newImage,
          file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!newImage.name || !newImage.file) return;

    const newXray = {
      id: xrays.length + 1,
      name: newImage.name,
      date: newImage.date,
      imageUrl: newImage.preview,
      findings: "Tahlil qilinmoqda...",
      diagnosis: "Tashxis kutilmoqda..."
    };

    setXrays([...xrays, newXray]);
    setSelectedXray(newXray);
    setShowUploadModal(false);
    setNewImage({
      name: "",
      date: new Date().toISOString().split('T')[0],
      file: null,
      preview: ""
    });
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

      // Annotatsiyalarni chizish
      if (showAnnotations) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        annotations.forEach(annotation => {
          if (annotation.type === 'arrow' && annotation.points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(annotation.points[0].x, annotation.points[0].y);
            for (let i = 1; i < annotation.points.length; i++) {
              ctx.lineTo(annotation.points[i].x, annotation.points[i].y);
            }
            ctx.strokeStyle = annotation.color;
            ctx.lineWidth = annotation.strokeWidth;
            ctx.stroke();
          } else if (annotation.type === 'circle') {
            ctx.beginPath();
            ctx.arc(annotation.center.x, annotation.center.y, annotation.radius, 0, Math.PI * 2);
            ctx.strokeStyle = annotation.color;
            ctx.lineWidth = annotation.strokeWidth;
            ctx.stroke();
          } else if (annotation.type === 'text') {
            ctx.font = `${annotation.fontSize}px Arial`;
            ctx.fillStyle = annotation.color;
            ctx.fillText(annotation.text, annotation.x, annotation.y);
          }
        });
      }
    };
  }, [annotations, selectedXray, showAnnotations]);

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
              onClick={() => setShowUploadModal(true)}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              title="Yangi tasvir qo'shish"
            >
              <FiPlus className="mr-1" />
            </button>
          </div>
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
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              >
                <FiPlus className="mr-2" /> Yangi tasvir yuklash
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rasm yuklash modali */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Yangi rentgen tasviri yuklash</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tasvir nomi</label>
                <input
                  type="text"
                  value={newImage.name}
                  onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Masalan: Bemor: Aliyev Sherzod - Ko'krak qafasi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sana</label>
                <input
                  type="date"
                  value={newImage.date}
                  onChange={(e) => setNewImage({ ...newImage, date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rasm fayli</label>
                <div className="flex items-center">
                  <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    <FiUpload className="inline mr-2" />
                    Fayl tanlash
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {newImage.file && (
                    <span className="ml-3 text-sm text-gray-600">{newImage.file.name}</span>
                  )}
                </div>
              </div>

              {newImage.preview && (
                <div className="mt-2">
                  <img src={newImage.preview} alt="Preview" className="max-h-40 mx-auto" />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleUpload}
                disabled={!newImage.name || !newImage.file}
                className={`px-4 py-2 rounded-lg ${!newImage.name || !newImage.file ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Yuklash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XRayAnalyzer;









// import React, { useState, useRef, useEffect } from 'react';
// import { FiUpload, FiZoomIn, FiZoomOut, FiRotateCw, FiDownload, FiPlus } from 'react-icons/fi';
// import BredCumb from '../components/BredCumb';

// const defaultHealthyImage = "https://www.researchgate.net/publication/342210370/figure/fig2/AS:11431281386177858@1745063324315/Chest-X-ray-of-a-a-healthy-person-and-b-a-person-suffering-from-pneumonia.tif";
// const defaultSickImage = "https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg";

// const XRayAnalyzer = () => {
//   // Mock rentgen tasvirlari
//   const [xrays, setXrays] = useState([
//     { id: 1, name: "Bemor: Aliyev Sherzod - Ko'krak qafasi", date: "2023-05-15", imageUrl: defaultHealthyImage, findings: "Norma", diagnosis: "Hech qanday patologiya aniqlanmadi" },
//     { id: 2, name: "Bemor: Aliyev Sherzod - Metacarpal sinish", date: "2023-06-20", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcU7rxgsOLDqDaebwZ2koHGWcExwr4bBteyHn6WJblfudzgS89io2TyRUhiZYFzKQ364&usqp=CAU", findings: "Suyak sinishi", diagnosis: "Radius suyagi sinishi" },
//     { id: 3, name: "Bemor: Aliyev Sherzod - Tizza bo'g'imi sili", date: "2023-07-10", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFCFk7fQWPTw5dRMeI8kJ0ieZnB2etJEybQx4gHBSRcE3VvdUEKVKmB6qIRRelOUwxLU&usqp=CAU", findings: "Artroz belgilari", diagnosis: "Tizzada artroz boshlang'ich bosqichi" },
//   ]);

//   const [selectedXray, setSelectedXray] = useState(null);
//   const [scale, setScale] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [showAnnotations, setShowAnnotations] = useState(true);
//   const [annotations, setAnnotations] = useState([]);
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [currentTool, setCurrentTool] = useState("select"); // 'select', 'arrow', 'circle', 'text'
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   // Tasvirni tanlash
//   const handleSelectXray = (xray) => {
//     setSelectedXray(xray);
//     setScale(1);
//     setRotation(0);
//     setAnnotations([]);
//   };

//   // Zoom funksiyalari
//   const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
//   const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
//   const rotate = () => setRotation(prev => (prev + 90) % 360);

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

//   // Rasm yuklash funksiyasi
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setIsUploading(true);

//     // Mock API call - real loyihada bu yerda serverga yuborish kerak
//     setTimeout(() => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const newId = Math.max(...xrays.map(x => x.id)) + 1;
//         const newXray = {
//           id: newId,
//           name: `Bemor: Yangi bemor - ${file.name}`,
//           date: new Date().toISOString().split('T')[0],
//           imageUrl: event.target.result,
//           findings: "Yangi tasvir tahlili",
//           diagnosis: generateDiagnosis(file.name)
//         };

//         setXrays([...xrays, newXray]);
//         setSelectedXray(newXray);
//         setIsUploading(false);
//       };
//       reader.readAsDataURL(file);
//     }, 1000);
//   };

//   // Avtomatik tashxis generatsiyasi (mock function)
//   const generateDiagnosis = (filename) => {
//     const lowerName = filename.toLowerCase();

//     if (lowerName.includes('chest') || lowerName.includes('ko\'krak')) {
//       return "Ko'krak qafasi rentgeni: Norma";
//     } else if (lowerName.includes('arm') || lowerName.includes('qo\'l')) {
//       return "Qo'l suyaklari rentgeni: Sinish belgilari";
//     } else if (lowerName.includes('leg') || lowerName.includes('oyoq')) {
//       return "Oyoq suyaklari rentgeni: Artroz belgilari";
//     } else if (lowerName.includes('head') || lowerName.includes('bosh')) {
//       return "Bosh suyagi rentgeni: Norma";
//     }

//     return "Norma - Patologiya aniqlanmadi";
//   };

//   // Canvasni chizish
//   useEffect(() => {
//     if (!canvasRef.current || !selectedXray) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // Canvas o'lchamlarini tasvirga moslashtirish
//     const img = new Image();
//     img.src = selectedXray.imageUrl;
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       drawAnnotations();
//     };

//     const drawAnnotations = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       annotations.forEach(annotation => {
//         ctx.strokeStyle = annotation.color;
//         ctx.lineWidth = annotation.strokeWidth;
//         ctx.fillStyle = annotation.color;

//         if (annotation.type === 'arrow') {
//           ctx.beginPath();
//           annotation.points.forEach((point, i) => {
//             if (i === 0) {
//               ctx.moveTo(point.x, point.y);
//             } else {
//               ctx.lineTo(point.x, point.y);
//             }
//           });
//           ctx.stroke();

//           // Strekka boshi
//           if (annotation.points.length > 1) {
//             const lastPoint = annotation.points[annotation.points.length - 1];
//             const prevPoint = annotation.points[annotation.points.length - 2];

//             const angle = Math.atan2(lastPoint.y - prevPoint.y, lastPoint.x - prevPoint.x);
//             const arrowSize = 10;

//             ctx.beginPath();
//             ctx.moveTo(lastPoint.x, lastPoint.y);
//             ctx.lineTo(
//               lastPoint.x - arrowSize * Math.cos(angle - Math.PI / 6),
//               lastPoint.y - arrowSize * Math.sin(angle - Math.PI / 6)
//             );
//             ctx.moveTo(lastPoint.x, lastPoint.y);
//             ctx.lineTo(
//               lastPoint.x - arrowSize * Math.cos(angle + Math.PI / 6),
//               lastPoint.y - arrowSize * Math.sin(angle + Math.PI / 6)
//             );
//             ctx.stroke();
//           }
//         } else if (annotation.type === 'circle') {
//           ctx.beginPath();
//           ctx.arc(annotation.center.x, annotation.center.y, annotation.radius, 0, Math.PI * 2);
//           ctx.stroke();
//         } else if (annotation.type === 'text') {
//           ctx.font = `${annotation.fontSize}px Arial`;
//           ctx.fillText(annotation.text, annotation.x, annotation.y);
//         }
//       });
//     };

//     drawAnnotations();
//   }, [annotations, selectedXray]);

//   return (
//     <div>
//       <div className='my-8'>
//         <BredCumb page='Rentgen Tasvirlari' />
//       </div>
//       <div className="flex h-screen bg-gray-100">
//         {/* Tasvirlar ro'yxati */}
//         <div className="w-1/4 bg-white p-4 overflow-y-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Rentgen Tasvirlari</h2>
//             <button
//               onClick={() => fileInputRef.current.click()}
//               className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
//               title="Yangi tasvir yuklash"
//             >
//               <FiPlus className="mr-1" />
//             </button>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleImageUpload}
//               accept="image/*"
//               className="hidden"
//             />
//           </div>

//           {isUploading && (
//             <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded-lg text-center">
//               Tasvir yuklanmoqda...
//             </div>
//           )}

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
//                   <h3 className="font-bold text-gray-800 mb-3">Tahlil va Tashxis</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Topilmalar:</h4>
//                       <div className="bg-white p-3 rounded-lg border border-gray-200">
//                         <p className="text-gray-800 whitespace-pre-wrap">{selectedXray.findings}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Tashxis:</h4>
//                       <div className={`bg-white p-3 rounded-lg border ${selectedXray.diagnosis.includes('Norma') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
//                         <p className={`whitespace-pre-wrap ${selectedXray.diagnosis.includes('Norma') ? 'text-green-700' : 'text-red-700'}`}>
//                           {selectedXray.diagnosis}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-300 p-6">
//               <FiUpload className="text-5xl text-gray-400 mb-4" />
//               <h3 className="text-xl font-medium text-gray-600 mb-2">Rentgen tasvirini tanlang</h3>
//               <p className="text-gray-500 text-center max-w-md mb-4">
//                 Chap tomondagi ro'yxatdan tahlil qilish uchun rentgen tasvirini tanlang yoki yangi tasvir yuklang.
//               </p>
//               <button
//                 onClick={() => fileInputRef.current.click()}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
//               >
//                 <FiPlus className="mr-2" />
//                 Tasvir yuklash
//               </button>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 accept="image/*"
//                 className="hidden"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default XRayAnalyzer;