import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Asosiy kontent */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Shifoxonlar manzili va telefon raqamlari</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kontakt ma'lumotlari */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Kontakt Ma'lumotlari</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <FaPhone className="text-blue-500 mt-1 mr-3" size={20} />
                <div>
                  <h3 className="font-medium">Telefon Raqam</h3>
                  <p className="text-gray-600">+998 90 123 45 67</p>
                  <p className="text-gray-600">+998 71 234 56 78</p>
                </div>
              </div>

              <div className="flex items-start">
                <MdEmail className="text-blue-500 mt-1 mr-3" size={20} />
                <div>
                  <h3 className="font-medium">Elektron Pochta</h3>
                  <p className="text-gray-600">info@diagno.uz</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" size={20} />
                <div>
                  <h3 className="font-medium">Manzil</h3>
                  <p className="text-gray-600">Toshkent shahar, Yunusobod tumani, 12-uy</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Ish vaqti:</h3>
              <p className="text-gray-600">Dushanba-Juma: 08:00 - 18:00</p>
              <p className="text-gray-600">Shanba: 09:00 - 15:00</p>
              <p className="text-gray-600">Yakshanba: Dam olish kuni</p>
              <p className="text-blue-500">Online kansultatsiay: 7/24</p>

            </div>
          </div>

          {/* Xarita */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              title="Bizning manzilimiz"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.2543060284474!2d69.2796333152876!3d41.3387739792679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9a9b9b9b9b9b9b9b!2sYunusobod%20tumani%2C%20Toshkent%2C%20O%60zbekiston!5e0!3m2!1suz!2s!4v1620000000000!5m2!1suz!2s"
              width="100%"
              height="100%"
              style={{ minHeight: '300px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      {/* Futer qismi */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Diagno haqida ma'lumot */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Diagno Markazi</h3>
              <p className="text-gray-300">
                Bizning markazda zamonaviy tibbiy uskunalar yordamida yuqori sifatli diagnostika xizmatlari ko'rsatiladi.
              </p>
            </div>

            {/* Bo'limlar */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Bo'limlar</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Kardiologiya</li>
                <li>Nevrologiya</li>
                <li>Endokrinologiya</li>
                <li>Urologiya</li>
                <li>Gastroenterologiya</li>
              </ul>
            </div>

            {/* Ijtimoiy tarmoqlar */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Ijtimoiy Tarmoqlar</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <FaTelegram size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <FaFacebook size={24} />
                </a>
              </div>

              <div className="mt-4">
                {/* <h4 className="font-medium mb-2">Obuna bo'ling</h4> */}
                <p className="text-gray-300 text-sm">
                  Yangiliklar va aksiyalar haqida xabardor bo'lish uchun obuna bo'ling
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Diagno AI Markazi. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;