// import React, { useState, useRef, useEffect } from 'react';

// const Xray = () => {
//   // Mock data for X-ray images and diagnostic information
//   const mockData = {
//     before: {
//       imageUrl: 'https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg',
//       diagnosis: 'Fracture detected in the right tibia',
//       abnormalities: [
//         { x: 35, y: 60, radius: 8, description: 'Hairline fracture', severity: 'moderate', color: 'orange' },
//         { x: 40, y: 65, radius: 5, description: 'Bone displacement', severity: 'severe', color: 'red' }
//       ]
//     },
//     after: {
//       imageUrl: 'https://example.com/path-to-after-xray.jpg',
//       diagnosis: 'Fracture healing in progress',
//       abnormalities: [
//         { x: 35, y: 60, radius: 5, description: 'Healing fracture', severity: 'mild', color: 'yellow' },
//         { x: 40, y: 65, radius: 3, description: 'Reduced displacement', severity: 'moderate', color: 'orange' }
//       ]
//     },
//     patientInfo: {
//       name: 'John Doe',
//       age: 42,
//       gender: 'Male',
//       scanDateBefore: '2023-05-15',
//       scanDateAfter: '2023-08-20'
//     }
//   };

//   const [activeTab, setActiveTab] = useState('before');
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
//   const [showAbnormalities, setShowAbnormalities] = useState(true);
//   const [selectedAbnormality, setSelectedAbnormality] = useState(null);
//   const imageRef = useRef(null);
//   const containerRef = useRef(null);

//   const currentData = mockData[activeTab];

//   const handleZoom = (direction) => {
//     setZoomLevel(prev => {
//       const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
//       return Math.min(Math.max(newZoom, 0.5), 5);
//     });
//   };

//   const handleMouseDown = (e) => {
//     if (zoomLevel > 1) {
//       setIsDragging(true);
//       setStartDragPos({ x: e.clientX - position.x, y: e.clientY - position.y });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const newX = e.clientX - startDragPos.x;
//       const newY = e.clientY - startDragPos.y;

//       // Calculate container dimensions
//       const container = containerRef.current;
//       const img = imageRef.current;
//       if (container && img) {
//         const containerRect = container.getBoundingClientRect();
//         const imgRect = img.getBoundingClientRect();

//         const maxX = Math.max(0, (imgRect.width * zoomLevel - containerRect.width) / 2);
//         const maxY = Math.max(0, (imgRect.height * zoomLevel - containerRect.height) / 2);

//         setPosition({
//           x: Math.max(-maxX, Math.min(maxX, newX)),
//           y: Math.max(-maxY, Math.min(maxY, newY))
//         });
//       }
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleAbnormalityClick = (abnormality, e) => {
//     e.stopPropagation();
//     setSelectedAbnormality(abnormality);
//   };

//   const resetView = () => {
//     setZoomLevel(1);
//     setPosition({ x: 0, y: 0 });
//   };

//   // Prevent image drag (native browser behavior)
//   useEffect(() => {
//     const preventDefault = (e) => {
//       if (isDragging) e.preventDefault();
//     };

//     window.addEventListener('mousemove', preventDefault, { passive: false });
//     return () => window.removeEventListener('mousemove', preventDefault);
//   }, [isDragging]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 p-4">
//       {/* Patient Info */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Patient Information</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//           <div>
//             <p className="text-sm text-gray-500">Name</p>
//             <p className="font-medium">{mockData.patientInfo.name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Age</p>
//             <p className="font-medium">{mockData.patientInfo.age}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Gender</p>
//             <p className="font-medium">{mockData.patientInfo.gender}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Scan Dates</p>
//             <p className="font-medium">
//               {mockData.patientInfo.scanDateBefore} → {mockData.patientInfo.scanDateAfter}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row flex-1 gap-4">
//         {/* Image Viewer */}
//         <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="flex border-b">
//             <button
//               className={`px-4 py-2 font-medium ${activeTab === 'before' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600'}`}
//               onClick={() => setActiveTab('before')}
//             >
//               Before Treatment
//             </button>
//             <button
//               className={`px-4 py-2 font-medium ${activeTab === 'after' ? 'bg-green-100 text-green-700 border-b-2 border-green-500' : 'text-gray-600'}`}
//               onClick={() => setActiveTab('after')}
//             >
//               After Treatment
//             </button>
//           </div>

//           <div className="p-4">
//             <h3 className="text-lg font-semibold mb-2">
//               Diagnosis: <span className={activeTab === 'before' ? 'text-red-600' : 'text-green-600'}>
//                 {currentData.diagnosis}
//               </span>
//             </h3>

//             <div
//               ref={containerRef}
//               className="relative w-full h-96 md:h-[500px] bg-black overflow-hidden rounded-lg cursor-grab"
//               onMouseDown={handleMouseDown}
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={handleMouseUp}
//             >
//               <img
//                 ref={imageRef}
//                 src={currentData.imageUrl}
//                 alt={`X-ray ${activeTab} treatment`}
//                 className="absolute max-w-none object-contain"
//                 style={{
//                   transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
//                   width: '100%',
//                   height: '100%',
//                   transformOrigin: 'center center',
//                 }}
//               />

//               {showAbnormalities && currentData.abnormalities.map((abnormality, index) => (
//                 <div
//                   key={index}
//                   className="absolute rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200 hover:opacity-90 hover:border-solid"
//                   style={{
//                     left: `${abnormality.x}%`,
//                     top: `${abnormality.y}%`,
//                     width: `${abnormality.radius * 2}%`,
//                     height: `${abnormality.radius * 2}%`,
//                     borderColor: abnormality.color,
//                     transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
//                     cursor: 'pointer'
//                   }}
//                   onClick={(e) => handleAbnormalityClick(abnormality, e)}
//                 >
//                   <div
//                     className="rounded-full opacity-30"
//                     style={{
//                       width: '70%',
//                       height: '70%',
//                       backgroundColor: abnormality.color
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Controls */}
//             <div className="flex justify-between items-center mt-4">
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleZoom('in')}
//                   className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
//                   disabled={zoomLevel >= 5}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => handleZoom('out')}
//                   className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
//                   disabled={zoomLevel <= 0.5}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={resetView}
//                   className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="flex items-center gap-2">
//                 <label className="flex items-center cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       className="sr-only"
//                       checked={showAbnormalities}
//                       onChange={() => setShowAbnormalities(!showAbnormalities)}
//                     />
//                     <div className={`block w-10 h-6 rounded-full ${showAbnormalities ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
//                     <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${showAbnormalities ? 'transform translate-x-4' : ''}`}></div>
//                   </div>
//                   <div className="ml-2 text-gray-700">Show Markers</div>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Abnormality Details */}
//         <div className="w-full md:w-80 bg-white rounded-lg shadow-md p-4">
//           <h3 className="text-lg font-semibold mb-4">
//             {selectedAbnormality ? 'Abnormality Details' : 'Select an abnormality marker'}
//           </h3>

