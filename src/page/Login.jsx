import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
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
    phoneNumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phoneNumber) newErrors.phoneNumber = 'Telefon raqami kiritilmagan';
    if (!formData.password) newErrors.password = 'Parol kiritilmagan';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Bu yerda APIga login so'rovini yuboramiz
        console.log('Login form submitted:', formData);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Muvaffaqiyatli login deb hisoblaymiz
        navigate('/home');
      } catch (error) {
        console.error('Login error:', error);
        setErrors({
          general: 'Telefon raqam yoki parol notoʻgʻri'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Tizimga kirish</h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Eslab qolish
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Parolni unutdingizmi?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Kirilmoqda...
              </>
            ) : 'Kirish'}
          </button>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Hisobingiz yoʻqmi? </span>
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Roʻyxatdan oʻtish
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;