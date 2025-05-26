// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     lastName: '',
//     firstName: '',
//     region: '',
//     passportId: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isRegistered, setIsRegistered] = useState(false);
//   const navigate = useNavigate();

//   const regions = [
//     'Toshkent', 'Andijon', 'Buxoro', 'Fargʻona', 'Jizzax',
//     'Xorazm', 'Namangan', 'Navoiy', 'Qashqadaryo', 'Samarqand',
//     'Sirdaryo', 'Surxondaryo'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.lastName) newErrors.lastName = 'Familiya kiritilmagan';
//     if (!formData.firstName) newErrors.firstName = 'Ism kiritilmagan';
//     if (!formData.region) newErrors.region = 'Viloyat tanlanmagan';
//     if (!formData.passportId) newErrors.passportId = 'Pasport ID kiritilmagan';
//     if (!formData.phoneNumber) newErrors.phoneNumber = 'Telefon raqami kiritilmagan';
//     if (!formData.password) newErrors.password = 'Parol kiritilmagan';
//     if (formData.password.length < 6) newErrors.password = 'Parol kamida 6 belgidan iborat boʻlishi kerak';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Parollar mos kelmadi';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Bu yerda odatda APIga so'rov yuboriladi
//       console.log('Forma yuborildi:', formData);

//       // Registratsiya muvaffaqiyatli deb hisoblaymiz
//       setIsRegistered(true);

//       // 2 soniyadan keyin asosiy sahifaga yo'naltiramiz
//       setTimeout(() => {
//         navigate('/home');
//       }, 2000);
//     }
//   };

//   if (isRegistered) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Muvaffaqiyatli ro'yxatdan o'tdingiz!</h2>
//           <p className="text-center">Siz asosiy sahifaga yo'naltirilmoqdasiz...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Familiya</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Viloyat</label>
//             <select
//               name="region"
//               value={formData.region}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md ${errors.region ? 'border-red-500' : 'border-gray-300'}`}
//             >
//               <option value="">Viloyatni tanlang</option>
//               {regions.map((region) => (
//                 <option key={region} value={region}>{region}</option>
//               ))}
//             </select>
//             {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Pasport ID</label>
//             <input
//               type="text"
//               name="passportId"
//               value={formData.passportId}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md ${errors.passportId ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.passportId && <p className="text-red-500 text-xs mt-1">{errors.passportId}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqami</label>
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
//               placeholder="+998"
//             />
//             {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Parolni takrorlang</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Ro'yxatdan o'tish
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  useEffect(() => {
    // Navbarni topib olib, yashirish
    const navbar = document.querySelector('.navbar'); // Sizning navbar classingiz
    if (navbar) {
      navbar.style.display = 'none';
    }

    // Komponent unmount bo'lganda navbar ni qayta ko'rsatish
    return () => {
      if (navbar) {
        navbar.style.display = 'flex';
      }
    };
  }, []);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    region: '',
    passportId: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const regions = [
    'Toshkent', 'Andijon', 'Buxoro', 'Fargʻona', 'Jizzax',
    'Xorazm', 'Namangan', 'Navoiy', 'Qashqadaryo', 'Samarqand',
    'Sirdaryo', 'Surxondaryo'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName) newErrors.lastName = 'Familiya kiritilmagan';
    if (!formData.firstName) newErrors.firstName = 'Ism kiritilmagan';
    if (!formData.region) newErrors.region = 'Viloyat tanlanmagan';
    if (!formData.passportId) newErrors.passportId = 'Pasport ID kiritilmagan';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Telefon raqami kiritilmagan';
    if (!formData.password) newErrors.password = 'Parol kiritilmagan';
    if (formData.password.length < 6) newErrors.password = 'Parol kamida 6 belgidan iborat boʻlishi kerak';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Parollar mos kelmadi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Forma yuborildi:', formData);
      setIsRegistered(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  };

  if (isRegistered) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Muvaffaqiyatli ro'yxatdan o'tdingiz!</h2>
          <p className="text-center">Siz asosiy sahifaga yo'naltirilmoqdasiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Familiya</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Viloyat</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.region ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Viloyatni tanlang</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pasport ID</label>
                <input
                  type="text"
                  name="passportId"
                  value={formData.passportId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.passportId ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.passportId && <p className="text-red-500 text-xs mt-1">{errors.passportId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqami</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+998"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parolni takrorlang</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Ro'yxatdan o'tish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;