//           {selectedAbnormality ? (
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-500">Description</p>
//                 <p className="font-medium">{selectedAbnormality.description}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Severity</p>
//                 <p className="font-medium capitalize flex items-center">
//                   <span
//                     className="inline-block w-3 h-3 rounded-full mr-2"
//                     style={{ backgroundColor: selectedAbnormality.color }}
//                   ></span>
//                   {selectedAbnormality.severity}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Location</p>
//                 <p className="font-medium">
//                   X: {selectedAbnormality.x}%, Y: {selectedAbnormality.y}%
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Status Change</p>
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
//                   <span className="text-sm">Before: {mockData.before.abnormalities.find(a => a.description.includes(selectedAbnormality.description.split(' ')[0])?.severity || 'N/A')}</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                   <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
//                   <span className="text-sm">After: {mockData.after.abnormalities.find(a =>
//                     a.description.includes(selectedAbnormality.description.split(' ')[0])
//                   )?.severity || 'N/A'}</span>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-gray-500 italic">
//               Click on any highlighted area in the X-ray to view detailed information about the abnormality.
//             </div>
//           )}

//           <div className="mt-8">
//             <h4 className="font-medium mb-2">Diagnostic Notes</h4>
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
//               <p className="text-sm text-yellow-700">
//                 {activeTab === 'before'
//                   ? 'Initial assessment shows significant bone damage requiring immediate intervention.'
//                   : 'Follow-up shows positive healing response with reduced fracture lines and improved alignment.'}
//               </p>
//             </div>
//           </div>

//           <div className="mt-4">
//             <h4 className="font-medium mb-2">Color Legend</h4>
//             <div className="space-y-2">
//               <div className="flex items-center">
//                 <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
//                 <span className="text-sm">Severe condition</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
//                 <span className="text-sm">Moderate condition</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
//                 <span className="text-sm">Mild condition</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
//                 <span className="text-sm">Healing/Improved</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Xray;

import React, { useState, useRef, useEffect } from 'react';

const Xray = () => {
  // Mock data for X-ray images and diagnostic information
  const mockData = {
    before: {
      imageUrl: 'https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg',
      diagnosis: 'Fracture detected in the right tibia',
      abnormalities: [
        { id: 'abn-1', x: 35, y: 60, radius: 8, description: 'Hairline fracture', severity: 'moderate', color: 'orange' },
        { id: 'abn-2', x: 40, y: 65, radius: 5, description: 'Bone displacement', severity: 'severe', color: 'red' }
      ]
    },
    after: {
      imageUrl: 'https://media.sciencephoto.com/image/f0375525/800wm/F0375525-Healthy_chest,_X-ray.jpg',
      diagnosis: 'Fracture healing in progress',
      abnormalities: [
        { id: 'abn-1', x: 35, y: 60, radius: 5, description: 'Healing fracture', severity: 'mild', color: 'yellow' },
        { id: 'abn-2', x: 40, y: 65, radius: 3, description: 'Reduced displacement', severity: 'moderate', color: 'orange' }
      ]
    },
    patientInfo: {
      name: 'John Doe',
      age: 42,
      gender: 'Male',
      scanDateBefore: '2023-05-15',
      scanDateAfter: '2023-08-20'
    }
  };

  const [activeTab, setActiveTab] = useState('before');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [showAbnormalities, setShowAbnormalities] = useState(true);
  const [selectedAbnormality, setSelectedAbnormality] = useState(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const currentData = mockData[activeTab];

  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(newZoom, 0.5), 5);
    });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartDragPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - startDragPos.x;
      const newY = e.clientY - startDragPos.y;

      // Calculate container dimensions
      const container = containerRef.current;
      const img = imageRef.current;
      if (container && img) {
        const containerRect = container.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        const maxX = Math.max(0, (imgRect.width * zoomLevel - containerRect.width) / 2);
        const maxY = Math.max(0, (imgRect.height * zoomLevel - containerRect.height) / 2);

        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAbnormalityClick = (abnormality, e) => {
    e.stopPropagation();

    // Find corresponding abnormalities in before/after data
    const beforeAbnormality = mockData.before.abnormalities.find(a => a.id === abnormality.id);
    const afterAbnormality = mockData.after.abnormalities.find(a => a.id === abnormality.id);

    setSelectedAbnormality({
      ...abnormality,
      beforeSeverity: beforeAbnormality?.severity || 'N/A',
      afterSeverity: afterAbnormality?.severity || 'N/A',
      beforeColor: beforeAbnormality?.color || 'gray',
      afterColor: afterAbnormality?.color || 'gray'
    });
  };

  const resetView = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Prevent image drag (native browser behavior)
  useEffect(() => {
    const preventDefault = (e) => {
      if (isDragging) e.preventDefault();
    };

    window.addEventListener('mousemove', preventDefault, { passive: false });
    return () => window.removeEventListener('mousemove', preventDefault);
  }, [isDragging]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Patient Info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Patient Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{mockData.patientInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{mockData.patientInfo.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium">{mockData.patientInfo.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Scan Dates</p>
            <p className="font-medium">
              {mockData.patientInfo.scanDateBefore} → {mockData.patientInfo.scanDateAfter}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 gap-4">
        {/* Image Viewer */}
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'before' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('before')}
            >
              Before Treatment
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'after' ? 'bg-green-100 text-green-700 border-b-2 border-green-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('after')}
            >
              After Treatment
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              Diagnosis: <span className={activeTab === 'before' ? 'text-red-600' : 'text-green-600'}>
                {currentData.diagnosis}
              </span>
            </h3>

            <div
              ref={containerRef}
              className="relative w-full h-96 md:h-[500px] bg-black overflow-hidden rounded-lg cursor-grab"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                ref={imageRef}
                src={currentData.imageUrl}
                alt={`X-ray ${activeTab} treatment`}
                className="absolute max-w-none object-contain"
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                  width: '100%',
                  height: '100%',
                  transformOrigin: 'center center',
                }}
              />

              {showAbnormalities && currentData.abnormalities.map((abnormality) => (
                <div
                  key={abnormality.id}
                  className="absolute rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200 hover:opacity-90 hover:border-solid"
                  style={{
                    left: `${abnormality.x}%`,
                    top: `${abnormality.y}%`,
                    width: `${abnormality.radius * 2}%`,
                    height: `${abnormality.radius * 2}%`,
                    borderColor: abnormality.color,
                    transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
                    cursor: 'pointer'
                  }}
                  onClick={(e) => handleAbnormalityClick(abnormality, e)}
                >
                  <div
                    className="rounded-full opacity-30"
                    style={{
                      width: '70%',
                      height: '70%',
                      backgroundColor: abnormality.color
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleZoom('in')}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={zoomLevel >= 5}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleZoom('out')}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={zoomLevel <= 0.5}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={resetView}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={showAbnormalities}
                      onChange={() => setShowAbnormalities(!showAbnormalities)}
                    />
                    <div className={`block w-10 h-6 rounded-full ${showAbnormalities ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${showAbnormalities ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <div className="ml-2 text-gray-700">Show Markers</div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Abnormality Details */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">
            {selectedAbnormality ? 'Abnormality Details' : 'Select an abnormality marker'}
          </h3>

          {selectedAbnormality ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{selectedAbnormality.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Severity</p>
                <p className="font-medium capitalize flex items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: selectedAbnormality.color }}
                  ></span>
                  {selectedAbnormality.severity}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  X: {selectedAbnormality.x}%, Y: {selectedAbnormality.y}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status Change</p>
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: selectedAbnormality.beforeColor }}
                  ></div>
                  <span className="text-sm">Before: {selectedAbnormality.beforeSeverity}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: selectedAbnormality.afterColor }}
                  ></div>
                  <span className="text-sm">After: {selectedAbnormality.afterSeverity}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">
              Click on any highlighted area in the X-ray to view detailed information about the abnormality.
            </div>
          )}

          <div className="mt-8">
            <h4 className="font-medium mb-2">Diagnostic Notes</h4>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <p className="text-sm text-yellow-700">
                {activeTab === 'before'
                  ? 'Initial assessment shows significant bone damage requiring immediate intervention.'
                  : 'Follow-up shows positive healing response with reduced fracture lines and improved alignment.'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Severe condition</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm">Moderate condition</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Mild condition</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Healing/Improved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Xray;